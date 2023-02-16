<template>

    <v-card color="grey-darken-2" min-height="85vh">
      <h1>영업 상태 변경 </h1>
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
          <v-col cols="10"  >
            <v-textarea
              v-model="text"
              variant="filled"
              label="Label"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
        <v-btn color="primary" block @click="emits('handleClickDialog')">Close</v-btn>

      </v-container>
    </v-card>




</template>

<script setup>

import {onMounted, reactive, ref, watch} from "vue";

const emits = defineEmits(['handleClickDialog'])
import Datepicker from 'vue3-datepicker';
import {ko} from "date-fns/locale";
const picked = ref(new Date())
const locale = reactive(ko)
const inputFormat = ref('yyyy-MM-dd')
const requestHistoryData = ref({'rhContent': null, 'rhReason':null, 'rhStartDt':null})
const select = ref()
const text = ref()
const items = ['가입','휴업','탈퇴']

watch(picked,()=>{
  const sum = picked.value.getFullYear() +
    "-" + ((picked.value.getMonth() + 1) > 9 ? (picked.value.getMonth() + 1).toString() : "0" + (picked.value.getMonth() + 1)) +
    "-" + (picked.value.getDate() > 9 ? picked.value.getDate().toString() : "0" + picked.value.getDate().toString());
  requestHistoryData.value.rhStartDt = sum
})
onMounted(() => {

})
</script>

<style scoped>

</style>
