<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <v-col cols="12" class="pa-0" :key="refrashKey">
        <HistoryComponent :listInfo="listInfo" @handleRouterList="handleRouterList" @handleRouterSearchList="handleRouterSearchList"></HistoryComponent>
      </v-col>
    </PlaceContentLayout>
  </PlaceLayout>
</template>

<script setup>
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import {ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import HistoryComponent from "@/components/place/seller/HistoryComponent.vue";


  const route = useRoute()
  const router = useRouter()
  const refrashKey = ref(0)
  const links = ref([
    { icon: 'mdi-send', title: '판매자 요청 현황', name: 'PlaceSellerStatusPage' },
    { icon: 'mdi-alert-octagon', title: '판매자 입점 목록', name: 'PlaceSellerListPage' },
    { icon: 'mdi-inbox-arrow-down', title: '판매자 요청 기록', name: 'PlaceSellerHistoryPage' },
  ])
  const listInfo = ref({
    page: route.query.page,
    size: route.query.size,
    type: route.query.type,
    status: route.query.status,
    toDate: route.query.toDate,
    fromDate: route.query.fromDate,
  })


  const handleRouterList = ( pageInfo ) => {
    listInfo.value.page = pageInfo.page
    listInfo.value.size = pageInfo.size
    router.push({ name: 'PlaceSellerHistoryPage', query: listInfo.value})
  }

  const handleRouterSearchList = ( searchInfo ) => {
    listInfo.value.page = 1
    listInfo.value.type = searchInfo.type
    listInfo.value.status = searchInfo.status
    listInfo.value.toDate = searchInfo.toDate
    listInfo.value.fromDate = searchInfo.fromDate
    router.push({ name: 'PlaceSellerHistoryPage', query: listInfo.value})
  }


  router.beforeEach(( to, from, next ) => {
    listInfo.value.page = to.query.page
    listInfo.value.size = to.query.size
    listInfo.value.type = to.query.type
    listInfo.value.status = to.query.status
    listInfo.value.toDate = to.query.toDate
    listInfo.value.fromDate = to.query.fromDate

    refrashKey.value++
    next()
  })
</script>

<style scoped>

</style>
