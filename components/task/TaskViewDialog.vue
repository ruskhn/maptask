<script setup lang="ts">
import { X, Calendar, Clock } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useEmployeeQuery } from "~/queries/employees";
import { useDialogStore, Dialogs } from "~/stores/dialog";
import { useTaskStore } from "~/stores/task";

const dialogStore = useDialogStore();
const { selectedTask } = storeToRefs(useTaskStore());
const { data: employees } = useEmployeeQuery();

const employee = computed(() => {
  if (!selectedTask.value) return null;

  return (
    employees.value.find(
      (employee) => employee.id === selectedTask.value.employeeId
    ) || null
  );
});
watch(
  () => selectedTask.value,
  (newTask) => {
    if (newTask) dialogStore.openDialog(Dialogs.ViewTask);
  }
);

const onClose = () => {
  dialogStore.closeDialog(Dialogs.ViewTask);
};
</script>

<template>
  <Card
    v-if="dialogStore.isDialogOpen(Dialogs.ViewTask)"
    class="absolute animate-in duration-300 slide-in-from-right top-0 space-y-4 p-4 border-t-0 rounded-none right-0 z-10 w-full h-full max-w-[420px] overflow-hidden"
  >
    <CardHeader class="p-0">
      <CardTitle class="flex items-center justify-between text-base">
        {{ selectedTask.slug }}
        <Button size="icon" variant="ghost" @click="onClose">
          <X />
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent class="w-full h-full p-0 pb-32 m-0 -mx-1 space-y-6 overflow-y-auto">
      <Carousel class="w-full">
        <CarouselContent>
          <CarouselItem v-for="photoSrc in selectedTask.photos">
            <AspectRatio :ratio="4 / 3">
              <img
                :src="photoSrc"
                :alt="selectedTask.name"
                class="object-cover w-full h-full rounded-md"
              />
            </AspectRatio>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div class="flex items-center text-sm">
        <Calendar class="mr-2 size-4" />
        <div class="mr-4">{{ selectedTask.date }}</div>

        <Clock class="mr-2 size-4" />
        <div>{{ selectedTask.time }}</div>
      </div>

<!--      <div v-if="selectedTask.photos?.length" class="flex gap-2 h-[242px]">-->
<!--        <div class="">-->
<!--          <img-->
<!--              :src="selectedTask.photos[0]"-->
<!--              :alt="selectedTask.name"-->
<!--              class="object-cover w-full h-full rounded-md"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="flex flex-col w-[76px]">-->
<!--          <img-->
<!--              :src="selectedTask.photos[1]"-->
<!--              :alt="selectedTask.name"-->
<!--              class="object-cover rounded-md h-1/3 pb-2"-->
<!--          />-->
<!--          <img-->
<!--              :src="selectedTask.photos[2]"-->
<!--              :alt="selectedTask.name"-->
<!--              class="object-cover rounded-md h-1/3 pb-2"-->
<!--          />-->
<!--          <img-->
<!--              :src="selectedTask.photos[3]"-->
<!--              :alt="selectedTask.name"-->
<!--              class="object-cover rounded-md h-1/3"-->
<!--          />-->
<!--        </div>-->

<!--      </div>-->
<!--      <div class="flex items-center text-sm">-->
<!--        <Calendar class="mr-2 size-4" />-->
<!--        <div class="mr-4">{{ selectedTask.date }}</div>-->

<!--        <Clock class="mr-2 size-4" />-->
<!--        <div>{{ selectedTask.time }}</div>-->
<!--      </div>-->

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium"> Task Name </label>
          <div class="mt-1">
            <p class="text-sm">{{ selectedTask.title }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium"> Location </label>
          <div class="mt-1">
            <p class="text-sm">
              {{ selectedTask.address }}
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium"> Category </label>
          <div class="flex items-center mt-1 space-x-2">
            <component
              :is="
                getCategoryIcon(selectedTask.category.name, {
                  className: 'size-4',
                })
              "
            />
            <p class="text-sm">
              {{ selectedTask.category.name }}
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium">Status</label>
          <div class="flex items-center mt-1 space-x-2">
            <component :is="getStatusIcon(selectedTask.status.name)" />
            <p class="text-sm">{{ selectedTask.status.name }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium"> Priority </label>
          <div class="flex items-center mt-1 space-x-2">
            <component :is="getPriorityIcon(selectedTask.priority.name)" />
            <p class="text-sm">
              {{ selectedTask.priority.name }}
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium"> Employee </label>
          <div class="flex items-center mt-1 space-x-2">
            <Avatar class="size-8">
              <AvatarImage :src="employee?.avatar" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <div class="text-sm font-medium">
                {{ employee?.firstName }} {{ employee?.lastName }}
              </div>
              <div class="text-xs text-muted-foreground">
                {{ employee?.email }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedTask.about">
          <label class="block text-sm font-medium">About</label>
          <div class="mt-1">
            <p class="text-sm">{{ selectedTask.about }}</p>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter
      class="absolute bottom-0 left-0 right-0 w-full p-4 border-t bg-background"
    >
      <Button class="w-full" type="submit" disabled> Save </Button>
    </CardFooter>
  </Card>
</template>
