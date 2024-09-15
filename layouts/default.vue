<script lang="ts" setup>
// import AppHeader from '~/components/app/header/AppHeader.vue';
</script>

<template>
  <AppHeader />
  <div>
    <slot />
  </div>
  <Toaster
    class="pointer-events-auto"
    position="top-right"
    offset="32px"
    :toast-options="{
      duration: 100000,
    }"
  />
</template>
