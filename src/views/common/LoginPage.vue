<template>
  <CommonLayout>
    <CommonContentLayout>
      <LoginComponent @loginRouter="loginRouter" @handleSellerJoinPage="handleSellerJoinPage" @handlePlaceJoinPage="handlePlaceJoinPage"></LoginComponent>
    </CommonContentLayout>
  </CommonLayout>
</template>

<script setup>
  import LoginComponent from "@/components/common/LoginComponent.vue";
  import {useRouter} from "vue-router";
  import CommonLayout from "@/layouts/common/CommonLayout.vue";
  import CommonContentLayout from "@/layouts/common/CommonContentLayout.vue";


  const router = useRouter()


  const loginRouter = ( pageName ) => {
    router.push({name : pageName})
  }

  const handleSellerJoinPage = () => {
    router.push({name : 'SellerJoinPage'})
  }

  const handlePlaceJoinPage = () => {
    router.push({name : 'PlaceJoinPage'})
  }
</script>

<style scoped>
</style>
