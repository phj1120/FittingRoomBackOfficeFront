<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <v-col cols="12" class="pa-0" :key="refrashKey">
        <StatusComponent :listInfo="listInfo" @handleRouterList="handleRouterList"></StatusComponent>
      </v-col>
    </PlaceContentLayout>
  </PlaceLayout>
</template>

<script setup>
  import {ref} from "vue";
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import StatusComponent from "@/components/place/room/StatusComponent.vue";
  import {useRoute, useRouter} from "vue-router";


  const route = useRoute()
  const router = useRouter()
  const refrashKey = ref(0)
  const links = ref([
        { icon: 'mdi-inbox-arrow-down', title: '영업 상태 현황', name: 'PlaceRoomStatusPage' },
        { icon: 'mdi-send', title: '영업 상태 변경 신청', name: 'PlaceRoomRequestPage' },
      ])
  const listInfo = ref({
    page: route.query.page,
    size: route.query.size,
  })


  const handleRouterList = ( pageInfo ) => {
    listInfo.value.page = pageInfo.page
    listInfo.value.size = pageInfo.size
    router.push({ name: 'PlaceRoomStatusPage', query: {page: listInfo.value.page, size: listInfo.value.size}})
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
