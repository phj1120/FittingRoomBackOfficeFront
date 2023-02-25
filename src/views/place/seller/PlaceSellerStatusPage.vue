<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <v-col cols="12" class="pa-0" :key="refrashKey">
        <StatusComponent :listInfo="listInfo" @handleRouterList="handleRouterList" @handleRoute="handleRoute"></StatusComponent>
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
  import StatusComponent from "@/components/place/seller/StatusComponent.vue";


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
  })


  const handleRouterList = ( pageInfo ) => {
    listInfo.value.page = pageInfo.page
    listInfo.value.size = pageInfo.size
    router.push({ name: 'PlaceSellerStatusPage', query: listInfo.value})
  }

  const handleRoute = () => {
    router.push({ name: 'PlaceSellerListPage' })
  }


  router.beforeEach(( to, from, next ) => {
    listInfo.value.page = to.query.page
    listInfo.value.size = to.query.size

    refrashKey.value++
    next()
  })
</script>

<style scoped>

</style>
