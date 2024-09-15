<script setup lang="ts">
const tabs = [
  { title: "Profile", href: "/settings/profile" },
  { title: "Billing", href: "/settings/billing" },
  { title: "Appearance", href: "/settings/appearance" },
  { title: "Notification", href: "/settings/notification" },
  { title: "Display", href: "/settings/display" },
];
</script>

<template>
  <div class="mx-auto my-8 w-fit">
    <div class="pb-6">
      <div class="text-2xl font-bold">Settings</div>
      <span class="text-muted-foreground">
        Manage your account settings and set e-mail preferences.
      </span>
    </div>
    <Separator />

    <div class="flex w-full gap-6">
      <nav class="w-[200px] pt-6">
        <NuxtLink v-for="tab in tabs" :to="`${tab.href}`">
          <Button
            variant="ghost"
            :class="
              cn(
                'w-full text-left justify-start',
                $route.path === `${tab.href}` && 'bg-muted hover:bg-muted'
              )
            "
          >
            {{ tab.title }}
          </Button>
        </NuxtLink>
      </nav>
      <div class="w-[1000px] pt-6">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
