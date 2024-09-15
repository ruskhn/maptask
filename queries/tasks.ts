export enum TaskQueryKey {
  TASK_LIST = "task-list",
}

export const useTasksQuery = () =>
  useQuery({
    queryKey: [TaskQueryKey.TASK_LIST],
    queryFn: () => $fetch("/api/task"),
  });

export const useTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask) =>
      $fetch("/api/task", {
        method: "POST",
        body: newTask,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData([TaskQueryKey.TASK_LIST], (oldData) => {
        if (oldData) {
          return [...oldData, data];
        } else {
          return [data];
        }
      });
    },
  });
};
