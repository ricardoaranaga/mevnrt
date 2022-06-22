<template>
  <div ref="root" class="relative bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <a href="#">
          <span class="sr-only">Workflow</span>
          <div class="flex -space-x-1 overflow-hidden">
            <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
        </a>
      </div>
      <div class="-mr-2 -my-2 md:hidden">
        <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
          <span class="sr-only">Open menu</span>
          <!-- Heroicon name: outline/menu -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <nav class="hidden md:flex space-x-10">
        <RouterLink to="/" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
          <div class="ml-4">
            <p class="text-base font-medium text-gray-500">Dashboard</p>
          </div>
        </RouterLink>
        <RouterLink to="/leads" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
          <div class="ml-4">
            <p class="text-base font-medium text-gray-500">Leads</p>
          </div>
        </RouterLink>
        <RouterLink to="/customers" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
          <div class="ml-4">
            <p class="text-base font-medium text-gray-500">Customers</p>
          </div>
        </RouterLink>

        <div class="relative" v-if="userStore.isAdmin">
          <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
          <button @click="showAdmin = !showAdmin" type="button" class="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false">
            <span>Admin</span>
            <!--
              Heroicon name: solid/chevron-down

              Item active: "text-gray-600", Item inactive: "text-gray-400"
            -->
            <svg class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <!--
            'showAdmin' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          -->
          <div v-if="showAdmin" class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
            <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                <RouterLink @click="showAdmin = !showAdmin" to="/register" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                  <!-- Heroicon name: outline/support -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div class="ml-4">
                    <p class="text-base font-medium text-gray-900">Register</p>
                    <p class="mt-1 text-sm text-gray-500">Register a new user to the _____ Team. You will need their user email address.</p>
                  </div>
                </RouterLink>

                <RouterLink @click="showAdmin = !showAdmin" to="/users" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                  <!-- Heroicon name: outline/bookmark-alt -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <div class="ml-4">
                    <p class="text-base font-medium text-gray-900">User List</p>
                    <p class="mt-1 text-sm text-gray-500">View all of the users in the _____ Team to manage their accounts.</p>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>

        </div>
      </nav>
      <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <!-- Notification Bell -->
          <div class="relative">
            <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
            <button :disabled="events.length < 1" @click="showEvents = !showEvents" type="button" class="disabled:opacity-25 disabled:cursor-not-allowed text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false">
              <!-- Heroicon name: outline/bookmark-alt -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div>
                <span class="text-red-500 relative bottom-3 left-0"> {{events.length}} </span>
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


        <!-- Logout Button -->
        <a href="#" @click="logout" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Log out </a>
      </div>
    </div>
  </div>

  <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->
  <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
    <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
      <div class="pt-5 pb-6 px-5">
        <div class="flex items-center justify-between">
          <div>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
          </div>
          <div class="-mr-2">
            <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-6">
          <nav class="grid gap-y-8">
            
          </nav>
        </div>
      </div>
      <div class="py-6 px-5 space-y-6">
        <div class="grid grid-cols-2 gap-y-4 gap-x-8">
          <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Pricing </a>

          <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Docs </a>

          <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Help Center </a>

          <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Guides </a>

          <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Events </a>

          <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Security </a>
        </div>
        <div>
          <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Sign up </a>
          <p class="mt-6 text-center text-base font-medium text-gray-500">
            Existing customer?
            <a href="#" class="text-indigo-600 hover:text-indigo-500"> Sign in </a>
          </p>
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

  <!-- <v-app id="inspire">
    <v-app-bar v-if="user" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Redistail-mevn CRM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-item-action>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div class="text-xs-center pr-3 mt-2">
                <v-badge left="" overlap>
                  <span slot="badge">{{ events.length }}</span>
                  <v-btn
                    elevation="0"
                    fab
                    small
                    v-bind="attrs"
                    :disabled="events.length < 1"
                    v-on="on"
                  >
                    <v-icon large color="grey lighten-1"
                      >mdi-bell-outline</v-icon
                    >
                  </v-btn>
                </v-badge>
              </div>
            </template>
            <v-list three-line>
              <template v-for="item in events" :key="item">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-account-alert-outline</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </div>
      </v-list-item-action>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :mini-variant="mini" app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            src="https://randomuser.me/api/portraits/men/85.jpg"
            @click.stop="mini = !mini"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-title v-if="user">user.username</v-list-item-title>

        <v-list-item-action>
          <v-menu
            bottom
            right
            offset-y
            origin="bottom right"
            transition="v-slide-y-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn slot="activator" icon small light v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-btn text small class="px-0">Change password</v-btn>
                  <v-btn text small class="px-0">Logout</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
        <v-list-item-action style="max-width: 1em">
          <v-btn icon small @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-divider></v-divider>
        <br />
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-shield-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item>
        <v-list dense>
          <v-list-item to="/register">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>

          <v-list-item to="/users">
            <v-list-item-icon>
              <v-icon>mdi-view-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>User List</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app> -->

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
    icon: "headset",
    title: "Leads",
    link: "/leads",
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
