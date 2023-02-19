<template>
  <BasicLayout>
    <ContentLayout>
      <JoinComponent @handleLoginPage="handleLoginPage"></JoinComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
import JoinComponent from "@/components/common/SellerJoinComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const handleLoginPage = () =>{

  router.push({name : 'LoginPage'})
}
</script>

<style scoped>

</style>
