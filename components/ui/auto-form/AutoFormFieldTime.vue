<script setup lang="ts">
import { Clock } from "lucide-vue-next";
import { beautifyObjectName } from './utils'
import AutoFormLabel from "./AutoFormLabel.vue";
import type { FieldProps } from "./interface";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TimePicker } from "@/components/ui/time-picker";

defineProps<FieldProps>();
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <div class="relative items-center w-full max-w-sm">
          <TimePicker v-bind="slotProps" class="pl-10" />
          <span
            class="absolute inset-y-0 flex items-center justify-center px-3 start-0"
          >
            <Clock class="size-4 text-primary" />
          </span>
        </div>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
