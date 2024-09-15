<script lang="ts" setup>
import { Filter } from "lucide-vue-next";
import type { TaskMapItem } from "./TaskMapListItem.vue";

type TaskMapList = {
  tasks: TaskMapItem[];
};

withDefaults(defineProps<TaskMapList>(), {
  tasks: [],
});

const dialogStore = useDialogStore();
</script>

<template>
  <Card
    class="absolute top-0 space-y-4 p-4 border-t-0 rounded-none left-0 z-10 w-full h-full max-w-[420px] overflow-hidden"
  >
    <CardHeader class="p-0">
      <CardTitle class="flex items-center justify-between text-base">
        Tasks
<!--        <Button-->
<!--          size="icon"-->
<!--          variant="ghost"-->
<!--          @click="dialogStore.openDialog(Dialogs.FilterTask)"-->
<!--        >-->
<!--          <Filter />-->
<!--        </Button>-->
      </CardTitle>
    </CardHeader>
    <CardContent class="h-full p-0 pb-12 space-y-4 overflow-y-auto">
      <TaskMapListItem
        v-if="tasks.length !== 0"
        v-for="task in tasks"
        :key="task.title"
        :task="task"
        selectable
      />
      <div
        v-else
        class="flex w-full text-sm font-normal text-center text-muted-foreground"
      >
        The list is empty. <br />
        Click the place on the map where you want to create a task.
      </div>
    </CardContent>
  </Card>
</template>
