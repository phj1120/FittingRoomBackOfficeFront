<template>
  <CommonLayout>
    <CommonContentLayout>
      <LoginComponent @loginRouter="loginRouter" @handleSellerJoinPage="handleSellerJoinPage" @handlePlaceAdminJoinPage="handlePlaceAdminJoinPage"></LoginComponent>
    </CommonContentLayout>
  </CommonLayout>
</template>

<script setup>
  import LoginComponent from "@/components/common/LoginComponent.vue";
  import {useRouter} from "vue-router";
  import CommonLayout from "@/layouts/common/CommonLayout.vue";
  import CommonContentLayout from "@/layouts/common/CommonContentLayout.vue";


  const router = useRouter()
  console.log(window.location.hostname.indexOf('armysseung.iptime.org'))

  const loginRouter = ( pageName ) => {
    router.push({name : pageName})
  }

  const handleSellerJoinPage = () => {
    router.push({name : 'SellerJoinPage'})
  }

  const handlePlaceAdminJoinPage = () => {
    router.push({name : 'PlaceAdminJoinPage'})
  }
</script>

<style scoped>
</style>
