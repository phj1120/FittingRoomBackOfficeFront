<template>
  <SellerLayout>
    <SellerSideLayout :links="links"></SellerSideLayout>
    <SellerContentLayout>
      <HistoryComponent></HistoryComponent>
    </SellerContentLayout>
  </SellerLayout>
</template>

<script setup>
  import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import BasicLayout from "@/layouts/seller/SellerLayout.vue";
  import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import {ref} from "vue";
  import HistoryComponent from "@/components/seller/reservation/HistoryComponent.vue";
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import SellerLayout from "@/layouts/seller/SellerLayout.vue";
  import SellerSideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import SellerContentLayout from "@/layouts/seller/SellerContentLayout.vue";


  const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '예약 현황', name: 'SellerReservationStatusPage' },
    { icon: 'mdi-send', title: '예약 기록', name: 'SellerReservationHistoryPage' },
  ])
</script>

<style scoped>

</style>
