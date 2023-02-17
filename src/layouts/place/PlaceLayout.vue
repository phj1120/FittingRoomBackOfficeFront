<template>
  <v-app id="inspire">
    <v-app-bar class="bg-grey-darken-4" flat>
      <v-row>
        <v-container class="fill-height d-flex align-center">
          <v-btn v-for="link in links" :key="link.title" variant="text" :to="{ name: link.name }">
            {{ link.title }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn v-for="link in commonLinks" :key="link.title" variant="text" :to="{ name: link.name }">
            {{ link.title }}
          </v-btn>

        </v-container>
      </v-row>
    </v-app-bar>

    <slot></slot>
  </v-app>
</template>

<script setup>
  import {ref} from "vue";


  const links = ref([
    {title: '영업관리', name: 'PlaceRoomPage'},
    {title: '판매자관리', name: 'PlaceSellerPage'},
  ])

  const commonLinks = ref([
    {title: '판매자', name: 'SellerPage'},
    {title: '입어볼래', name: 'PlaceDressPage'},
    {title: '로그인', name: 'LoginPagePre'},
    {title: '로그아웃', name: 'LogoutPage'},
  ])
</script>

<style scoped>

</style>
