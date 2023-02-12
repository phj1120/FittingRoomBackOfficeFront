<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <RequestComponent></RequestComponent>
    </PlaceContentLayout>
  </PlaceLayout>
</template>

<script setup>
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import {ref} from "vue";
  import RequestComponent from "@/components/place/seller/HistoryComponent.vue";


  const links = ref([
    { icon: 'mdi-send', title: '판매자 요청 현황', name: 'PlaceSellerStatusPage' },
    { icon: 'mdi-inbox-arrow-down', title: '판매자 요청 기록', name: 'PlaceSellerHistoryPage' },
  ])
</script>

<style scoped>

</style>
