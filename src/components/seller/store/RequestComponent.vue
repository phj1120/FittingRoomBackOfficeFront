<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <v-card class="pa-5">
        <v-col cols="4" class="pa-0 pb-10">
          <v-card color="blue" class="pt-2 pb-2">
            <h1 class="text-white text-center">영업 상태 변경 신청 페이지</h1>
          </v-card>
        </v-col>
        <v-row justify="space-between" >
        <v-col cols="3" >
          <v-select class="pt-10 pb-5" v-model="select" :items="items"></v-select>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="3">
          <v-row class="mt-14 mr-0 pa-2 border">
            DATE : <Datepicker class="ml-2" v-model="picked" :locale = "locale" :inputFormat="inputFormat" />
          </v-row>
      </v-col>
        </v-row>
          <v-textarea v-model="text" variant="filled" label="Label" auto-grow></v-textarea>
          <v-btn color="success" variant="flat" @click="insertRequestHistory">저장</v-btn>
      </v-card>
    </v-card>
  </v-col>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import Datepicker from 'vue3-datepicker';
import {ko} from "date-fns/locale";
import {insertRequestHistorySeller} from "@/apis/seller/storeApis";
const picked = ref(new Date())
const locale = reactive(ko)
const inputFormat = ref('yyyy-MM-dd')
const requestHistoryData = ref({'rhContent': null, 'rhReason':null, 'rhStartDt':null})
const select = ref()
const text = ref()
const items = ['영업','휴업','탈퇴']


const insertRequestHistory = async ()=>{
  requestHistoryData.value.rhContent = select.value
  requestHistoryData.value.rhReason = text.value

  const res = await insertRequestHistorySeller(requestHistoryData.value)
}


watch(picked,()=>{
  const sum = picked.value.getFullYear() +
  "-" + ((picked.value.getMonth() + 1) > 9 ? (picked.value.getMonth() + 1).toString() : "0" + (picked.value.getMonth() + 1)) +
  "-" + (picked.value.getDate() > 9 ? picked.value.getDate().toString() : "0" + picked.value.getDate().toString());
  requestHistoryData.value.rhStartDt = sum
})
</script>

<style scoped>




</style>
