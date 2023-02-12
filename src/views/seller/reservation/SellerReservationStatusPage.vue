<template>
  <SellerLayout>
    <SellerSideLayout :links="links"></SellerSideLayout>
    <SellerContentLayout>
      <StatusComponent></StatusComponent>
    </SellerContentLayout>
  </SellerLayout>
</template>

<script setup>
  import SellerSideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import SellerLayout from "@/layouts/seller/SellerLayout.vue";
  import SellerContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import {ref} from "vue";
  import StatusComponent from "@/components/seller/reservation/StatusComponent.vue";


const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '예약 현황', name: 'SellerReservationStatusPage' },
    { icon: 'mdi-send', title: '예약 기록', name: 'SellerReservationHistoryPage' },
  ])
</script>

<style scoped>

</style>
