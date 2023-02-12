<template>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <StatusComponent></StatusComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
  import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import BasicLayout from "@/layouts/seller/SellerLayout.vue";
  import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import {ref} from "vue";
  import StatusComponent from "@/components/seller/store/StatusComponent.vue";


  const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '영업 상태 현황', name: 'SellerStoreStatusPage' },
    { icon: 'mdi-send', title: '영업 상태 변경 신청', name: 'SellerStoreRequestPage' },
  ])
</script>

<style scoped>

</style>
