<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <h1>영업 상태 변경 신청 페이지</h1>
    <v-container>
     <v-row justify="space-between" >
       <v-col cols="3" >
       <v-select
         v-model="select"
       :items="items"></v-select>
       </v-col>
       <Datepicker
         v-model="picked"
         :locale = "locale"
         :inputFormat="inputFormat"
       />
     </v-row>
      <v-row >
        <v-col cols="15"  >
      <v-textarea
        v-model="text"
        variant="filled"
        label="Label"
        auto-grow
      ></v-textarea>
        </v-col>
      </v-row>
        <v-btn variant="outlined" @click="insertRequestHistory">저장</v-btn>

    </v-container>
    </v-card>
  </v-col>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import Datepicker from 'vue3-datepicker';
import {ko} from "date-fns/locale";
import {insertRequestHistorySeller} from "@/apis/seller/StoreApis";
const picked = ref(new Date())
const locale = reactive(ko)
const inputFormat = ref('yyyy-MM-dd')
const requestHistoryData = ref({'rhContent': null, 'rhReason':null, 'rhStartDt':null})
const select = ref()
const text = ref()
const items = ['가입','휴업','탈퇴']
console.log( picked.value)


const insertRequestHistory = async ()=>{
  requestHistoryData.value.rhContent = select.value
  requestHistoryData.value.rhReason = text.value

  const res = await insertRequestHistorySeller(requestHistoryData.value)
  console.log(res)
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
