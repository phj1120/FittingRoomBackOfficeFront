<template>
  <p>pageSearch: {{ pageSearch }}</p>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <v-card class="justify-center ma-auto bg-grey-lighten-2 mb-7">
        <SearchComponent :pageSearch="pageSearch"
                         @handleProductSearch="handleProductSearch"></SearchComponent>
        <ListComponent :key="componentKey" :pageSearch="pageSearch"
                       @handleUpdatePage="handleUpdatePage"
                       @handleChangePage="handleChangePage"
                       @handelDetailPage="handleDetailPage"
                       @handleUpdateOptionPage="handleUpdateOptionPage"
        ></ListComponent>
      </v-card>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import {ref} from "vue";
import ListComponent from "@/components/seller/product/ListComponent.vue";
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
import SearchComponent from "@/components/seller/product/SearchComponent.vue";
import {useRoute, useRouter} from "vue-router";
import {convertLocalDate} from "@/utils/productUtil";

const links = ref([
  {icon: 'mdi-inbox-arrow-down', title: '상품 목록', name: 'SellerProductListPage'},
  {icon: 'mdi-send', title: '상품 등록', name: 'SellerProductAddPage'},
])

const route = useRoute();
const router = useRouter();

const componentKey = ref(0)

const pageSearch = ref({
  seNo: route.query.seNo,
  page: route.query.page, size: route.query.size,
  startDt: route.query.startDt,
  endDt: route.query.endDt,
  types: typeof route.query.types === 'string' ? [route.query.types] : route.query.types,
  keyword: route.query.keyword
})

const handleChangePage = (pageInfo) => {
  pageSearch.value.page = pageInfo.value.page

  router.push({name: 'SellerProductListPage', query: pageSearch.value})
}

const handleDetailPage = (prNo) => {
  console.log('handleDetailPage')
  console.log(prNo)

  router.push({name: 'SellerProductDetailPage', params: {prNo: prNo}, query: pageSearch.value})
};

const handleUpdatePage = (prNo) => {
  router.push({name: 'SellerProductUpdatePage', params: {prNo}, query: pageSearch.value})
}

const handleUpdateOptionPage = (prNo) => {
  router.push({name: 'SellerProductOptionAddPage', params: {prNo}, query: pageSearch.value})
}

const handleProductSearch = (search) => {
  pageSearch.value.keyword = search.value.keyword
  pageSearch.value.types = search.value.types

  if (!isNaN(search.value.startDt) && !isNaN(search.value.endDt)) {
    pageSearch.value.startDt = convertLocalDate(search.value.startDt)
    pageSearch.value.endDt = convertLocalDate(search.value.endDt)
  }
  pageSearch.value.page = 1

  // 페이지 이동
  router.push({name: 'SellerProductListPage', query: pageSearch.value})
}

router.beforeEach((to, from, next) => {
  pageSearch.value.seNo = to.query.seNo
  pageSearch.value.page = to.query.page
  pageSearch.value.size = to.query.size
  pageSearch.value.types = to.query.types
  pageSearch.value.keyword = to.query.keyword

  // 컴포넌트 갱신
  componentKey.value++

  next()
})

</script>

<style scoped>

</style>
