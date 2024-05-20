<script setup lang="ts">
import { defineProps } from 'vue';
import { VAppBarNavIcon } from 'vuetify/components'

const props = defineProps({
  title: String
});
</script>

<template>
  <v-app-bar class="bg-blue-darken-4 position-relative" :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ title }}</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>

</style>