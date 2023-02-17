<template>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <v-col cols="12" :key="refreshKey">
        <OptionAddComponent :prNo="prNo" @handleMoveList="handleMoveList" @handleRefreshKey="handleRefreshKey"></OptionAddComponent>
      </v-col>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import {ref} from "vue";
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
import {useRoute, useRouter} from "vue-router";
import OptionAddComponent from "@/components/seller/product/OptionComponent.vue";

const route = useRoute();
const router = useRouter();
const prNo = route.params.prNo
const refreshKey = ref(0)

const handleMoveList = () => {
  router.push({name: 'SellerProductListPage', query: route.query})
}

const handleRefreshKey = () => {
  refreshKey.value++
}

const links = ref([
  {icon: 'mdi-inbox-arrow-down', title: '상품 목록', name: 'SellerProductListPage'},
  {icon: 'mdi-send', title: '상품 등록', name: 'SellerProductAddPage'},
])
</script>

<style scoped>

</style>
