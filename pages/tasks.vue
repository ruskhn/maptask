<script setup lang="ts">
import { TableIcon, Columns3Icon } from "lucide-vue-next";
import TaskDataTable from "~/components/task/table/TaskDataTable.vue";
import { columns } from "~/components/task/table/columns";
import { useTasksQuery } from "~/queries/tasks";

const { data: tasks, isLoading } = useTasksQuery();
</script>

<template>
  <div v-if="!isLoading" class="w-[1280px] m-auto">
    <Tabs default-value="table" class="px-5 py-4">
      <TabsList>
        <TabsTrigger value="table">
          <TableIcon class="w-4 h-4 mr-2" />
          Table
        </TabsTrigger>
        <TabsTrigger value="board" disabled>
          <Columns3Icon class="w-4 h-4 mr-2" />
          Board
        </TabsTrigger>
      </TabsList>

      <TabsContent class="mt-0" value="table">
        <TaskDataTable :data="tasks" :columns="columns" :loading="isLoading" />
      </TabsContent>

      <TabsContent class="mt-0" value="board"> </TabsContent>
    </Tabs>
    <TaskViewDialog />
    <TaskNewDialog />
  </div>
</template>
