<template>
  <v-container class="mb-15 pa-0 bg-blue w-66">
    <v-col cols="12" class="pa-0">
      <v-row class="ma-0">
        <v-col cols="3" class="ml-10 pa-0">
          <v-col cols="10" class="ma-2 pl-0 pr-0 pb-0">
            <v-select v-model="searchType.value" :items="searchType.item" class="ma-2 rounded" label="요청타입" variant="outlined"></v-select>
            <v-select v-model="searchStatus.value" :items="searchStatus.item" class="ma-2 rounded" label="요청상태" variant="outlined"></v-select>
          </v-col>
        </v-col>
        <v-col cols="8" class="mt-14">
          <v-row class="ml-5">
            <div class="mr-5">
              <h4>시작일</h4>
              <VueDatePicker v-model="searchDate.toDate" format="yyyy-MM-dd" auto-apply/>
            </div>
            <div class="ml-5">
              <h4>종료일</h4>
              <VueDatePicker v-model="searchDate.fromDate" format="yyyy-MM-dd" auto-apply/>
            </div>
            <v-btn class="mt-6 ml-5" color="success" variant="flat" @click="emits('handleClickSearch', searchType.value, searchStatus.value, searchDate.toDate, searchDate.fromDate)">검색</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  import {ref} from "vue";


  const props = defineProps(['listInfo'])
  const emits = defineEmits(['handleClickSearch'])
  const searchDate = ref({toDate: props.listInfo.toDate, fromDate: props.listInfo.fromDate || new Date()})
  const searchType = ref({item: ['전체', '가입', '영업', '휴업'], value: props.listInfo.type})
  const searchStatus = ref({item: ['대기', '승인', '거부'], value: props.listInfo.status})
</script>

<style scoped>

</style>
