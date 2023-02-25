<template>
  <v-col cols="12">
    <v-card>
      <v-col cols="2" class="mb-10">
        <v-card color="blue" class="pt-2 pb-2">
          <h1 class="text-white text-center">요청 기록</h1>
        </v-card>
      </v-col>

      <HistorySearchComponent :listInfo="props.listInfo" @handleClickSearch="handleClickSearch" />

      <v-table class="ma-2">
        <thead class="bg-amber-accent-2">
          <tr>
            <th class="text-center">판매점</th>
            <th class="text-center">담당자</th>
            <th class="text-center">요청타입</th>
            <th class="text-center">요청상태</th>
            <th class="text-center">요청일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requestList" :key="request.rhNo">
            <td class="text-center">{{ request.seName }}</td>
            <td class="text-center">{{ request.seManager }}</td>
            <td class="text-center">{{ request.rhContent }}</td>
            <td class="text-center">{{ request.rhStatus }}</td>
            <td class="text-center">{{ request.rhCreateDt }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination v-model="pageInfo.page" :show-first-last-page="true"
                    :total-visible="pageInfo.size" :length="pageInfo.last" :start="pageInfo.start"
                    @click="handleClickPage(pageInfo)">
      </v-pagination>
    </v-card>
  </v-col>
</template>

<script setup>
import {onMounted, ref} from "vue";
  import HistorySearchComponent from "@/components/place/seller/HistorySearchComponent.vue";
  import {getSellerRequestSearchList} from "@/apis/place/sellerApis";
  import useUtil from "@/store/common/useUtil";


  const props = defineProps(['listInfo'])
  const emits = defineEmits(['handleRouterSearchList'])
  const { convertDate } = useUtil()
  const requestList = ref([])
  const pageInfo = ref([{ page: null, size: null, last: null, start: 1 }])
  const searchInfo = ref({type: null, status: null, toDate: null, fromDate: null})


  const handleClickSearch = (type, status, toDate, fromDate) => {
    searchInfo.value.type = type
    searchInfo.value.status = status
    searchInfo.value.toDate = convertDate(toDate)
    searchInfo.value.fromDate = convertDate(fromDate)

    emits('handleRouterSearchList', searchInfo.value)
  }

  const getSellerRequestAllList = async () => {
    const data = await getSellerRequestSearchList( props.listInfo )
    requestList.value = data.dtoList
    pageInfo.value.page = data.page
    pageInfo.value.size = data.size
    pageInfo.value.last = data.last
  }


  onMounted(() => {
    getSellerRequestAllList()
  })
</script>

<style scoped>
  .margin-center {
    margin: 0 auto;
  }
</style>
