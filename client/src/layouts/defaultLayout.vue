<template>
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><RouterLink to="/">Dashboard</RouterLink></li>
        <li><RouterLink to="/customers">Customers</RouterLink></li>
        <li v-if="userStore.isAdmin"><RouterLink to="/register">Register</RouterLink></li>
        <li v-if="userStore.isAdmin"><RouterLink to="/users">Users</RouterLink></li>
        <li><a @click="logout">Logout</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost normal-case text-xl">Pool Tech App</a>
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <button :disabled="events.length < 1" @click="showEvents = !showEvents" class="btn btn-ghost btn-circle">
      <div class="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span v-if="events.length > 0" class="badge badge-xs badge-primary indicator-item">{{events.length}}</span>
      </div>
    </button>
    <div v-if="showEvents" class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                <div class="ml-4">
                    <p v-for="(event, index) in events" class="text-base font-medium text-gray-900">{{events[index]}}</p>
                </div>
            </div>
        </div>
    </div>

  </div>
</div>


<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">   
    <main>
        <router-view />
    </main>
</div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();
// reactive state
const root = ref(null)
const showAdmin = ref(false)
const showEvents = ref(false)
let drawer = ref(false);
let mini = ref(false);
let events = ref([]);
const userStore = useUserStore();
let user = userStore.user;

const items = [
  {
    icon: "server",
    title: "Home",
    link: "/",
  },
  {
    icon: "people-roof",
    title: "Customers",
    link: "/customers",
  },
];

function logout(): void {
  userStore.clearUser() ? router.push({ path: "/login" }) : console.log('error logging out');
}

// lifecycle hooks
onMounted(() => {
  // console.log(`The initial count is ${count.value}.`);
  // console.log(`drawer is ${drawer.value}`);
  try {
    const ws = new WebSocket("ws://localhost:7001");
    ws.onmessage = ({ data }) => {
      events.value.push(data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 4000,
      });
    };
  } catch (err) {
    // console.error(err)
  }

  window.addEventListener('click', (e) => {
    if(root.value) {
      if (!root.value.contains(e.target)){
        showAdmin.value = false
        showEvents.value = false
      }
    }
  })
});
</script>

<style>
ul {
  list-style-type: none;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04AA6D;
}
</style>
