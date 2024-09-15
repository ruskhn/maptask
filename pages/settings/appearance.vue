<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { ChevronDown } from "lucide-vue-next";

import { buttonVariants } from "~/components/ui/button";

const appearanceFormSchema = toTypedSchema(
  z.object({
    theme: z.enum(["light", "dark"], {
      required_error: "Please select a theme.",
    }),
    lang: z.enum(["english", "russian"], {
      invalid_type_error: "Select a font",
      required_error: "Please select a font.",
    }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: appearanceFormSchema,
  initialValues: {
    theme: "light",
    lang: "english",
  },
});

const onSubmit = handleSubmit((values) => {
  console.log("sumbit", values);
});
</script>

<template>
  <div>
    <div class="pb-6">
      <h3 class="text-lg font-medium">Appearance</h3>
      <p class="text-sm text-muted-foreground">
        Customize the appearance of the app. Automatically switch between day
        and night themes.
      </p>
    </div>
    <Separator />
    <form class="py-6 space-y-8" @submit="onSubmit">
      <FormField v-slot="{ field }" name="lang">
        <FormItem>
          <FormLabel>Language</FormLabel>
          <div class="relative w-[200px]">
            <FormControl>
              <select
                disabled
                :class="
                  cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-[200px] appearance-none font-normal'
                  )
                "
                v-bind="field"
              >
                <option value="english">English</option>
                <option value="russian">Russian</option>
              </select>
            </FormControl>
            <ChevronDown
              class="pointer-events-none absolute right-3 top-2.5 h-4 w-4 opacity-50"
            />
          </div>
          <FormDescription> Set the language you want to use. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" type="radio" name="theme">
        <FormItem class="space-y-1">
          <FormLabel>Theme</FormLabel>
          <FormDescription>
            Select the theme for the dashboard.
          </FormDescription>
          <FormMessage />

          <RadioGroup
            class="grid max-w-md grid-cols-2 gap-8 pt-2"
            v-bind="componentField"
          >
            <FormItem>
              <FormLabel
                class="[&:has([data-state=checked])>div]:border-primary"
              >
                <FormControl>
                  <RadioGroupItem value="light" class="sr-only" />
                </FormControl>
                <div
                  class="items-center p-1 border-2 rounded-md border-muted hover:border-accent"
                >
                  <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div class="p-2 space-y-2 bg-white rounded-md shadow-sm">
                      <div class="h-2 w-20 rounded-lg bg-[#ecedef]" />
                      <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div
                      class="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm"
                    >
                      <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div
                      class="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm"
                    >
                      <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                </div>
                <span class="block w-full p-2 font-normal text-center">
                  Light
                </span>
              </FormLabel>
            </FormItem>
            <FormItem>
              <FormLabel
                class="[&:has([data-state=checked])>div]:border-primary"
              >
                <FormControl>
                  <RadioGroupItem value="dark" class="sr-only" />
                </FormControl>
                <div
                  class="items-center p-1 border-2 rounded-md border-muted bg-popover hover:bg-accent hover:text-accent-foreground"
                >
                  <div class="p-2 space-y-2 rounded-sm bg-slate-950">
                    <div
                      class="p-2 space-y-2 rounded-md shadow-sm bg-slate-800"
                    >
                      <div class="w-20 h-2 rounded-lg bg-slate-400" />
                      <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div
                      class="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800"
                    >
                      <div class="w-4 h-4 rounded-full bg-slate-400" />
                      <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div
                      class="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800"
                    >
                      <div class="w-4 h-4 rounded-full bg-slate-400" />
                      <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                </div>
                <span class="block w-full p-2 font-normal text-center">
                  Dark
                </span>
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormItem>
      </FormField>

      <div class="flex justify-start">
        <Button type="submit" disabled> Update preferences </Button>
      </div>
    </form>
  </div>
</template>
