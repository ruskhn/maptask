import { EVENT_PHOTOS, TASK_LIST } from "~/server/mocks";

export default defineEventHandler(async (event) => {
  const getTaskPhotos = (taskId: string) => {
    return EVENT_PHOTOS.find(item => item.taskId === taskId)?.photos || []
  }

  return TASK_LIST.map((task) => {
    return {
      photos: getTaskPhotos(task.id),
      ...task
    }
  });
});
