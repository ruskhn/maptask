<script lang="ts" setup>
import { TriangleAlert, ChevronsUp, ChevronUp, ChevronDown } from "lucide-vue-next";

const priorityIcons = {
  low: ChevronDown,
  medium: ChevronUp,
  high: ChevronsUp,
  critical: TriangleAlert,
};

type TaskPriorityProps = {
  priority: PriorityValue;
};
const props = defineProps<TaskPriorityProps>();

const IconComponent = computed(
  () => priorityIcons[props.priority.name.toLowerCase()]
);
</script>

<template>
  <component :is="IconComponent" :class="['size-5', props.priority.color]" />
</template>
