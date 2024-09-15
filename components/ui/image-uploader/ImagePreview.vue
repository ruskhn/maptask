<script lang="ts" setup>
import { Trash } from "lucide-vue-next";

type ImagePreviewProps = {
  img: string;
};

defineProps<ImagePreviewProps>();
const emit = defineEmits(["delete"]);
</script>

<template>
  <div class="relative w-full h-full cursor-pointer select-none group">
    <img
      :src="img"
      alt="Uploaded Image"
      class="object-cover w-full h-full transition-opacity rounded-md"
    />
    <div
      class="absolute inset-0 transition-opacity bg-black rounded-md opacity-0 group-hover:opacity-40"
    ></div>
    <Trash
      class="absolute text-white transition-opacity opacity-0 right-1 top-2 size-4 group-hover:opacity-100"
      @click="emit('delete')"
    />
  </div>
</template>
