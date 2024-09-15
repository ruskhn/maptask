<script setup lang="ts">
import { X } from "lucide-vue-next";

const dialogStore = useDialogStore();
const taskStore = useTaskStore();

watch(dialogStore.activeDialogs[Dialogs.FilterTask], async () => {});

const onSubmit = (values: Record<string, any>) => {
  // form.validate(values);
  // Handle the form submission
};

const onClose = () => {
  dialogStore.closeDialog(Dialogs.FilterTask);
};
</script>

<template>
  <Card
    v-if="dialogStore.isDialogOpen(Dialogs.FilterTask)"
    class="absolute animate-in duration-300 slide-in-from-right top-0 space-y-4 p-4 border-t-0 rounded-none right-0 z-10 w-full h-full max-w-[420px] overflow-hidden"
  >
    <CardHeader class="p-0">
      <CardTitle class="flex items-center justify-between text-base">
        Filter
        <Button size="icon" variant="ghost" @click="onClose">
          <X />
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent class="w-full h-full p-0 m-0 -mx-1 space-y-4 overflow-y-auto">
    </CardContent>
    <CardFooter
      class="absolute bottom-0 left-0 right-0 w-full p-4 border-t bg-background"
    >
      <Button class="w-full" type="submit" @click="onSubmit"> Use </Button>
    </CardFooter>
  </Card>
</template>
