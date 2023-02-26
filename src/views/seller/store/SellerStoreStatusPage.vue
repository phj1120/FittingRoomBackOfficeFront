<template>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <v-col cols="12" :key="refrashKey">
      <StatusComponent :listInfo="listInfo" @handleRouterList="handleRouterList" @refreshList="refreshList"></StatusComponent>
      </v-col>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
  import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import BasicLayout from "@/layouts/seller/SellerLayout.vue";
  import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import {ref} from "vue";
  import StatusComponent from "@/components/seller/store/StatusComponent.vue";
  import {useRoute, useRouter} from "vue-router";
  const route = useRoute()
  const router = useRouter()
  const refrashKey = ref(0)

  const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '영업 상태 현황', name: 'SellerStoreStatusPage' },
    { icon: 'mdi-send', title: '영업 상태 변경 신청', name: 'SellerStoreRequestPage' },
  ])

  const listInfo = ref({
    page: route.query.page,
    size: route.query.size
  })

  const handleRouterList = ( pageInfo ) => {
    listInfo.value.page = pageInfo.page
    listInfo.value.size = pageInfo.size
    router.push({ name: 'SellerStoreStatusPage', query: {page: listInfo.value.page, size: listInfo.value.size}})
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
