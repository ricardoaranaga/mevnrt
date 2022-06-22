
<script setup lang="ts">
import '@vonage/vc-keypad/vc-keypad.js';
import VueResizable from 'vue-resizable';
import NexmoClient from 'nexmo-client';
import { ref, onMounted } from 'vue';

const resizableAttribs = []
const tW = 365
const tH = 365
const jwtUrl = "http://localhost:7000/no-auth"
let phone = ref({
  number: '',
  country: {}
})
let inputLabel = ref("Enter number")
let call = null
let app = null
let infoMessage = ""
let callInProgress = ref(false)
const bindProps = {
  mode: "national",
  defaultCountry: "US",
  onlyCountries: ["US"],
}

// lifecycle hooks
onMounted(() => {
  try {
    fetch(jwtUrl)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json.userJwt)
          new NexmoClient({debug: false})
          .login(json.userJwt)
          .then(res => {
            app = res
            
            // When the active member (the user) makes a call
            // keep a reference to the Call object so we can
            // hang up later
            app.on("member:call", (member, res) => {
                call = res
            });

            // Keep track of call status so we know how to
            // interact with the call e.g. hangup
            app.on("call:status:changed", (res) => {
              callInProgress.value =
                [
                  "machine",
                  "timeout",
                  "unanswered",
                  "rejected",
                  "busy",
                  "failed",
                  "completed"
                ].indexOf(res.status) === -1;
            })
          })
      })
      .catch(error => {
          console.error(error)
      })
  } catch (err) {
    // console.error(err)
  }
});

function validate() {
  if((phone.value.number.length == 10 && !phone.value.number.includes("+1")) || phone.value.number.match(/^(\+0?1)?\d{10}$/)) {
    if(phone.value.number.length == 10 && !phone.value.number.includes("+1")) {
      phone.value.number = "+1"+phone.value.number
    }
    inputLabel.value = "Press the call button"
    return true
  }
  else {
    inputLabel.value = "Enter a valid number"
    return false
  }
}

function controlCallClick() {
  if(callInProgress.value) {
    call.hangUp()
    call = null
    callInProgress.value = false
    phone.value.number = ""
  }
  else {
    let isValid = validate()
    if(isValid) {
      app.callServer(phone.value.number)
    }
  }
}

function hangUp() {
  call.hangUp()
  call = null
  callInProgress.value = false
  phone.value.number = ""
}

function addDigit(digit) {
  phone.value.number == undefined ? phone.value.number = "" : phone.value.number += digit
}

function deleteDigit() {
  phone.value.number == undefined ? phone.value.number = "" : phone.value.number = phone.value.number.slice(0, -1)
}

</script>

<template>
  <VueResizable
    class="text-center"
    dragSelector=".drag-container"
    :width=tW
    :height=tH
    left="200"
    top="200"
    :active="resizableAttribs"
  >
    <div class="block">
        <div class="table-container resizable-content block">
          <div class="rounded-t-3xl bg-indigo-700 text-white">
            <div class="drag-container">
              New Call
            </div>
            <div>
              {{inputLabel}}
            </div>
            <input
              v-model="phone.number"
              class="px-2 text-black"
            />
          </div>
          <div>
            <div
              class="d-flex justify-space-around my-3"
            >
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('1')"
              >
                1 <br> -
              </button>
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('2')"
              >
                2 <br> ABC
              </button>
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('3')"
              >
                3 <br> DEF
              </button>
            </div>
            <div
              class="d-flex justify-space-around my-3"
            >
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('4')"
              >
                4 <br> GHI
              </button>
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('5')"
              >
                5 <br> JKL
              </button>
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('6')"
              >
                6 <br> MNO
              </button>
            </div>
            <div
              class="d-flex justify-space-around my-3"
              flat
            >
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('7')"
              >
                7 <br> PQRS
              </button>
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('8')"
              >
                8 <br> TUV
              </button>
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('9')"
              >
                9 <br> WXYZ
              </button>
            </div>
            <div
              class="d-flex justify-space-around my-3"
              flat
            >
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('*')"
              >
                * <br>
              </button>
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('0')"
              >
                0 <br> +
              </button>
              <button
                class="p-0 w-16 h-16 rounded-full hover:bg-blue-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addDigit('#')"
              >
                # <br>
              </button>
            </div>
          </div>
          <div>
            <button v-if="!callInProgress"
              class="p-0 w-16 h-16 rounded-full bg-green-500 hover:bg-green-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              @click="controlCallClick"
            >
              Call
            </button>
            <button
              v-else
              class="p-0 w-16 h-16 rounded-full bg-red-500 hover:bg-red-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              @click="hangUp"
            >
              End
            </button>
          </div>
        </div>
      </div>
  </VueResizable>
</template>

<style scoped>

.resizable-content {
  text-align: center;
  width: 250px;
  background-color: white;
  box-shadow: 10px 10px 8px #888888;
  border: 1px solid #1976d3;
}
.block {
  border-radius: 25px;
}
.info {
  background-color: white;
  width: 250px;
  height: 250px;
}
.drag-container {
  cursor: pointer;
}

</style>
