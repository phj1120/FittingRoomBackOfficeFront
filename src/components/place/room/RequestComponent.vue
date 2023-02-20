<template>
  <v-col cols="12" class="pa-0">
    <v-col cols="3" class="mb-5">
      <v-card color="blue" class="pt-2 pb-2">
        <h1 class="text-white text-center">영업 상태 변경</h1>
      </v-card>
    </v-col>
  </v-col>

  <v-col cols="6">
    <v-card min-height="75vh">
      <v-col cols="4" class="mt-10 margin-center">
        <v-card color="green" class="pt-2 pb-2">
          <h2 class="text-white text-center">상태 변경 신청</h2>
        </v-card>
      </v-col>
      <v-row class="mt-15">
        <v-col cols="7" class="pa-0 ml-10">
          <v-col cols="6" class="pa-0">
            <v-select v-model="request.itemValue" :items="request.item" class="ma-2 rounded" label="요청항목" variant="plain"></v-select>
          </v-col>
        </v-col>
        <v-col cols="4" class="pa-0 mt-5 pr-5">
            <VueDatePicker v-model="request.startDt" format="yyyy-MM-dd" auto-apply/>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-textarea class="ml-9 mr-9" v-model="request.reason" rows="14" label="사유" variant="outlined"></v-textarea>
      <v-row>
        <v-col cols="10"></v-col>
        <v-col cols="2" class="pr-6">
          <v-btn class="w-75" color="success" @click="insertRequest">신청</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-col>

  <v-col cols="6">
    <v-card min-height="75vh">
      <v-col cols="4" class="mt-10 margin-center">
        <v-card color="green" class="pt-2 pb-2">
          <h2 class="text-white text-center">상태 변경 수정</h2>
        </v-card>
      </v-col>
      <v-table class="mt-15 ml-3 mr-3">
        <thead>
          <tr class="bg-amber-accent-2">
            <th class="text-center">요청항목</th>
            <th class="text-center">요청상태</th>
            <th class="text-center">시행일자</th>
            <th class="text-center">요청일자</th>
            <th class="w-0"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requestList" :key="request.rhCreateDt">
            <td class="text-center">{{ request.rhContent }}</td>
            <td class="text-center">{{ request.rhStatus }}</td>
            <td class="text-center">{{ request.rhStartDt }}</td>
            <td class="text-center">{{ request.rhCreateDt }}</td>
            <td>
              <v-btn color="success" @click="handleClickDialogs( request.rhNo )">수정</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-col>
  <v-col class="pa-0" :key="dialog">
    <DialogsComponent :dialog="dialog">
      <template v-slot:dialogContent>
        <v-row class="mt-3 ml-1 mr-1">
          <v-col cols="6">
            <v-select v-model="modifyRequest.rhContent" class="rounded" label="요청항목" variant="plain" readonly></v-select>
          </v-col>
          <v-col cols="6" class="pr-1 pl-12">
            <VueDatePicker v-model="modifyRequest.rhStartDt" format="yyyy-MM-dd" position="right" auto-apply/>
          </v-col>
        </v-row>
        <v-textarea class="ml-2 mr-2" v-model="modifyRequest.rhReason" rows="14" label="사유" variant="outlined"></v-textarea>
      </template>
      <template v-slot:dialogBtn>
        <v-btn class="mr-2" color="primary" @click="handleClickModify">완료</v-btn>
        <v-btn class="ml-2" color="error" @click="handleClickCancle">취소</v-btn>
      </template>
    </DialogsComponent>
  </v-col>
</template>

<script setup>
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  import {onMounted, ref} from "vue";
  import {getRoomRequest, insertRoomRequest, updateRoomRequest} from "@/apis/place/roomApis";
  import DialogsComponent from "@/components/common/DialogsComponent.vue";


  const emits = defineEmits(['handleChangeRefrehKey'])
  const request = ref({startDt: null, reason: null, item: ['영업', '휴업', '탈퇴'], itemValue: null})
  const requestList = ref([])
  const modifyRequest = ref()
  const dialog = ref(false)


  const handleClickDialogs = ( rhNo ) => {
    modifyRequest.value = requestList.value.filter(item => item.rhNo == rhNo)[0]
    dialog.value = !dialog.value
  }

  const handleClickCancle = async () => {
    dialog.value = !dialog.value
    emits('handleChangeRefrehKey')
  }

  const handleClickModify = async () => {
    dialog.value = !dialog.value

    await updateRoomRequest(modifyRequest.value)

    emits('handleChangeRefrehKey')
  }

  const insertRequest = () => {
    insertRoomRequest( request.value )
    emits('handleChangeRefrehKey')
  }

  const getRequest = async () => {
    const data = await getRoomRequest()
    requestList.value = data
  }


  onMounted(() => {
    getRequest()
  })
</script>

<style scoped>
  .margin-center {
    margin: 0 auto;
  }
</style>
