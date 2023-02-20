<template>
  <v-card class="pa-8" width="60vw">
    <v-form class="form-login">
      <v-table>
        <tbody>
          <tr>
            <th class="text-center">상호명</th>
            <td><v-text-field v-model="insertSellerData.seName" variant="outlined"></v-text-field></td>
            <th class="text-center">담당자</th>
            <v-text-field v-model="insertSellerData.seManager" variant="outlined"></v-text-field>
          </tr>
        </tbody>
      </v-table>

      <v-text-field v-model="insertSellerData.seId" label="아이디"></v-text-field>
      <v-text-field v-model="insertSellerData.sePassword" label="비밀번호"></v-text-field>
      <v-text-field v-model="insertSellerData.seEmail" label="이메일 주소"></v-text-field>
      <v-text-field v-model="insertSellerData.sePhone" label="전화번호"></v-text-field>
      <v-text-field v-model="insertSellerData.seAddress" label="회사 주소"></v-text-field>
      <v-text-field v-model="insertSellerData.pmNo" label="장소제공자번호"></v-text-field>
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
  </v-card>

</template>

<script setup>
  import {ref, watch} from "vue";
  import {insertRequestHistorySeller} from "@/apis/seller/storeApis";
  import {insertSeller} from "@/apis/seller/sellerApis";
  import UploadComponent from "@/components/common/UploadComponent.vue";


  const emits = defineEmits(['handleLoginPage'])
  const insertSellerData = ref({seName: null, seManager: null, seId: null, sePassword: null
  ,seEmail: null,sePhone: null, seAddress: null,pmNo: null, fixFile: 0 ,image: [] })
  const requestHistoryData = ref({rhContent: '가입', pmNo: 0, seNo: 0 })
  const previews = ref([])


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
</style>
