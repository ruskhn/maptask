<script setup lang="ts">
import { MapPin, Calendar, Clock, Timer } from "lucide-vue-next";
import type { CategoryValue, PriorityValue } from "~/utils/constants";
import type { LngLat } from "@yandex/ymaps3-types";

export type TaskMapItem = {
  task: {
    id: number;
    slug: string;
    title: string;
    address: string;
    date: string;
    time: string;
    photo: string;
    category: CategoryValue;
    priority: PriorityValue;
    coordinates: LngLat;
  };
  selectable?: boolean;
};

const { task, selectable } = withDefaults(defineProps<TaskMapItem>(), {
  selectable: false,
});

const taskStore = useTaskStore();

const selectedItem = computed(() => {
  return selectable && task.id === taskStore.selectedTask?.id
    ? "bg-secondary"
    : "";
});

const onClick = () => {
  taskStore.selectTask(task);
};
</script>

<template>
  <div
    :class="
      cn(
        'flex items-start justify-between w-full p-3 text-sm border rounded-md cursor-pointer bg-background h-36 hover:bg-secondary',
        selectedItem
      )
    "
    @click="onClick"
  >
    <div class="flex flex-col space-y-3 max-w-60">
      <div class="font-medium truncate text-primary">
        {{ task.title }}
      </div>

      <div class="truncate text-muted-foreground">
        <MapPin class="inline mr-1 size-4" />
        {{ task.address }}
      </div>

      <div class="flex space-x-6 text-muted-foreground">
        <div>
          <Calendar class="inline mr-1 size-4" />
          {{ task.date }}
        </div>
        <div>
          <Clock class="inline mr-1 size-4" />
          {{ task.time }}
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <Timer class="size-4 text-foreground" />
        <component :is="getPriorityIcon(task.priority.name)" :class="task.priority.color" />
        <Badge
          class="flex items-center rounded-sm bg-background"
          variant="outline"
        >
          <component
            :is="getCategoryIcon(task.category.name)"
            class="mr-1 size-4"
          />
          <div>{{ task.category.name }}</div>
        </Badge>
      </div>
    </div>
    <div class="select-none w-28">
      <AspectRatio :ratio="16 / 10">
        <img
          :src="task.photos[0]"
          :alt="task.time"
          class="object-cover w-full h-full rounded-md"
        />
      </AspectRatio>
    </div>
  </div>
</template>
