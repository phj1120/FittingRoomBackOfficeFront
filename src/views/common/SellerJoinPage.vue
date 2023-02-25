<template>
  <CommonLayout>
    <CommonContentLayout>
      <SellerJoinComponent @handleLoginPage="handleLoginPage"></SellerJoinComponent>
    </CommonContentLayout>
  </CommonLayout>
</template>

<script setup>
  import {useRouter} from "vue-router";
  import SellerJoinComponent from "@/components/common/SellerJoinComponent.vue";
  import CommonLayout from "@/layouts/common/CommonLayout.vue";
  import CommonContentLayout from "@/layouts/common/CommonContentLayout.vue";


  const router = useRouter()


  const handleLoginPage = () =>{
    router.push({name : 'LoginPage'})
  }
</script>

<style scoped>

</style>
