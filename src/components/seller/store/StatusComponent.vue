<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <div>
        <v-card class="ma-10 pa-10 font-weight-bold text-h4">우리 매장은 {{ storeStatus.seName }}은 <h2 style="display: inline; color: red">
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
            <tr v-for="history, index in historyList" :key="history.pmNo">
              <td class="text-center">{{ history.rhContent }}</td>
              <td class="text-center">{{ history.rhReason }}</td>
              <td class="text-center">{{ history.rhStatus }}</td>
              <td class="text-center">{{ history.rhCreateDt }}</td>
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
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getPlaceRoomStatus, getPlaceRoomStatusList} from "@/apis/place/PlaceApis";
import {getStoreStatus} from "@/apis/seller/StoreApis";


const props = defineProps(['listInfo'])
const emits = defineEmits(['handleRouterList'])
const pageInfo = ref([{ page: null, size: null, last: null, start: 1 }])
const storeStatus = ref({})
const historyList = ref([])


const handleClickPage = ( pageInfo ) => {
  emits('handleRouterList', pageInfo)
}

const getSellerStatus = async () => {
  const data = await getStoreStatus(props.listInfo.id )
  storeStatus.value = data.data
}

const getSellerStatusHistory = async () => {
  const data = await getPlaceRoomStatusList( props.listInfo )
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
