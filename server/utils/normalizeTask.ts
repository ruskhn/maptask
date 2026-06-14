import {
  CATEGORY_VALUES,
  PRIORITY_VALUES,
  STATUS_VALUES,
  type CategoryValue,
  type PriorityValue,
  type StatusValue,
} from "~/utils/constants";

const EMPLOYEE_BY_LABEL: Record<string, string> = {
  "Test test": "202",
  "Test1 test 1": "201",
};

function resolveCategory(input: unknown): CategoryValue | undefined {
  if (input && typeof input === "object" && "name" in input) {
    return input as CategoryValue;
  }
  if (typeof input !== "string") return undefined;

  const normalized = input.toLowerCase();
  for (const value of Object.values(CATEGORY_VALUES)) {
    if (value.name.toLowerCase() === normalized) return value;
  }
  for (const [key, value] of Object.entries(CATEGORY_VALUES)) {
    if (key.toLowerCase() === normalized) return value;
  }
  return undefined;
}

function resolvePriority(input: unknown): PriorityValue | undefined {
  if (input && typeof input === "object" && "name" in input) {
    return input as PriorityValue;
  }
  if (typeof input !== "string") return undefined;
  return PRIORITY_VALUES[input.toLowerCase() as keyof typeof PRIORITY_VALUES];
}

function resolveStatus(input: unknown): StatusValue | undefined {
  if (input && typeof input === "object" && "name" in input) {
    return input as StatusValue;
  }
  if (typeof input !== "string") return undefined;
  return STATUS_VALUES[input as keyof typeof STATUS_VALUES];
}

function resolveEmployeeId(task: Record<string, unknown>): string | undefined {
  if (typeof task.employeeId === "string") return task.employeeId;
  if (typeof task.employee === "string") {
    return EMPLOYEE_BY_LABEL[task.employee] ?? "202";
  }
  return undefined;
}

export function normalizeTask<T extends Record<string, unknown>>(task: T) {
  const normalized = { ...task };

  normalized.category = resolveCategory(task.category) ?? task.category;
  normalized.priority = resolvePriority(task.priority) ?? task.priority;
  normalized.status = resolveStatus(task.status) ?? task.status;

  const employeeId = resolveEmployeeId(task);
  if (employeeId) normalized.employeeId = employeeId;
  delete normalized.employee;

  if (typeof normalized.id === "string" || typeof normalized.id === "number") {
    normalized.slug = `TASK-${Number(normalized.id) + 1}`;
  }

  return normalized;
}
