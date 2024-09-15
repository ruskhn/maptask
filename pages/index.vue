<script lang="ts" setup>
import { useTasksQuery } from "@/queries/tasks";
import { useEmployeeQuery } from "@/queries/employees";

const { data: tasks } = useTasksQuery();
const { data: employees } = useEmployeeQuery();
</script>

<template>
  <div class="relative">
    <TaskMapList :tasks="tasks" />
    <MapRoot :tasks="tasks" :employees="employees" />
    <TaskViewDialog />
    <TaskNewDialog />
    <TaskFilterDialog />
  </div>
</template>
