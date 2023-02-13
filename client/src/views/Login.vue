<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
    </div>
    <form class="mt-8 space-y-6" @submit="onSubmit">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">Email address</label>
          <input v-model="loginForm.username" id="username" name="username" type="text" autocomplete="username" required class="input input-bordered input-primary w-full " placeholder="User Name">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input v-model="loginForm.password" id="password" name="password" type="password" autocomplete="current-password" required class="input input-bordered input-primary w-full" placeholder="Password">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="checkbox checkbox-primary">
          <label for="remember-me" class="ml-2 block text-sm"> Remember me </label>
        </div>

        <div class="text-sm">
          <a href="#"> Forgot your password? </a>
        </div>
      </div>

      <div>
        <button type="submit" class="btn btn-primary w-full">
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const jwtUrl = "/api/auth/signin";

let valid = true;

const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => (v && v.length >= 8) || "Password at 8 characters",
];

let loginForm = ref({
  username: "",
  password: "",
});

function onSubmit(ev: any): void {
  ev.preventDefault();
  loginForm.value.username = loginForm.value.username.toLowerCase();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: loginForm.value.username,
      password: loginForm.value.password,
    }),
  };

  fetch(jwtUrl, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      if (user.accessToken) {
        // console.log(user);
        (userStore.setUser(user)) ? router.push({ path: "/" }) : console.log('error setting user state');
      }
    });
}

</script>

<style></style>
