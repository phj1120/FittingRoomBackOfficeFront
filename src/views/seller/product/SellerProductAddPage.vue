<template>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <AddComponent></AddComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import {ref} from "vue";
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
import AddComponent from "@/components/seller/product/AddComponent.vue";


const links = ref([
  { icon: 'mdi-inbox-arrow-down', title: '상품 목록', name: 'SellerProductListPage' },
  { icon: 'mdi-send', title: '상품 등록', name: 'SellerProductAddPage' },
  ])
</script>

<style scoped>

</style>
