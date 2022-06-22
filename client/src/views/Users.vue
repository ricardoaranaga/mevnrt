<template>
<div>

  <table class="border-collapse border border-slate-500 w-full">
    <thead>
      <tr>
        <th class="border border-slate-600 bg-slate-400">Username</th>
        <th class="border border-slate-600 bg-slate-400">Name</th>
        <th class="border border-slate-600 bg-slate-400">Lastname</th>
        <th class="border border-slate-600 bg-slate-400">Email</th>
        <th class="border border-slate-600 bg-slate-400">Role</th>
        <th class="border border-slate-600 bg-slate-400">Created On</th>
        <th class="border border-slate-600 bg-slate-400">Status</th>
        <th class="border border-slate-600 bg-slate-400">Delete</th>
        
      </tr>
    </thead>
    <tbody>
      <tr v-if="users" v-for="row in filteredRows" :key="row._id">
        <td class="border border-slate-700" v-html="highlightMatches(row.username)"></td>
        <td class="border border-slate-700" v-html="highlightMatches(row.name)"></td>
        <td class="border border-slate-700" v-html="highlightMatches(row.lastname)"></td>
        <td class="border border-slate-700" v-html="highlightMatches(row.email)"></td>
        <td class="border border-slate-700" v-html="highlightMatches(joinRoles(row.roles))"></td>
        <td class="border border-slate-700" v-html="highlightMatches(changeDateFormat(row.created))"></td>
        <td v-if="row.status" class="border border-slate-700">
          <button type="button" class="text-green-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false">  
            <svg xmlns="http://www.w3.org/2000/svg" class="text-red h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </td>
        <td v-else >
          <button type="button" class="text-red-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false">  
            <svg xmlns="http://www.w3.org/2000/svg" class="text-red h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </td>
        <td class="border border-slate-700">
          <button  @click="deleteUser(row.username)" type="button" class="text-red-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false">  
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <input type="text"
         placeholder="Filter by department or employee"
         v-model="filter" />
</div>

</template>
<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { useUserStore } from "../stores/user";
import Swal from 'sweetalert2';

const userStore = useUserStore();
const user = userStore.user;
const allUsersUrl = 'http://localhost:7000/api/users/all'
const deleteUserUrl = 'http://localhost:7000/api/auth/delete'

const allUsers = ref({})
const users = ref([])
const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.accessToken,
      },
    }

fetchAllUsers()

watchEffect(() => {
  users.value = allUsers.value.users
  
})

const filter = ref("")

function fetchAllUsers(): void {
  fetch(allUsersUrl, requestOptions).then(async (response) => {
    if (response.ok) {
      allUsers.value = await response.json()
     //  console.log(allUsers.value);
    }
  })
}

function changeDateFormat(str: string): String {
  let date = new Date(str)
    return date.toLocaleDateString("en-US");
}

function booleanToString(bool: Boolean): string {
  return bool.toString()
}

function joinRoles(array: Array<any>): String {
  let result = ''
  array.forEach((role) => {
    result += role.name.toString()+', '
  })
  return result.slice(0, -2)
}

const filteredRows = computed(() => {  
  return users.value.filter((row: String) => {
      const username = row.username;
      const name = row.name;
      const lastname = row.lastname;
      const email = row.email;
      const roles = joinRoles(row.roles);
      const created = changeDateFormat(row.created);
      const status = ""+ row.status;

      const searchTerm = filter.value.toLowerCase();

      return username.toLowerCase().includes(searchTerm) || name.toLowerCase().includes(searchTerm) || 
      lastname.toLowerCase().includes(searchTerm) || email.toLowerCase().includes(searchTerm) || 
      roles.toLowerCase().includes(searchTerm) || created.toLowerCase().includes(searchTerm) || 
      status.toLowerCase().includes(searchTerm);
    });
})

function highlightMatches(text: string) {
  const matchExists = text.toLowerCase().includes(filter.value.toLowerCase());
  if (!matchExists) return text;

  const re = new RegExp(filter.value, 'ig');
  return text.replace(re, matchedText => `<strong>${matchedText}</strong>`);
}

function deleteUser(userName: string) {
  console.log(userName)
  Swal.fire({
    title: 'Are you sure you want to delete the user?',
    showDenyButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Cancel`,
  })
  .then((result) => {
    if (result.isConfirmed) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.accessToken,
        },
        body: JSON.stringify({
          username: userName
        }),
      }

      fetch(deleteUserUrl, requestOptions).then((response) => {
        response.ok
          ? fetchAllUsers()
          : Swal.fire(
              'User was not deleted',
              'You do not have the priviledges',
              'info'
            )
      })
    }
    else if (result.isDenied) {
      Swal.fire('User was not deleted', '', 'info')
    }
  })
}

</script>

