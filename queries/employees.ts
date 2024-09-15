export enum TaskQueryKey {
  EMPLOYEE_LIST = "employee-list",
}

export const useEmployeeQuery = () =>
  useQuery({
    queryKey: [TaskQueryKey.EMPLOYEE_LIST],
    queryFn: () => $fetch("/api/employee"),
  });