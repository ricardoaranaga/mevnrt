<template>
<div style="text-align: center;">
  <h1 class="text-3xl font-bold underline">
    {{$route.meta.layout}}
  </h1>
</div>
<hr>
  <component :is="layout"> <router-view /> </component>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { markRaw, ref, watch } from 'vue'
import AppLayoutDefault from './layouts/defaultLayout.vue'

  const layout = ref()
  const route = useRoute()

  watch(
    () => route.meta?.layout as string | undefined,
    async (metaLayout) => {
      try {
        const component = metaLayout && await import(/* @vite-ignore */ `./layouts/${metaLayout}.vue`)
        layout.value = markRaw(component?.default || AppLayoutDefault)
      } catch (e) {
        layout.value = markRaw(AppLayoutDefault)
      }
    },
    { immediate: true }
  )
</script>
