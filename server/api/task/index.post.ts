import { TASK_LIST } from "~/server/mocks";
import { CATEGORY_VALUES, PRIORITY_VALUES } from "~/utils/constants";

export default defineEventHandler(async (event) => {
  const task = await readBody(event);

  console.log(task);
  task.id = TASK_LIST.length.toString();
  task.slug = `TASK-${task.id}`;
  task.photos =
    ["https://s3-alpha-sig.figma.com/img/bcc3/2631/ee26a86dd1fd476760952ce6effe9339?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YEV6f8TuJKHNUk9RhZfHEmTU9bRs4tB4PFVv9LNywYtxMe2v5RS3KQEl-PkKUIiQbfMxbu0kxNpQ7XSQMmE16cN60aIykTCsfUlNbzVQ8hoBDJirRGorCnga62QmkB~C7n7yxHkRdgd3DaXTUvzn9mo1mZxQ--z~p-chzouehU6-04S4HZYTi0xt652HIQnS8O-W73e06xHty9GIQCiDr3Jn5G3G1z6jcdmnfRURQLjVZkvhxlgcU~k0ACxON3TYeTiQT4g1E-pOMAqXmXdlPPHJp61pbXcNDvi68uIFqSDNgCA-qOPXICJDs9dcuShu80zG0~gpHTLs82~GthlffQ__"]
  task.priority = PRIORITY_VALUES[task.priority.toLowerCase()];
  task.category = CATEGORY_VALUES[task.category.toLowerCase()];

  TASK_LIST.push(task);
  return task;
});
