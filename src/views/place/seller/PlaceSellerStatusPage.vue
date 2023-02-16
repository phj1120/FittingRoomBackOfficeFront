<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <ListComponent></ListComponent>
    </PlaceContentLayout>
  </PlaceLayout>
</template>

<script setup>
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import {ref} from "vue";
  import ListComponent from "@/components/place/seller/StatusComponent.vue";


  const links = ref([
    { icon: 'mdi-send', title: '판매자 요청 현황', name: 'PlaceSellerStatusPage' },
    { icon: 'mdi-inbox-arrow-down', title: '판매자 요청 기록', name: 'PlaceSellerHistoryPage' },
  ])
</script>

<style scoped>

</style>
