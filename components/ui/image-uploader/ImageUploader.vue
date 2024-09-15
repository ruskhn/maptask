<script setup lang="ts">
import { ref } from "vue";
import ImageInput from "./ImageInput.vue";
import ImagePreview from "./ImagePreview.vue";

const images = ref([]);

const addImage = (img) => {
  if (images.value.length < 4) {
    images.value.push(img);
  }
};

const removeImage = (index: number) => {
  images.value.splice(index, 1);
};
</script>

<template>
  <div class="grid w-full grid-cols-4 grid-rows-3 gap-2 h-60">
    <template v-for="(img, index) in images" :key="index">
      <div
        v-if="index === 0"
        class="col-span-3 row-span-3 border border-dashed rounded-md"
      >
        <ImagePreview :img="img" @delete="removeImage(index)" />
      </div>
      <div v-else class="border border-dashed rounded-md">
        <ImagePreview :img="img" @delete="removeImage(index)" />
      </div>
    </template>
    <div
      v-if="images.length < 4"
      :class="images.length === 0 ? 'col-span-3 row-span-3' : ''"
      class="border border-dashed rounded-md"
    >
      <ImageInput @file-added="addImage" />
    </div>
  </div>
</template>
