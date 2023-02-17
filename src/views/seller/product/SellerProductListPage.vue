<template>
  <p>pageSearch: {{ pageSearch }}</p>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <v-row>
        <SearchComponent :pageSearch="pageSearch" @handleProductSearch="handleProductSearch"></SearchComponent>
      </v-row>
      <v-row>
        <ListComponent :key="componentKey" :pageSearch="pageSearch"
                       @handleChangePage="handleChangePage"
                       @handelDetailPage="handelDetailPage"></ListComponent>
      </v-row>
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

const handelDetailPage = (prNo) => {
  console.log('handleDetailPage')
  console.log(prNo)
  router.push({name: 'SellerProductDetailPage', params: {prNo: prNo}, query: pageSearch.value})
};

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

const convertLocalDate = ((localDateTime) => {
  const localDate = localDateTime.getFullYear() +
    "-" + ((localDateTime.getMonth() + 1) > 9 ? (localDateTime.getMonth() + 1).toString() : "0" + (localDateTime.getMonth() + 1)) +
    "-" + (localDateTime.getDate() > 9 ? localDateTime.getDate().toString() : "0" + localDateTime.getDate().toString())

  return localDate
})


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
