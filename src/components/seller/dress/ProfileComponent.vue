<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <v-container>
        <v-row>
          <v-col >
           <h2>프로필</h2>
          <v-text-field :readonly="!modifyTf" label="매장명" v-model="profileData.seName"></v-text-field>
            <v-text-field :readonly="!modifyTf" label="대표직원명" v-model="profileData.seManager"></v-text-field>
            <v-text-field readonly label="아이디" v-model="profileData.seId"></v-text-field>
            <v-text-field :readonly="!modifyTf" label="비밀번호" v-model="profileData.sePassword"></v-text-field>
            <v-text-field :readonly="!modifyTf" label="이메일" v-model="profileData.seEmail"></v-text-field>
            <v-text-field :readonly="!modifyTf" label="매장번호" v-model="profileData.sePhone"></v-text-field>
            <v-text-field :readonly="!modifyTf" label="주소" v-model="profileData.seAddress"></v-text-field>
            <v-text-field readonly label="상태" v-model="profileData.seStatus"></v-text-field>
            <v-text-field readonly label="입점장소명" v-model="profileData.roName"></v-text-field>

          </v-col>
        </v-row>
        <v-row justify="center">

          <v-btn color="success" v-if="!modifyTf" @click="modifyProfile">수정 </v-btn>
          <v-btn class="pa-2 ma-2" color="success" v-if="modifyTf" @click="modifySellerProfile">저장</v-btn>
          <v-btn class="pa-2 ma-2" color="error" v-if="modifyTf" @click="modifyProfile">취소</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getProfileSeller, modifyProfileSeller} from "@/apis/seller/sellerApis";

const profileData = ref({})
const modifyTf = ref(false)
const getProfile = async () =>{
  const data = await getProfileSeller()
  profileData.value= data.data

}

const modifySellerProfile = async() =>{
  const data = await modifyProfileSeller(profileData.value)
  await getProfile()
  modifyProfile()

}
const modifyProfile = ()=>{
  modifyTf.value = !modifyTf.value
}

onMounted(()=>{
 getProfile()

})
</script>

<style scoped>

</style>
