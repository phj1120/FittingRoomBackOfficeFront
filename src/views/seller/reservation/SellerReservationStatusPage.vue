<template>
  <SellerLayout>
    <SellerSideLayout :links="links"></SellerSideLayout>
    <SellerContentLayout>
      <v-col cols="12" class="pa-0" :key="refrashKey">
      <StatusComponent :listInfo="listInfo" @handleRouterList="handleRouterList" @refreshList="refreshList"></StatusComponent>
      </v-col>
    </SellerContentLayout>
  </SellerLayout>
</template>

<script setup>
  import SellerSideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import SellerLayout from "@/layouts/seller/SellerLayout.vue";
  import SellerContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import {ref} from "vue";
  import StatusComponent from "@/components/seller/reservation/StatusComponent.vue";
  import {useRoute, useRouter} from "vue-router";


const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '예약 현황', name: 'SellerReservationStatusPage' },
    { icon: 'mdi-send', title: '예약 기록', name: 'SellerReservationHistoryPage' },
  ])
  const route = useRoute()
  const router = useRouter()
  const refrashKey = ref(0)
  const listInfo = ref({
    page: route.query.page,
    size: route.query.size
  })

  const handleRouterList = ( pageInfo ) => {
    listInfo.value.page = pageInfo.page
    listInfo.value.size = pageInfo.size
    router.push({ name: 'SellerReservationStatusPage', query: {page: listInfo.value.page, size: listInfo.value.size}})
  }

  const refreshList = () =>{
    refrashKey.value++
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
