<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <div>
        <v-card class="ma-10 pa-10 font-weight-bold text-h4">우리 매장 {{ storeStatus.seName }}은 <h2 style="display: inline; color: red">
          {{ storeStatus.seStatus }}</h2> 상태입니다!</v-card>
        <v-card class="ma-10">
          <v-table class="ma-4">
            <thead>
            <tr class="bg-amber-accent-2">
              <th class="text-center font-weight-bold">요청번호</th>
              <th class="text-center font-weight-bold">종류</th>
              <th class="text-center font-weight-bold">사유</th>
              <th class="text-center font-weight-bold">상태</th>
              <th class="text-center font-weight-bold">등록일</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="list in historyList" :key="list.rhNo">
              <td class="text-center">{{ list.rhNo }}</td>
              <td class="text-center">{{ list.rhContent }}</td>
              <td class="text-center">
                <v-btn color="success" @click="handleClickDialog(list)">사유보기</v-btn>
              </td>
              <td class="text-center">{{ list.rhStatus }}</td>
              <td class="text-center">{{ list.rhStartDt }}</td>
            </tr>
            </tbody>
          </v-table>
          <v-pagination v-model="pageInfo.page" :show-first-last-page="true"
                        :total-visible="pageInfo.size" :length="pageInfo.last" :start="pageInfo.start"
                        @click="handleClickPage(pageInfo)">
          </v-pagination>
        </v-card>
      </div>
    </v-card>
  </v-col>
  <v-dialog class="justify-center" v-model="dialog.tf">
    <DialogComponent @handleClickDialog = "handleClickDialog" :list = "dialog.list" ></DialogComponent>
  </v-dialog>
</template>

<script setup>
import {onMounted, ref} from "vue";

import {getStoreStatus, getStoreStatusList} from "@/apis/seller/storeApis";
import DialogComponent from "@/components/seller/store/DialogComponent.vue";


const props = defineProps(['listInfo'])
const emits = defineEmits(['handleRouterList'])
const pageInfo = ref([{ page: null, size: null, last: null, start: 1 }])
const storeStatus = ref({})
const historyList = ref([])
const dialog = ref({tf : false , list : null})

const handleClickPage = ( pageInfo ) => {
  emits('handleRouterList', pageInfo)
}
const handleClickDialog = (list) => {
  console.log(list)
  dialog.value.list = list
  dialog.value.tf = !dialog.value.tf
}
const getSellerStatus = async () => {
  const data = await getStoreStatus(props.listInfo.id )
  storeStatus.value = data.data
}

const getSellerStatusHistory = async () => {
  const data = await getStoreStatusList( props.listInfo )
  historyList.value = data.dtoList
  pageInfo.value.page = data.page
  pageInfo.value.size = data.size
  pageInfo.value.last = data.last
}


onMounted(() => {
  getSellerStatus()
  getSellerStatusHistory()
})
</script>

<style scoped>

</style>
