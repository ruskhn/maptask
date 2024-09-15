import { defineStore } from "pinia";

interface TaskStore {
  selectedTask: unknown | null;
}

export const useTaskStore = defineStore({
  id: "taskStore",
  state: (): TaskStore => ({
    selectedTask: null,
  }),
  actions: {
    selectTask(task: any) {
      this.selectedTask = task;
    },
    deselectTask() {
      this.selectedTask = null;
    },
  },
});
