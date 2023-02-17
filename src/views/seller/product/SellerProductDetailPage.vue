<template>
  <BasicLayout>
    <h1>Seller Product Detail Page</h1>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <DetailComponent @handleUpdatePage="handleUpdatePage"></DetailComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
import DetailComponent from "@/components/seller/product/DetailComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const handleUpdatePage = (prNo) => {
  router.push({name: 'SellerProductUpdagePage', params: {prNo: prNo}})
  console.log(router)
}

</script>

<style scoped>

</style>
