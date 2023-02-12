<template>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <RequestComponent></RequestComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
  import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import BasicLayout from "@/layouts/seller/SellerLayout.vue";
  import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import {ref} from "vue";
  import RequestComponent from "@/components/seller/dress/RequestComponent.vue";


  const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '프로필 보기/수정', name: 'SellerDressProfilePage' },
    { icon: 'mdi-send', title: '입어볼래 Q&A', name: 'SellerDressRequestPage' },
  ])
</script>

<style scoped>

</style>
