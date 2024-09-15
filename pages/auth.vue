<script setup lang="ts">
import { FormField } from "~/components/ui/form";
import Logo from "~/components/ui/logo.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

definePageMeta({
  layout: "auth",
});

const router = useRouter();

const authFormSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
    password: z
      .string()
      .min(6, {
        message: "Password must contain at least 6 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
      }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: authFormSchema,
  initialValues: {
    email: "example@gmail.com",
    password: "administrator",
  },
});

const onSubmit = handleSubmit(async (values) => {
  const { data } = await useFetch("/api/user/login", {
    method: "post",
    body: values,
  });
  if (data.value) {
    await router.push("/");
  }
});
</script>

<template>
  <div class="w-[360px] space-y-[100px]">
    <div class="flex justify-center gap-2 w-full"><logo /> MapTaskRusGuru</div>
    <form class="space-y-6" @submit="onSubmit">
      <div class="text-center space-y-3">
        <h2 class="text-xl font-medium">Welcome back</h2>
        <div class="text-[#71717A]">
          Enter your email below to login to your account
        </div>
      </div>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="example@gmail.com"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full"> Login </Button>

      <div class="text-center text-xs">
        <a href="/">Forgot your password?</a>
      </div>
      <div class="text-center text-xs">
        Dont have an account? <a href="/">Sign up</a>
      </div>
    </form>
  </div>
</template>
