<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <v-col cols="12" class="pa-0" :key="refrashKey">
        <ListComponent :listInfo="listInfo" @handleRouterList="handleRouterList" @handleRouterSearchList="handleRouterSearchList" @handleRouterStatus="handleRouterStatus"></ListComponent>
      </v-col>
    </PlaceContentLayout>
  </PlaceLayout>
</template>

<script setup>
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import {ref} from "vue";
  import ListComponent from "@/components/place/seller/ListComponent.vue";
  import {useRoute, useRouter} from "vue-router";


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
    keyword: route.query.keyword,
    status: route.query.status,
  })


  const handleRouterList = ( pageInfo ) => {
    listInfo.value.page = pageInfo.page
    listInfo.value.size = pageInfo.size
    router.push({ name: 'PlaceSellerListPage', query: listInfo.value})
  }

  const handleRouterSearchList = ( searchInfo ) => {
    listInfo.value.page = 1
    listInfo.value.type = searchInfo.type
    listInfo.value.keyword = searchInfo.keyword
    router.push({ name: 'PlaceSellerListPage', query: listInfo.value})
  }

  const handleRouterStatus = ( status ) => {
    listInfo.value.page = 1
    listInfo.value.status = status
    router.push({ name: 'PlaceSellerListPage', query: listInfo.value})
  }


  router.beforeEach(( to, from, next ) => {
    listInfo.value.page = to.query.page
    listInfo.value.size = to.query.size
    listInfo.value.type = to.query.type
    listInfo.value.keyword = to.query.keyword
    listInfo.value.status = to.query.status

    refrashKey.value++
    next()
  })
</script>

<style scoped>

</style>
