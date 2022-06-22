<template>
  <div class="leads">
    <h1>This is the leads page</h1>
  </div>
  <Phone></Phone>
</template>

<script lang="ts" setup>
import Phone from "../components/Phone.vue"

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
