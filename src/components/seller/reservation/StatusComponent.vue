<template>
  <v-col cols="12">
    <v-card>
      <v-col cols="2">
        <v-card color="blue" class="pt-2 pb-2">
          <h1 class="text-white text-center">예약 현황</h1>
        </v-card>
      </v-col>
      <v-row class="mt-5 ml-2 mr-2">
<!--        <v-col cols="1">
          <v-select label="Status" v-model="statusList.value" :items="statusList.item" variant="underlined" @update:modelValue="handleChangeStatus"></v-select>
        </v-col>-->
        <v-col cols="8">

        </v-col>
<!--        <v-col cols="3" class="pa-0">
          <SearchComponent :searchList="searchList" :listInfo="props.listInfo" @handleClickSearch="handleClickSearch" />
        </v-col>-->
      </v-row>
      <v-table class="ml-2 mr-2 mb-2">
        <thead>
        <tr class="bg-amber-accent-2">
          <th class="text-center font-weight-bold">예약번호</th>
          <th class="text-center font-weight-bold">예약일</th>
          <th class="text-center font-weight-bold">예약자명</th>
          <th class="text-center font-weight-bold">예약상태</th>
          <th class="text-center font-weight-bold">상세보기</th>
        </tr>
        </thead>
        <tbody>
       <tr v-for="reservation in reservationList" :key="reservation.reNo">
          <td class="text-center">{{ reservation.reNo }}</td>
          <td class="text-center">{{ reservation.reDt }}</td>
          <td class="text-center">{{ reservation.coName }}</td>
          <td class="text-center">{{ reservation.orStatus }}</td>
          <td class="text-center">
            <v-btn color="success" @click="handleClickDetail(reservation)">보기</v-btn>
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
  <v-col class="pa-0" :key="dialog">
  <DialogsComponent :dialog="dialog">
      <template v-slot:dialogContent>
        <ReservationDetailComponent :detailData="detailData"></ReservationDetailComponent>
      </template>
      <template v-slot:dialogBtn>
        <v-btn color="error" @click="handleClickDialogs">닫기</v-btn>
      </template>
    </DialogsComponent>
  </v-col>
</template>

<script setup>
import {getPlaceSellerList} from "@/apis/place/sellerApis";
import {onMounted, ref} from "vue";
import SearchComponent from "@/components/common/SearchComponent.vue";
import DialogsComponent from "@/components/common/DialogsComponent.vue";
import DetailComponent from "@/components/place/seller/SellerDetailComponent.vue";
import {getReservationListApi} from "@/apis/seller/reservationApis";
import ReservationDetailComponent from "@/components/seller/reservation/ReservationDetailComponent.vue";


/*

const searchList = ref([ 'Store', 'Manager' ])

const sellerDetail = ref()
const statusList = ref({item: ['전체','영업', '휴업'], value: props.listInfo.status})
*/
const props = defineProps(['listInfo'])
const emits = defineEmits(['handleRouterList', 'handleRouterSearchList', 'handleRouterStatus'])
const pageInfo = ref([{ page: null, size: null }])
const reservationList = ref([])
const dialog = ref(false)
const detailData = ref([])
const handleClickPage = ( pageInfo ) => {
  emits('handleRouterList', pageInfo)
}



const handleClickDialogs = () => {
  dialog.value = !dialog.value
}
const handleClickDetail = (data) =>{
  detailData.value = data
  handleClickDialogs()
}

const getReservationList = async () => {
  const data = await getReservationListApi( props.listInfo )
  reservationList.value = data.dtoList
  pageInfo.value.page = data.page
  pageInfo.value.size = data.size
}


onMounted(() => {
  getReservationList()
})
</script>

<style scoped>

</style>
