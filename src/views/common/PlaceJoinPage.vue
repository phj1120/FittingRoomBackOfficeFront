<template>
  <CommonLayout>
    <CommonContentLayout>
      <PlaceJoinComponent @handleLoginPage="handleLoginPage"></PlaceJoinComponent>
    </CommonContentLayout>
  </CommonLayout>
</template>

<script setup>
  import {useRouter} from "vue-router";
  import PlaceJoinComponent from "@/components/common/PlaceJoinComponent.vue";
  import CommonLayout from "@/layouts/common/CommonLayout.vue";
  import CommonContentLayout from "@/layouts/common/CommonContentLayout.vue";


  const router = useRouter()


  const handleLoginPage = () =>{
    router.push({name : 'LoginPage'})
  }
</script>

<style scoped>

</style>
