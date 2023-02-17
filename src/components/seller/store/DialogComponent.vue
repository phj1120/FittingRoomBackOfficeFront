<template>
  <v-col cols="4">
    <v-card color="grey-darken-2" >
      <v-container>
        <v-row justify="space-between" >
          <v-col cols="3" >
            <v-select
              v-model="select"
              :items="items"></v-select>
          </v-col>
          <v-col cols="3" >
          <Datepicker
            v-model="picked"
            :locale = "locale"
            :inputFormat="inputFormat"
          />
          </v-col>
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
        <v-row justify="center">
          <v-col cols="2">
            <v-btn color="primary" block @click="emits('handleClickDialog')">수정하기</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn color="error" block @click="emits('handleClickDialog')">닫기</v-btn>

          </v-col>



        </v-row>

      </v-container>

    </v-card>
  </v-col>



</template>

<script setup>

import {onMounted, reactive, ref, watch} from "vue";

import Datepicker from 'vue3-datepicker';
import {ko} from "date-fns/locale";


const emits = defineEmits(['handleClickDialog'])
const props = defineProps(['list'])
const picked = ref(new Date())
const locale = reactive(ko)
const inputFormat = ref('yyyy-MM-dd')
const requestHistoryData = ref({'rhContent': null, 'rhReason':null, 'rhStartDt':null})
const select = ref(props.list.rhContent)
const text = ref(props.list.rhReason)
const items = ['가입','휴업','탈퇴']

watch(picked,()=>{
  const sum = picked.value.getFullYear() +
    "-" + ((picked.value.getMonth() + 1) > 9 ? (picked.value.getMonth() + 1).toString() : "0" + (picked.value.getMonth() + 1)) +
    "-" + (picked.value.getDate() > 9 ? picked.value.getDate().toString() : "0" + picked.value.getDate().toString());
  requestHistoryData.value.rhStartDt = sum
})

console.log(props.list.rhNo)
onMounted(() => {
const date = new Date(props.list.rhStartDt)
  picked.value = date
})
</script>

<style scoped>

</style>
