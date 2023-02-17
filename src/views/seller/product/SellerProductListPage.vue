<template>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <ListComponent></ListComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
  import {ref} from "vue";
  import ListComponent from "@/components/seller/product/ListComponent.vue";
  import BasicLayout from "@/layouts/seller/SellerLayout.vue";
  import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import SideLayout from "@/layouts/seller/SellerSideLayout.vue";

  const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '상품 목록', name: 'SellerProductListPage' },
    { icon: 'mdi-send', title: '상품 등록', name: 'SellerProductAddPage' },
  ])
</script>

<style scoped>

</style>
