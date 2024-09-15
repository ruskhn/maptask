<script setup lang="ts">
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapListener,
  type YandexMapMarkerCustomProps,
} from "vue-yandex-maps";
import type { TaskMapItem } from "../task/TaskMapListItem.vue";
import type {
  YMap,
  BehaviorType,
  YMapLocationRequest,
  DomEvent,
} from "@yandex/ymaps3-types";
import Logo from "~/components/ui/logo.vue";

type TaskMapList = {
  tasks?: TaskMapItem[];
  employees?: Array<{
    id: string;
    avatar: string;
    coordinates: number[];
  }>;
};

const props = withDefaults(defineProps<TaskMapList>(), {
  tasks: [],
  employees: [],
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

const newTaskMarker = ref<YandexMapMarkerCustomProps | null>(null);
const hoveredPinId = ref<number | null>(null);

const taskMarkers = computed(() => [
  ...unref(props.tasks || []),
  ...(newTaskMarker.value ? [newTaskMarker.value] : []),
]);

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
    draggable: true,
    type: "new",
    onDragEnd: (coords) =>
      dialogStore.setDialogData(Dialogs.NewTask, { coordinates: coords }),
  };
  dialogStore.openDialog(Dialogs.NewTask, { coordinates: event.coordinates });
};

const handleMouseOver = (index: number) => {
  hoveredPinId.value = index;
};

const handleMouseLeave = () => {
  hoveredPinId.value = null;
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
    <yandex-map-default-features-layer />

    <template v-for="(taskMarker, index) in taskMarkers" :key="index">
      <yandex-map-marker
        :settings="{ ...taskMarker, zIndex: hoveredPinId === index ? 1 : 0 }"
        position="left-center top"
      >
        <MapTaskPin
          :category="taskMarker.category"
          :priority="taskMarker.priority"
          @click="taskStore.selectTask(taskMarker)"
          @mouseover="handleMouseOver(index)"
          @mouseleave="handleMouseLeave"
        />
        <TaskMapListItem
          v-if="taskMarker.type !== 'new'"
          v-show="hoveredPinId === index"
          :task="taskMarker"
          class="absolute z-20 w-full min-w-96 -top-40 -left-44 animate-in fade-in zoom-in"
        />
      </yandex-map-marker>
    </template>

    <template v-for="employee in props.employees" :key="employee.id">
      <yandex-map-marker
        :settings="{ coordinates: employee.coordinates }"
        position="left-center top"
      >
        <MapEmployeePin :id="employee.id" :avatar="employee.avatar" />
      </yandex-map-marker>
    </template>

    <yandex-map-marker
      :settings="{ coordinates: [-150.61443832539757, 61.553380435810766] }"
      position="left-center center"
    >
      <MapHelicopter />
    </yandex-map-marker>

    <yandex-map-default-scheme-layer :settings="{ theme: $colorMode.value }" />
    <yandex-map-listener :settings="{ onDblClick: handleMapClick }" />
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
