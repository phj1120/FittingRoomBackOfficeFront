<template>
  <BasicLayout>
    <SideLayout :links="links"></SideLayout>
    <ContentLayout>
      <HomeComponent></HomeComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
  import {ref} from "vue";
  import SideLayout from "@/layouts/seller/SellerSideLayout.vue";
  import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import BasicLayout from "@/layouts/seller/SellerLayout.vue";
  import HomeComponent from "@/components/HomeComponent.vue";


  const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: 'Inbox', name: '' },
    { icon: 'mdi-send', title: 'Send', name: '' },
    { icon: 'mdi-delete', title: 'Trash', name: '' },
    { icon: 'mdi-alert-octagon', title: 'Spam', name: '' },
  ])
</script>
