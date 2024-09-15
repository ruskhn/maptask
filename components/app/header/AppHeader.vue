<script setup lang="ts">
import { Plus } from "lucide-vue-next";

const dialogStore = useDialogStore();
</script>

<template>
  <header class="border-b">
    <div class="flex items-center justify-between h-16 px-4">
      <div class="flex items-center w-full space-x-4">
        <AppHeaderSwitcher />
        <Button
          variant="outline"
          @click="dialogStore.openDialog(Dialogs.NewTask)"
        >
          <Plus class="w-4 h-4 mr-2" />
          New task
        </Button>
        <AppHeaderNav />
      </div>

      <div class="flex items-center justify-end w-full space-x-4">
        <AppHeaderThemeSwitcher />
        <AppHeaderUser />
      </div>
    </div>
  </header>
</template>
