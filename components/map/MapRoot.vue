<script setup lang="ts">
import { createApp, h, type Component } from "vue";
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapListener,
} from "vue-yandex-maps";
import type {
  YMap,
  YMapMarker,
  BehaviorType,
  YMapLocationRequest,
  DomEvent,
  LngLat,
  YMapMarkerProps,
} from "@yandex/ymaps3-types";
import type { CategoryValue, PriorityValue } from "~/utils/constants";
import Logo from "~/components/ui/logo.vue";
import MapTaskPin from "~/components/map/MapTaskPin.vue";
import MapEmployeePin from "~/components/map/MapEmployeePin.vue";
import MapHelicopter from "~/components/map/MapHelicopter.vue";

type MapTask = {
  id?: string;
  coordinates: LngLat;
  category?: CategoryValue;
  priority?: PriorityValue;
  type?: "new";
  onDragEnd?: (coords: LngLat) => void;
};

type TaskMapList = {
  tasks?: MapTask[];
  employees?: Array<{
    id: string;
    avatar: string;
    coordinates: number[];
  }>;
};

const props = withDefaults(defineProps<TaskMapList>(), {
  tasks: () => [],
  employees: () => [],
});

const dialogStore = useDialogStore();
const taskStore = useTaskStore();

const map = shallowRef<YMap | null>(null);
const flyDuration = 1000;

const BEHAVIOR: BehaviorType[] = [
  "drag",
  "scrollZoom",
  "mouseRotate",
  "mouseTilt",
];
const location = ref<YMapLocationRequest>({
  center: [-128.25556277431028, 53.411290088915074],
  zoom: 3,
});

const newTaskMarker = ref<MapTask | null>(null);
const hoveredPinId = ref<string | null>(null);

const taskMarkers = computed<MapTask[]>(() => [
  ...props.tasks,
  ...(newTaskMarker.value ? [newTaskMarker.value] : []),
]);

const getMarkerKey = (task: MapTask) => task.id ?? "new";

const getMarkerSettings = (
  task: MapTask,
  zIndex: number
): YMapMarkerProps => {
  const settings: YMapMarkerProps = {
    coordinates: task.coordinates,
    zIndex,
  };

  if (task.id) settings.id = String(task.id);

  if (task.type === "new") {
    settings.draggable = true;
    if (task.onDragEnd) settings.onDragEnd = task.onDragEnd;
  }

  return settings;
};

type MountedMarker = {
  key: string;
  marker: YMapMarker;
  app: ReturnType<typeof createApp>;
};

const mountedMarkers = shallowRef<MountedMarker[]>([]);

const mountMarker = (
  key: string,
  settings: YMapMarkerProps,
  component: Component,
  componentProps: Record<string, unknown> = {}
) => {
  if (!map.value || typeof ymaps3 === "undefined") return null;

  const el = document.createElement("div");
  el.style.transform = "translate(-50%, -100%)";

  const { onClick, onMouseover, onMouseleave, ...pinProps } = componentProps;

  const app = createApp({
    render: () => h(component, pinProps),
  });
  app.mount(el);

  if (onClick) el.addEventListener("click", onClick as () => void);
  if (onMouseover) el.addEventListener("mouseover", onMouseover as () => void);
  if (onMouseleave) el.addEventListener("mouseleave", onMouseleave as () => void);

  const marker = new ymaps3.YMapMarker(settings, el);
  map.value.addChild(marker);

  return { key, marker, app };
};

const clearMarkers = () => {
  if (!map.value) return;

  for (const { marker, app } of mountedMarkers.value) {
    map.value.removeChild(marker);
    app.unmount();
  }

  mountedMarkers.value = [];
};

const syncMarkers = () => {
  if (!map.value || typeof ymaps3 === "undefined") return;

  clearMarkers();
  const next: MountedMarker[] = [];

  for (const task of taskMarkers.value) {
    const key = getMarkerKey(task);
    const mounted = mountMarker(
      key,
      getMarkerSettings(task, hoveredPinId.value === key ? 1 : 0),
      MapTaskPin,
      {
        category: task.category,
        priority: task.priority,
        onClick: () => taskStore.selectTask(task),
        onMouseover: () => {
          hoveredPinId.value = key;
        },
        onMouseleave: () => {
          hoveredPinId.value = null;
        },
      }
    );
    if (mounted) next.push(mounted);
  }

  for (const employee of props.employees) {
    const mounted = mountMarker(
      `employee-${employee.id}`,
      { coordinates: employee.coordinates as LngLat, id: employee.id },
      MapEmployeePin,
      { id: employee.id, avatar: employee.avatar }
    );
    if (mounted) next.push(mounted);
  }

  const helicopter = mountMarker(
    "helicopter",
    { coordinates: [-150.61443832539757, 61.553380435810766], id: "helicopter" },
    MapHelicopter
  );
  if (helicopter) next.push(helicopter);

  mountedMarkers.value = next;
};

const adjustMapToMarker = (coords: number[]) => {
  const bounds = map.value?.bounds;
  if (!bounds) return;

  const isOutOfBounds =
    coords[0] < bounds[0][0] ||
    coords[0] > bounds[1][0] ||
    coords[1] > bounds[0][1] ||
    coords[1] < bounds[1][0];

  if (isOutOfBounds) {
    map.value.setLocation({
      center: coords,
      zoom: map.value.zoom - 1,
      duration: flyDuration,
      easing: "ease-in-out",
    });
    setTimeout(() => {
      map.value?.setLocation({
        center: coords,
        zoom: map.value.zoom + 1,
        duration: 350,
        easing: "ease-in",
      });
    }, flyDuration);
  } else {
    map.value.setLocation({
      center: coords,
      zoom: map.value.zoom,
      duration: flyDuration,
      easing: "ease-in-out",
    });
  }
};

const handleMapClick = (_: unknown, event: DomEvent) => {
  taskStore.deselectTask();
  newTaskMarker.value = {
    coordinates: event.coordinates,
    type: "new",
    onDragEnd: (coords) =>
      dialogStore.setDialogData(Dialogs.NewTask, { coordinates: coords }),
  };
  dialogStore.openDialog(Dialogs.NewTask, { coordinates: event.coordinates });
};

watch(
  () => taskStore.selectedTask,
  (newTask) => {
    if (newTask) adjustMapToMarker(newTask.coordinates);
  }
);

watch(
  () => dialogStore.activeDialogs[Dialogs.NewTask].isOpened,
  (isOpened) => {
    if (!isOpened) newTaskMarker.value = null;
  }
);

watch([map, taskMarkers, () => props.employees, hoveredPinId], syncMarkers, {
  deep: true,
});

onBeforeUnmount(clearMarkers);
</script>

<template>
  <yandex-map
    v-model="map"
    :settings="{
      location,
      showScaleInCopyrights: true,
      behaviors: BEHAVIOR,
    }"
    width="100%"
    height="calc(100vh - 64px)"
  >
    <yandex-map-default-scheme-layer :settings="{ theme: $colorMode.value }" />
    <yandex-map-default-features-layer />
    <yandex-map-listener v-if="map" :settings="{ onClick: handleMapClick }" />
  </yandex-map>

  <div
    class="absolute flex items-center space-x-2 text-2xl font-bold cursor-pointer select-none bottom-4 right-4"
  >
    <Logo />
    <div>
      MapTaskRusGuru <span class="font-light text-muted-foreground">Demo</span>
    </div>
  </div>
</template>

<style>
.ymaps3x0--map-copyrights {
  display: none !important;
}
</style>
