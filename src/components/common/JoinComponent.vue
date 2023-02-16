<template>
  <v-form class="form-login">
    <v-text-field
      v-model="insertSellerData.seName"
      label="회사명"
    ></v-text-field>

    <v-text-field
      v-model="insertSellerData.seManager"
      label="대표직원이름"
    ></v-text-field>
    <v-text-field
      v-model="insertSellerData.seId"
      label="아이디"
    ></v-text-field>
    <v-text-field
      v-model="insertSellerData.sePassword"
      label="비밀번호"
    ></v-text-field>
    <v-text-field
      v-model="insertSellerData.seEmail"
      label="이메일 주소"
    ></v-text-field>
    <v-text-field
      v-model="insertSellerData.sePhone"
      label="전화번호"
    ></v-text-field>
    <v-text-field
      v-model="insertSellerData.seAddress"
      label="회사 주소"
    ></v-text-field>
    <v-text-field
      v-model="insertSellerData.pmNo"
      label="장소제공자번호"
    ></v-text-field>
    <UploadComponent @addFile="addFile" @clickRemoveBtn="clickRemoveBtn"></UploadComponent>

      <v-radio-group v-model="insertSellerData.fixFile">
        <v-row class="justify-center">
          <div class="ma-6" v-for="(preview,i) in previews" :key="i">
            <v-img class="ma-2" :src="preview.url" contain height="15vh" width="15vw"/>
            <v-row>
              <v-radio :label="preview.name" :value="i"></v-radio>
              <v-btn @click="clickRemoveBtn()">삭제</v-btn>
            </v-row>
          </div>
        </v-row>
      </v-radio-group>

    <v-btn class="mt-2" @click="insertSellerBtn">저장</v-btn>
  </v-form>

</template>

<script setup>
import {ref, watch} from "vue";
import UploadComponent from "@/components/common/UploadComponent.vue";
import {insertSeller} from "@/apis/place/SellerApis";
import {insertRequestHistorySeller} from "@/apis/seller/StoreApis";

const insertSellerData = ref({seName: null, seManager: null, seId: null, sePassword: null
,seEmail: null,sePhone: null, seAddress: null,pmNo: null, fixFile: 0 ,image: [] })

const requestHistoryData = ref({rhContent: '가입', pmNo: 0, seNo: 0 })

const emits = defineEmits(['handleLoginPage'])
const insertSellerRequestHistoryData = ref()
const previews = ref([])
const radioIndex = ref(0)
const clickRemoveBtn = () => {
  insertSellerData.value.image.splice(0, 1)

}

const addFile = (files) => {
  for (let i = 0; i < files.length; i++) {
    insertSellerData.value.image.push(files[i])
  }
}

const insertSellerBtn = async () =>{
  requestHistoryData.value.pmNo = insertSellerData.value.pmNo

  const res = await insertSeller(insertSellerData.value)
  console.log(res)
  requestHistoryData.value.seNo = res.data
  await insertRequestHistorySeller(requestHistoryData.value)
  emits('handleLoginPage')
}
watch(insertSellerData.value.image, async () => {
  console.log(insertSellerData.value)
  previews.value = []
  insertSellerData.value.image.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        previews.value.push({name: file.name, url: reader.result})
      }
    }
  )
})
</script>

<style scoped>
.form-login {
  padding-top: 5%;
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
  width: 100%;
}

.btn-register {
  position: absolute;
  left: 10%;
  top: 80%;
  width: 80%;
}
</style>
