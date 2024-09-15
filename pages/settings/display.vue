<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const items = [
  {
    id: "map",
    label: "Map",
  },
  {
    id: "tasks",
    label: "Tasks",
  },
  {
    id: "dashboard",
    label: "Dashboard",
  },
  {
    id: "guide",
    label: "Guide",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const displayFormSchema = toTypedSchema(
  z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: displayFormSchema,
  initialValues: {
    items: ["recents", "home"],
  },
});

const onSubmit = handleSubmit((values) => {
  console.log("sumbit", values);
});
</script>

<template>
  <div>
    <div class="pb-6">
      <h3 class="text-lg font-medium">Display</h3>
      <p class="text-sm text-muted-foreground">
        Turn items on or off to control what's displayed in the app.
      </p>
    </div>
    <Separator />
    <form @submit="onSubmit" class="py-6">
      <FormField name="items">
        <FormItem>
          <div class="mb-4">
            <FormLabel class="text-base"> Sidebar </FormLabel>
            <FormDescription>
              Select the items you want to display in the sidebar.
            </FormDescription>
          </div>

          <FormField
            v-for="item in items"
            v-slot="{ value, handleChange }"
            :key="item.id"
            name="items"
          >
            <FormItem
              :key="item.id"
              class="flex flex-row items-start space-x-3 space-y-0"
            >
              <FormControl>
                <Checkbox
                  disabled
                  :checked="value.includes(item.id)"
                  @update:checked="
                    (checked) => {
                      if (Array.isArray(value)) {
                        handleChange(
                          checked
                            ? [...value, item.id]
                            : value.filter((id) => id !== item.id)
                        );
                      }
                    }
                  "
                />
              </FormControl>
              <FormLabel class="font-normal">
                {{ item.label }}
              </FormLabel>
            </FormItem>
          </FormField>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-start mt-4">
        <Button type="submit" disabled> Update display </Button>
      </div>
    </form>
  </div>
</template>
