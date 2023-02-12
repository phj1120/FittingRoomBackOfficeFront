<template>
  <v-navigation-drawer class="bg-grey-darken-3" v-model="drawer">
    <v-sheet color="grey-darken-4" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

      <div>admin@plateer.com</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="link in props.links" :key="link.icon" :to="{ name: link.name }" link>
        <template v-slot:prepend>
          <v-icon>{{ link.icon }}</v-icon>
        </template>

        <v-list-item-title>{{ link.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import {ref} from "vue";


  const props = defineProps(['links'])
  const drawer = ref(null)

</script>

<style scoped>

</style>
