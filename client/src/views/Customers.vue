<template>

  <label class="input-group p-2">
    <span class="bg-transparent">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </span>
    <input type="text" v-model="filter" placeholder="Seatch..." class="input input-ghost" />
  </label>
  
  <table class="table w-full hidden md:block">
    <thead>
      <tr>
        <th>Name</th>
        <th>Lastname</th>
        <th>Email</th>
        <th>Created On</th>
        <th>Status</th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
      <tr v-if="customers" v-for="row in filteredRows" :key="row.email" class="hover">
        <td v-html="highlightMatches(row.name)"></td>
        <td v-html="highlightMatches(row.lastname)"></td>
        <td v-html="highlightMatches(row.email)"></td>
        <td v-html="highlightMatches(changeDateFormat(row.created))"></td>
        <td v-if="row.status">
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
        <td>
          <button  @click="deleteUser(row.email)" type="button" class="text-red-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-expanded="false">  
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- Mobile view -->
  <table class="table w-full md:hidden">
    <thead>
      <tr>
        <th>Name</th>
        <th>Lastname</th>

      </tr>
    </thead>
    <tbody>
      <tr v-if="customers" v-for="row in filteredRows" :key="row.email" class="hover">
        <td v-html="highlightMatches(row.name)"></td>
        <td v-html="highlightMatches(row.lastname)"></td>
        <td>
            <label @click="loadMobileModal(row)" class="btn btn-ghost">
                <svg height="16px" id="Layer_1" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" width="16px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z"/></svg>
            </label>
            <div v-if="showMobileModal" class="fixed z-50 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0"></div>
                    <div class="modal-box">
                        <h2 class="text-lg font-medium mb-4">Customer options</h2>
                        <ul class="menu bg-base-100 w-56">
                            <li><a @click="deleteUser(currCustomer.email); showMobileModal = !showMobileModal">Delete</a></li>
                            <li><a>Disable</a></li>
                        </ul>
                        <div class="modal-action">
                            <label @click="showMobileModal = !showMobileModal" class="btn">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </td>
      </tr>
    </tbody>
  </table>


<!-- The button to open new customer modal -->
<button @click="showModal = !showModal" class="btn primary">New customer</button>

<div v-if="showModal" class="fixed z-50 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen">
    <div class="fixed inset-0"></div>
      <div class="modal-box">
        <h2 class="text-lg font-medium mb-4">New Customer</h2>
        
        <form @submit.prevent="onSubmit" class="form-control">
        <label class="label">
        <span class="label-text">Customer Information</span>
        </label>
        <label class="flex flex-col input-group pb-4">
        <span for="first-name" class="w-full max-w-xs">First name</span>
        <input v-model="form.name" name="first-name" id="first-name" autocomplete="given-name" required type="text" placeholder="John" class="input input-bordered w-full max-w-xs" />
        </label>
        <label class="flex flex-col input-group pb-4">
        <span for="last-name" class="w-full max-w-xs">Last name</span>
        <input v-model="form.lastname" name="last-name" id="last-name" autocomplete="family-name" required type="text" placeholder="Dou" class="input input-bordered w-full max-w-xs" />
        </label>
        <label class="flex flex-col input-group pb-4">
        <span for="enail" class="w-full max-w-xs">Email</span>
        <input v-model="form.email" name="email" id="email" autocomplete="email" required type="email" placeholder="john@example.com" class="input input-bordered w-full max-w-xs" />
        </label>
        <div>
        <button type="submit" class="btn primary">Add Customer</button>
        <label @click="showModal = !showModal" class="btn">Cancel</label>
        </div>
        </form>
        
      </div>
  </div>
</div>

</template>
<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { useUserStore } from "../stores/user";
import Swal from 'sweetalert2';

import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const user = userStore.user;
const allCustomersUrl = '/api/customers/all'
const deleteUserUrl = '/api/customer/delete'
const addCustomerUrl = "/api/customers/add";

const allCustomers = ref({})
const customers = ref([])
const currCustomer = ref(null)

const showModal = ref(false);
const showMobileModal = ref(false);

const filter = ref("")


const form = ref({
  name: "",
  lastname: "",
  email: "",
})

const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.accessToken,
      },
    }

fetchAllCustomers()

watchEffect(() => {
  customers.value = allCustomers.value.customers
  
})

function loadMobileModal(customer: any) {
    showMobileModal.value = !showMobileModal.value
    currCustomer.value = customer
}

function fetchAllCustomers(): void {
  fetch(allCustomersUrl, requestOptions).then(async (response) => {
    if (response.ok) {
      allCustomers.value = await response.json()
      // reset form at start and after
      form.value.name = "";
      form.value.lastname = "";
      form.value.email = "";
    }
  })
}

function deleteUser(email: string) {
  Swal.fire({
    title: `Are you sure you want to delete this ${email}?`,
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
          email: email
        }),
      }

      fetch(deleteUserUrl, requestOptions).then((response) => {
        response.ok
          ? fetchAllCustomers()
          : Swal.fire(
              'User was not deleted',
              'You do not have the priviledges',
              'info'
            )
      })
    }
    else if (result.isDenied) {
      Swal.fire('Customer was not deleted', '', 'info')
    }
  })
}

function onSubmit(): void {
  Swal.fire({
    title: 'Are you sure you want to add the customer?',
    showDenyButton: true,
    confirmButtonText: 'Create',
    denyButtonText: `Cancel`,
  })
  .then((result) => {
    /*   */
    if (result.isConfirmed) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.accessToken,
        },
        body: JSON.stringify({
          name: form.value.name,
          lastname: form.value.lastname,
          email: form.value.email,
        }),
      }

      fetch(addCustomerUrl, requestOptions).then((response) => {
        response.ok
          ? fetchAllCustomers()
          : response.json().then(json => {
            Swal.fire(
              'Customer was not created',
              json.message,
              'info'
            )
          })
      })
    } else if (result.isDenied) {
      Swal.fire('customer was not added', '', 'info')
      // reset form
      form.value.name = "";
      form.value.lastname = "";
      form.value.email = "";
    }
  });
  showModal.value = !showModal.value
}

function changeDateFormat(str: string): String {
  let date = new Date(str)
    return date.toLocaleDateString("en-US");
}

function booleanToString(bool: Boolean): string {
  return bool.toString()
}

const filteredRows = computed(() => {  
  return customers.value.filter((row: String) => {
      const name = row.name;
      const lastname = row.lastname;
      const email = row.email;
      const created = changeDateFormat(row.created);
      const status = ""+ row.status;

      const searchTerm = filter.value.toLowerCase();

      return name.toLowerCase().includes(searchTerm) || 
      lastname.toLowerCase().includes(searchTerm) || email.toLowerCase().includes(searchTerm) || 
      created.toLowerCase().includes(searchTerm) || status.toLowerCase().includes(searchTerm);
    });
})

function highlightMatches(text: string) {
  const matchExists = text.toLowerCase().includes(filter.value.toLowerCase());
  if (!matchExists) return text;

  const re = new RegExp(filter.value, 'ig');
  return text.replace(re, matchedText => `<strong>${matchedText}</strong>`);
}
</script>
