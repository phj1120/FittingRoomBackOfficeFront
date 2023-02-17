<template>

<!--  <v-row>
    <v-col cols="12">
      <div class="loginWrap">
        <v-card class="loginForm">
          <LoginComponent />
        </v-card>
      </div>
    </v-col>
  </v-row>-->

  <BasicLayout>
    <ContentLayout>
      <LoginComponent @handleSellerJoinPage="handleSellerJoinPage" @handlePlaceAdminJoinPage="handlePlaceAdminJoinPage"></LoginComponent>
    </ContentLayout>
  </BasicLayout>
</template>

<script setup>
import BasicLayout from "@/layouts/seller/SellerLayout.vue";
import ContentLayout from "@/layouts/seller/SellerContentLayout.vue";
  import LoginComponent from "@/components/common/LoginComponent.vue";
  import {useRoute, useRouter} from "vue-router";

  const router = useRouter()
  const handleSellerJoinPage = () =>{
    router.push({name : 'SellerJoinPage'})
  }
const handlePlaceAdminJoinPage = () =>{
  router.push({name : 'PlaceAdminJoinPage'})
}
</script>

<style scoped>
  .loginWrap {
    width: 100%;
    height: 100%;
  }
  .loginForm {
    position: absolute;
    top: 15%;
    left: 40%;
    /*vertical-align: middle;*/
    /*margin: 0 auto;*/
    width: 35em;
    height: 40em;
  }
</style>
