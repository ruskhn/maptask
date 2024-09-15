<script setup lang="ts">
import * as z from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useTaskMutation } from "~/queries/tasks";
import { X } from "lucide-vue-next";
import { toast } from "vue-sonner";

const dialogStore = useDialogStore();
const { isPending, status, mutateAsync } = useTaskMutation();

const formSchema = z.object({
  address: z.string().min(1).describe("Location"),
  title: z.string().min(1).max(250).describe("Task name"),
  category: z.nativeEnum(CategoryTypes).describe("Category"),
  date: z
    .any()
    .refine((v) => v, { message: "A date is required." })
    .describe("Date"),
  time: z
    .string()
    .refine((v) => v, { message: "A time is required." })
    .describe("Time"),
  status: z.nativeEnum(StatusTypes).describe("Status"),
  priority: z.nativeEnum(PriorityTypes).describe("Priority"),
  employee: z.enum(["Test test", "Test1 test 1"]).describe("Employee"),
  about: z.string().max(500).optional().describe("About the task"),
});

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
});

watch(
  () => dialogStore.activeDialogs[Dialogs.NewTask],
  async ({ isOpened, data }) => {
    if (isOpened) {
      if (!data || !data.coordinates) return;

      const { GeoObject } = await $fetch("/api/geocode", {
        query: {
          geocode: data.coordinates.join(","),
        },
      });

      const now = new Date();
      form.setFieldValue(
        "time",
        `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`
      );
      form.setFieldValue("date", today(getLocalTimeZone()));
      form.setFieldValue("status", StatusTypes.TODO);
      form.setFieldValue(
        "address",
        formatAddress(GeoObject.metaDataProperty.GeocoderMetaData.text!)
      );
    }
  },
  { deep: true }
);

const onSubmit = async (values: Record<string, any>) => {
  if (!(await form.validate(values)).valid) return;

  const dialogData = dialogStore.activeDialogs[Dialogs.NewTask].data;
  if (!dialogData || !dialogData.coordinates) return;

  const data = { ...form.values, coordinates: dialogData.coordinates };
  data.date = `${data.date.day}/${data.date.month}/${data.date.year}`;

  await mutateAsync(data);

  if (status.value === "success") {
    dialogStore.closeDialog(Dialogs.NewTask);

    toast.success("New task has been created", {
      description: `${data.title} at ${data.date} ${data.time}`,
    });
  }
};

const onClose = () => {
  dialogStore.closeDialog(Dialogs.NewTask);
};
</script>

<template>
  <Card
    v-if="dialogStore.isDialogOpen(Dialogs.NewTask)"
    class="absolute animate-in duration-300 slide-in-from-right top-0 space-y-4 p-4 border-t-0 rounded-none right-0 z-10 w-full h-full max-w-[420px] overflow-hidden"
  >
    <CardHeader class="p-0">
      <CardTitle class="flex items-center justify-between text-base">
        New Task
        <Button size="icon" variant="ghost" @click="onClose">
          <X />
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent class="w-full h-full p-0 m-0 -mx-1 space-y-4 overflow-y-auto">
      <ImageUploader />
      <AutoForm
        class="w-full px-1 pb-32 space-y-6"
        :form="form"
        :schema="formSchema"
        :field-config="{
          address: {
            inputProps: {
              placeholder: 'Enter address',
            },
          },
          title: {
            inputProps: {
              placeholder: 'Enter task name',
            },
          },
          date: {
            component: 'date',
            rowSpan: 'single',
          },
          time: {
            component: 'time',
            rowSpan: 'single',
          },
          status: {
            inputProps: {
              placeholder: 'Select status',
            },
            rowSpan: 'single',
          },
          priority: {
            component: 'select',
            inputProps: {
              placeholder: 'Select priority',
            },
            rowSpan: 'single',
          },
          employee: {
            component: 'select',
          },
          about: {
            component: 'textarea',
            inputProps: {
              placeholder: 'Write something about task',
            },
          },
        }"
      />
    </CardContent>
    <CardFooter
      class="absolute bottom-0 left-0 right-0 w-full p-4 border-t bg-background"
    >
      <Button
        class="w-full"
        type="submit"
        @click="onSubmit"
        :disabled="isPending"
      >
        Save
      </Button>
    </CardFooter>
  </Card>
</template>
