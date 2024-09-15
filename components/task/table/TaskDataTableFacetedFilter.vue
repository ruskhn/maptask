<script setup lang="ts">
import type { Column } from "@tanstack/vue-table";
import type { Component } from "vue";
import { computed } from "vue";

import { cn } from "@/utils/classes";
import { CirclePlusIcon, CheckIcon } from "lucide-vue-next";

interface TaskDataTableFacetedFilter {
  column?: Column<Task, any>;
  title?: string;
  options: {
    name: string;
    id: string;
    icon?: Component;
  }[];
}

const props = defineProps<TaskDataTableFacetedFilter>();

const facets = computed(() => props.column?.getFacetedUniqueValues());
const selectedValues = computed(
  () => new Set(props.column?.getFilterValue() as string[])
);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <CirclePlusIcon class="w-4 h-4 mr-2 text-muted-foreground" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="h-4 mx-2" />
          <Badge
            variant="secondary"
            class="px-1 font-normal rounded-sm lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="px-1 font-normal rounded-sm"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                v-for="option in options.filter((option) =>
                  selectedValues?.has(option.id)
                )"
                :key="option.id"
                variant="secondary"
                class="px-1 font-normal rounded-sm"
              >
                {{ option.name }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command
        :filter-function="(list: TaskDataTableFacetedFilter['options'], term) => list.filter(i => i.name.toLowerCase()?.includes(term)) "
      >
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.id"
              :value="option"
              @select="
                (e) => {
                  const isSelected = selectedValues.has(option.id);
                  if (isSelected) {
                    selectedValues.delete(option.id);
                  } else {
                    selectedValues.add(option.id);
                  }
                  const filterValues = Array.from(selectedValues);

                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }
              "
            >
              <div
                :class="
                  cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.has(option.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )
                "
              >
                <CheckIcon :class="cn('h-4 w-4')" />
              </div>
              <component
                v-if="title === 'Priority'"
                :is="getPriorityIcon(option.name)"
              />
              <component
                v-else-if="title === 'Status'"
                :is="getStatusIcon(option.name)"
              />
              <component
                v-else
                :is="getCategoryIcon(option.name, { className: 'size-4' })"
              />

              <span class="ml-2">{{ option.name }}</span>
              <span
                v-if="facets?.get(option.id)"
                class="flex items-center justify-center w-4 h-4 ml-auto font-mono text-xs"
              >
                {{ facets.get(option.name) }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined)"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
