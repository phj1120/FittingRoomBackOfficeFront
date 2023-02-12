<template>
  <BasicLayout>
    <ContentLayout>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
import {ref} from "vue";


const links = ref([
    { icon: 'mdi-inbox-arrow-down', title: '', name: '' },
    { icon: 'mdi-send', title: '', name: '' },
    { icon: 'mdi-delete', title: '', name: '' },
    { icon: 'mdi-alert-octagon', title: '', name: '' },
    { icon: 'mdi-alert-octagon', title: '', name: '' },
  ])
</script>

<style scoped>

</style>
