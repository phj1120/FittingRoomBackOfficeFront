<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <RequestComponent :key="refrehKey" @handleChangeRefrehKey="handleChangeRefrehKey"></RequestComponent>
    </PlaceContentLayout>
  </PlaceLayout>
</template>

<script setup>
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import {ref} from "vue";
  import RequestComponent from "@/components/place/room/RequestComponent.vue";


  const refrehKey = ref(0)
  const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '영업 상태 현황', name: 'PlaceRoomStatusPage' },
    { icon: 'mdi-send', title: '영업 상태 변경 신청', name: 'PlaceRoomRequestPage' },
    ])


  const handleChangeRefrehKey = () => {
    refrehKey.value++
  }
</script>

<style scoped>

</style>
