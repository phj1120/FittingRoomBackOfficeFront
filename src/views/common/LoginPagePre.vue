<template>
  <v-row>
    <v-col cols="12">
      <div class="loginWrap">
        <v-card class="loginForm">
          <LoginComponent />
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
  import LoginComponent from "@/components/common/LoginComponent.vue";
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
