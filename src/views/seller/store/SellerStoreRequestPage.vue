<template>
  <SellerLayout>
    <SellerSideLayout :links="links"></SellerSideLayout>
    <SellerContentLayout>
      <RequestComponent></RequestComponent>
    </SellerContentLayout>
  </SellerLayout>
</template>

<script setup>
  import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import BasicLayout from "@/layouts/seller/SellerLayout.vue";
  import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import {ref} from "vue";
  import RequestComponent from "@/components/seller/store/RequestComponent.vue";
  import SellerLayout from "@/layouts/seller/SellerLayout.vue";
  import SellerSideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import SellerContentLayout from "@/layouts/seller/SellerContentLayout.vue";


  const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '영업 상태 현황', name: 'SellerStoreStatusPage' },
    { icon: 'mdi-send', title: '영업 상태 변경 신청', name: 'SellerStoreRequestPage' },
  ])
</script>

<style scoped>

</style>
