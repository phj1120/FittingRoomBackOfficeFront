<template>
  <PlaceLayout>
    <PlaceSideLayout :links="links"></PlaceSideLayout>
    <PlaceContentLayout>
      <ProfileComponent></ProfileComponent>
    </PlaceContentLayout>
  </PlaceLayout>
</template>

<script setup>
  import {ref} from "vue";
  import PlaceLayout from "@/layouts/place/PlaceLayout.vue";
  import PlaceSideLayout from "@/layouts/place/PlaceSideLayout.vue";
  import PlaceContentLayout from "@/layouts/place/PlaceContentLayout.vue";
  import ProfileComponent from "@/components/place/dress/ProfileComponent.vue";


  const links = ref([
      { icon: 'mdi-inbox-arrow-down', title: '프로필 보기/수정', name: 'PlaceDressProfilePage' },
      { icon: 'mdi-send', title: '입어볼래 Q&A', name: 'PlaceDressRequestPage' },
    ])
</script>

<style scoped>

</style>
