<script setup lang="ts">
import {
  CATEGORY_VALUES,
  PRIORITY_VALUES,
  STATUS_VALUES,
} from "~/utils/constants";
import { Settings2Icon } from "lucide-vue-next";
import TaskDataTableFacetedFilter from "~/components/task/table/TaskDataTableFacetedFilter.vue";

interface DataTableToolbarProps {
  table: any;
}

defineProps<DataTableToolbarProps>();
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <div class="flex items-center flex-1 space-x-2">
      <Input
        class="max-w-64 max-h-8"
        placeholder="Filter tasks..."
        :model-value="table.getColumn('title')?.getFilterValue() as string"
        @update:model-value="table.getColumn('title')?.setFilterValue($event)"
      />
      <TaskDataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="Object.values(STATUS_VALUES)"
      />
      <TaskDataTableFacetedFilter
        v-if="table.getColumn('priority')"
        :column="table.getColumn('priority')"
        title="Priority"
        :options="Object.values(PRIORITY_VALUES)"
      />
      <TaskDataTableFacetedFilter
        v-if="table.getColumn('category')"
        :column="table.getColumn('category')"
        title="Category"
        :options="Object.values(CATEGORY_VALUES)"
      />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="ml-auto max-h-8">
          <Settings2Icon class="w-4 h-4 mr-2 text-muted-foreground" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          v-for="column in table
            .getAllColumns()
            .filter((column) => column.getCanHide())"
          :key="column.id"
          class="capitalize"
          :checked="column.getIsVisible()"
          @update:checked="
            (value) => {
              column.toggleVisibility(!!value);
            }
          "
        >
          {{ column.id }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
