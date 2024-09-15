<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const links = [
  {
    to: "/",
    title: "Map",
  },
  {
    to: "/tasks",
    title: "Tasks",
  },
  {
    to: "/dashboard",
    title: "Dashboard",
  },
];
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          :class="navigationMenuTriggerStyle()"
          active-class="!font-bold"
        >
          {{ link.title }}
        </NuxtLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
