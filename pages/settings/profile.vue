<script setup lang="ts">
import { FieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { CrossIcon } from "lucide-vue-next";

const profileFormSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
    bio: z
      .string()
      .max(160, { message: "Bio must not be longer than 160 characters." })
      .min(4, { message: "Bio must be at least 2 characters." }),
    urls: z
      .array(
        z.object({
          value: z.string().url({ message: "Please enter a valid URL." }),
        })
      )
      .optional(),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    username: "Thomas Johnson",
    email: "arnoldsly@example.com",
    urls: [
      { value: "http://facebook.com/arnoldssly" },
      { value: "http://twitter.com/arnoldssly" },
    ],
  },
});

const onSubmit = handleSubmit((values) => {
  console.log("submit", values);
});
</script>

<template>
  <div>
    <div class="pb-6">
      <h3 class="text-lg font-medium">Profile</h3>
      <p class="text-sm text-muted-foreground">
        This is how others will see you on the site.
      </p>
    </div>
    <Separator />
    <form @submit="onSubmit" class="py-6">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem class="pb-8">
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Arnoldsly"
              v-bind="componentField"
              disabled
            />
          </FormControl>
          <FormDescription>
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="pb-8">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="arnoldsly@example.com"
              v-bind="componentField"
              disabled
            />
          </FormControl>
          <FormDescription>
            You can manage verified email addresses in your email settings.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="bio">
        <FormItem class="pb-8">
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea v-bind="componentField" disabled />
          </FormControl>
          <FormDescription>
            You can <span>@mention</span> other users and organizations to link
            to them.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="pb-8">
        <FieldArray v-slot="{ fields, push, remove }" name="urls">
          <div v-for="(field, index) in fields" :key="`urls-${field.key}`">
            <FormField
              v-slot="{ componentField }"
              :name="`urls[${index}].value`"
            >
              <FormItem>
                <FormLabel :class="cn(index !== 0 && 'sr-only')">
                  URLs
                </FormLabel>
                <FormDescription :class="cn(index !== 0 && 'sr-only')">
                  Add links to your website, blog, or social media profiles.
                </FormDescription>
                <div class="relative flex items-center">
                  <FormControl>
                    <Input type="url" v-bind="componentField" disabled />
                  </FormControl>
                  <button
                    type="button"
                    class="absolute py-2 pe-3 end-0 text-muted-foreground"
                    @click="remove(index)"
                    disabled
                  >
                    <CrossIcon class="w-3" />
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            class="w-20 mt-2 text-xs"
            @click="push({ value: '' })"
            disabled
          >
            Add URL
          </Button>
        </FieldArray>
      </div>

      <div class="flex justify-start gap-2">
        <Button type="submit" disabled> Update profile </Button>

        <Button type="button" variant="outline" @click="resetForm" disabled>
          Reset form
        </Button>
      </div>
    </form>
  </div>
</template>
