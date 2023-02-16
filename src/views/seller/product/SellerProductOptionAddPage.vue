<template>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <OptionAddComponent @handleMoveList="handleMoveList"></OptionAddComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import {ref} from "vue";
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
import {useRoute, useRouter} from "vue-router";
import OptionAddComponent from "@/components/seller/product/OptionAddComponent.vue";

const route = useRoute();
const router = useRouter();

const handleMoveList = () => {
  router.push({name: 'SellerProductListPage', query: route.query})
}

const links = ref([
  {icon: 'mdi-inbox-arrow-down', title: '상품 목록', name: 'SellerProductListPage'},
  {icon: 'mdi-send', title: '상품 등록', name: 'SellerProductAddPage'},
])
</script>

<style scoped>

</style>
