<template>
  <div class="grid grid-cols-2 min-h-screen">
    <div class="w-[360px] m-auto">
      <slot/>
    </div>
    <div class="h-full">
      <video ref="video" autoplay muted loop class="auth-video" src="/videos/SnapSave.io-Earth from space __ Video clip__-(1080p).mp4" />
    </div>
  </div>
</template>

<style scoped>
.auth-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>