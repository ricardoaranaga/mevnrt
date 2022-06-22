<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-2 md:gap-6">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
        <p class="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
        <form @submit.prevent="onSubmit">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                  <input v-model="form.name" type="text" name="first-name" id="first-name" autocomplete="given-name" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                  <input v-model="form.lastname" type="text" name="last-name" id="last-name" autocomplete="family-name" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <input v-model="form.email" type="text" name="email" id="email" autocomplete="email" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-1">
                  <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
                  <select v-model="form.role" id="role" name="role" autocomplete="role-name" required class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                    <input v-model="form.username" type="text" name="username" id="username" autocomplete="username" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-half shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password" name="password" id="password" autocomplete="password" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-half shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from "../stores/user";
import Swal from 'sweetalert2';
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const user = userStore.$state.user
const signupUrl = "http://localhost:7000/api/auth/signup";

const form = ref({
  username: "",
  name: "",
  lastname: "",
  email: "",
  role: "user",
  password: ""
})

function onSubmit(): void {
  Swal.fire({
    title: 'Are you sure you want to add the user?',
    showDenyButton: true,
    confirmButtonText: 'Create',
    denyButtonText: `Cancel`,
  })
  .then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      form.value.username = form.value.username.toLowerCase()
      let roleArray = [form.value.role]
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.accessToken,
        },
        body: JSON.stringify({
          username: form.value.username,
          name: form.value.name,
          lastname: form.value.lastname,
          email: form.value.email,
          password: form.value.password,
          roles: roleArray,
        }),
      }

      fetch(signupUrl, requestOptions).then((response) => {
        response.ok
          ? router.push("/users")
          : response.json().then(json => {
            Swal.fire(
              'User was not created',
              json.message,
              'info'
            )
          })
      })
    } else if (result.isDenied) {
      Swal.fire('User was not created', '', 'info')
    }
  });
}
</script>
