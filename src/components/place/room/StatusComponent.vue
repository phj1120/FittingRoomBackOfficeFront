<template>
  <v-col cols="12" class="pa-0">
      <div>
        <v-card class="ml-10 mr-10 pa-10 font-weight-bold text-h4">피팅룸 {{ roomStatus.roName }}은 <h2 style="display: inline; color: red">
          {{ roomStatus.pmStatus }}</h2> 상태입니다!</v-card>
        <v-card class="ma-10">
          <v-table class="ma-4">
            <thead>
              <tr class="bg-amber-accent-2">
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
  </v-col>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {getPlaceRoomStatus, getPlaceRoomStatusList} from "@/apis/place/placeApis";


  const props = defineProps(['listInfo'])
  const emits = defineEmits(['handleRouterList'])
  const pageInfo = ref([{ page: null, size: null, last: null, start: 1 }])
  const roomStatus = ref({})
  const historyList = ref([])


  const handleClickPage = ( pageInfo ) => {
    emits('handleRouterList', pageInfo)
  }

  const getRoomStatus = async () => {
    const data = await getPlaceRoomStatus( props.listInfo.id )
    roomStatus.value = data.data
  }

  const getRoomStatusHistory = async () => {
    const data = await getPlaceRoomStatusList( props.listInfo )
    historyList.value = data.dtoList
    pageInfo.value.page = data.page
    pageInfo.value.size = data.size
    pageInfo.value.last = data.last
    console.log(pageInfo.value)
  }


  onMounted(() => {
    getRoomStatus()
    getRoomStatusHistory()
  })
</script>

<style scoped>

</style>
