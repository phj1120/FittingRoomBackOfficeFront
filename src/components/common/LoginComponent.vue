<template>
  <v-container>
    <v-row justify="center">
  <v-form class="form-login" ref="form" v-model="valid" lazy-validation>
    <v-img class="logo" src="https://gw.plateer.com/fileroot/0/files/upload_newPortal/uploadFile/%7Bce214677-57b3-41f1-adbe-ded459ae3cb4%7D.png"></v-img>
    <v-text-field class="input-id" v-model="userInfo.memberId" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
    <v-text-field class="input-password" v-model="userInfo.password" label="Password" required></v-text-field>
    <v-btn color="success" class="me-0 btn-login" @click="handleClickLogin">Login</v-btn>
  </v-form>
    </v-row>
  <v-row justify="center">
    <v-col cols="2">
    <v-btn color="primary" class="btn-register" @click="emits('handleSellerJoinPage')">판매자 회원가입</v-btn>
    </v-col>
    <v-col cols="2">
    <v-btn color="primary" class="btn-register"  @click="emits('handlePlaceAdminJoinPage')">장소제공자 회원가입</v-btn>
    </v-col>
  </v-row>
  </v-container>
</template>

<script setup>
  import {ref} from "vue";
  import axios from "axios";

  const userInfo = ref( { memberId: '', password: '' } )

  const emits = defineEmits(['handleSellerJoinPage','handlePlaceAdminJoinPage'])

  const handleClickLogin = async () => { await axios.post(`http://localhost:8080/auth/api/login`, userInfo.value) }
</script>

<style scoped>
  .form-login {
    padding-top: 15%;
    margin: 0 auto;
    width: 80%;
  }

  .logo {
    margin: 0 auto;
    width: 15em;
  }

  .input-id, .input-password {
    margin: 0 auto;
    width: 100%;
  }

  .input-id {
    padding-top: 5em;
  }

  .btn-login {
    float: right;
  }

  .form-register {
    width: 120%;
  }


</style>
