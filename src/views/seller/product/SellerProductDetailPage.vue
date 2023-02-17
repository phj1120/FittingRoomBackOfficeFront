<template>
  <BasicLayout>
    <h1>Seller Product Detail Page</h1>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <DetailComponent></DetailComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
import DetailComponent from "@/components/seller/product/DetailComponent.vue";</script>

<style scoped>

</style>
