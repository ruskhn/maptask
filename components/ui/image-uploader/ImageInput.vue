<script setup>
import { ref } from "vue";
import { Upload } from "lucide-vue-next";

const fileInput = ref(null);
const isDragging = ref(false);
const emit = defineEmits(["file-added"]);

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        emit("file-added", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleDrop = (event) => {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files);
  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        emit("file-added", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
};

const handleDragEnter = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};
</script>

<template>
  <div
    class="flex items-center justify-center w-full h-full transition-colors cursor-pointer bg-background text-muted-foreground hover:bg-muted"
    :class="{ 'bg-muted': isDragging }"
    @drop.prevent="handleDrop"
    @dragover.prevent
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @click="triggerFileInput"
  >
    <input
      type="file"
      class="hidden"
      ref="fileInput"
      accept="image/*"
      @change="handleFileChange"
      multiple
    />
    <Upload class="size-5" />
  </div>
</template>
