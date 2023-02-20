<template>
  <v-card class="pt-10 margin-center" width="50vw" min-height="70vh">
    <v-form>
      <v-img class="mt-8 mb-15 margin-center" width="10vw" src="https://vo.la/AcATy"></v-img>
      <v-table class="ma-10 border">
        <tbody>
          <tr>
            <th class="text-center">상호명</th>
            <td><v-text-field class="pt-5" v-model="insertSellerData.seName" variant="outlined"></v-text-field></td>
            <th class="text-center">담당자</th>
            <td><v-text-field class="pt-5" v-model="insertSellerData.seManager" variant="outlined"></v-text-field></td>
          </tr>
          <tr>
            <th class="text-center">아이디</th>
            <td colspan="3"><v-text-field class="pt-5" v-model="insertSellerData.seId" variant="outlined"></v-text-field></td>
          </tr>
          <tr>
            <th class="text-center">비밀번호</th>
            <td colspan="3"><v-text-field class="pt-5" v-model="insertSellerData.sePassword" variant="outlined"></v-text-field></td>
          </tr>
          <tr>
            <th class="text-center">이메일</th>
            <td><v-text-field class="pt-5" v-model="insertSellerData.seEmail" variant="outlined"></v-text-field></td>
            <th class="text-center">연락처</th>
            <td><v-text-field class="pt-5" v-model="insertSellerData.sePhone" variant="outlined"></v-text-field></td>
          </tr>
          <tr>
            <th class="text-center">주소</th>
            <td colspan="3"><v-text-field class="pt-5" v-model="insertSellerData.seAddress" variant="outlined"></v-text-field></td>
          </tr>
          <tr>
            <th class="text-center">입점장소</th>
            <td colspan="3"><v-text-field class="pt-5" v-model="insertSellerData.pmNo" variant="outlined"></v-text-field></td>
          </tr>
          <tr>
            <th class="text-center">첨부파일</th>
            <td colspan="3" class="pt-4"><UploadComponent @addFile="addFile" @clickRemoveBtn="clickRemoveBtn"></UploadComponent></td>
          </tr>
        </tbody>
      </v-table>

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
      <v-btn class="float-right mr-10 mb-10" color="success" @click="insertSellerBtn">가입신청</v-btn>
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
  .margin-center {
    margin: 0 auto;
  }
</style>
