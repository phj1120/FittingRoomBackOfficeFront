<template>
  <v-col cols="12">
    <v-card>
      <v-col cols="2">
        <v-card color="blue" class="pt-2 pb-2">
          <h1 class="text-white text-center">요청 현황</h1>
        </v-card>
      </v-col>
      <v-table class="ma-4">
        <thead>
        <tr class="bg-amber-accent-2">
          <th class="text-center font-weight-bold">종류</th>
          <th class="text-center font-weight-bold">스토어</th>
          <th class="text-center font-weight-bold">담당자</th>
          <th class="text-center font-weight-bold">요청일</th>
          <th class="text-center font-weight-bold w-0"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="seller in sellerList" :key="seller.rhNo">
          <td class="text-center">{{ seller.rhContent }}</td>
          <td class="text-center">{{ seller.seName }}</td>
          <td class="text-center">{{ seller.seManager }}</td>
          <td class="text-center">{{ seller.rhCreateDt }}</td>
          <td class="text-center">
            <v-btn color="success" @click="handleClickDialogs(seller.rhNo)">보기</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
      <v-pagination v-model="pageInfo.page" :show-first-last-page="true"
                    :total-visible="pageInfo.size" :length="pageInfo.last" :start="pageInfo.start"
                    @click="handleClickPage(pageInfo)">
      </v-pagination>
    </v-card>
  </v-col>


  <v-col :key="dialog">
    <DialogsComponent :dialog="dialog">
      <template v-slot:dialogContent :key="signDetail.signYn">
        <HistoryDetailComponent :requestDetail="requestDetail[0]" :signDetail="signDetail" @handleChangeReason="handleChangeReason"></HistoryDetailComponent>
      </template>
      <template v-slot:dialogBtn>
        <!--        <v-btn class="mr-5" color="success" @click="handleClickDialogs">RUN</v-btn>-->
        <v-btn color="success" @click="handleClickOk">승인</v-btn>
        <v-btn class="ml-5" color="error" @click="handleClickSignDetail">거절</v-btn>
      </template>
    </DialogsComponent>
  </v-col>
</template>

<script setup>
import {onMounted, ref} from "vue";
  import {getSellerRequestList} from "@/apis/place/sellerApis";
import DialogsComponent from "@/components/common/DialogsComponent.vue";
import HistoryDetailComponent from "@/components/place/seller/StatusDetailComponent.vue";
import {insertRequestAnswer} from "@/apis/seller/storeApis";

  const props = defineProps(['listInfo'])
  const emits = defineEmits(['handleRouterList', 'handleRoute'])
  const pageInfo = ref([{ page: null, size: null, last: null, start: 1 }])
  const sellerList = ref([])
  const requestDetail = ref()
  const dialog = ref(false)
  const signDetail = ref({ signYn:false, reason: null })


  const handleClickPage = ( pageInfo ) => {
    emits('handleRouterList', pageInfo)
  }

  const getSellerRequestWaitList = async () => {
    const data = await getSellerRequestList( props.listInfo )
    sellerList.value = data.dtoList
    pageInfo.value.page = data.page
    pageInfo.value.size = data.size
    pageInfo.value.last = data.last
  }

  const handleClickDialogs = ( rhNo ) => {
    requestDetail.value = sellerList.value.filter(item => item.rhNo == rhNo)
    signDetail.value.signYn = false
    dialog.value = !dialog.value
  }

  const handleClickOk = async () => {
    requestDetail.value[0].rhStatus = '승인'
    await insertRequestAnswer(requestDetail.value[0])
    emits('handleRoute')
  }

  const handleClickSignDetail = async () => {
    if (signDetail.value.signYn) {
      if (signDetail.value.reason == null) {
        alert('거절 사유를 기재해주세요.')
      }

      requestDetail.value[0].rhStatus = '거절'
      requestDetail.value[0].rhReason = signDetail.value.reason
      await insertRequestAnswer(requestDetail.value[0])
      emits('handleRoute')
    }

    signDetail.value.signYn = true
  }

  const handleChangeReason = ( reason ) => {
    signDetail.value.reason = reason
  }


  onMounted(() => {
    getSellerRequestWaitList()
  })
</script>

<style scoped>

</style>
