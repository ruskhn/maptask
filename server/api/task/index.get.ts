import { EVENT_PHOTOS, TASK_LIST } from "~/server/mocks";
import { normalizeTask } from "~/server/utils/normalizeTask";

export default defineEventHandler(async () => {
  const getTaskPhotos = (taskId: string) => {
    return EVENT_PHOTOS.find((item) => item.taskId === taskId)?.photos || [];
  };

  return TASK_LIST.map((task) =>
    normalizeTask({
      photos: getTaskPhotos(task.id),
      ...task,
    })
  );
});
