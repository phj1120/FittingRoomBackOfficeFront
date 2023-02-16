<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <StatusComponent></StatusComponent>
    </PlaceContentLayout>
  </PlaceLayout>
</template>

<script setup>
  import {ref} from "vue";
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import StatusComponent from "@/components/place/room/StatusComponent.vue";


  const links = ref([
        { icon: 'mdi-inbox-arrow-down', title: '영업 상태 현황', name: 'PlaceRoomStatusPage' },
        { icon: 'mdi-send', title: '영업 상태 변경 신청', name: 'PlaceRoomRequestPage' },
      ])
</script>

<style scoped>

</style>
