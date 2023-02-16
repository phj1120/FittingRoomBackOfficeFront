<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
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
              <v-btn color="success">Detail</v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
        <v-pagination v-model="pageInfo.page" :show-first-last-page="true"
                      :total-visible="pageInfo.size" :length="pageInfo.last" :start="pageInfo.start"
                      @click="handleClickPage(pageInfo)">
        </v-pagination>
      </v-card>
    </v-card>
  </v-col>
</template>

<script setup>
import {onMounted, ref} from "vue";
  import {getSellerRequestList} from "@/apis/place/SellerApis";

  const props = defineProps(['listInfo'])
  const emits = defineEmits(['handleRouterList'])
  const pageInfo = ref([{ page: null, size: null, last: null, start: 1 }])
  const sellerList = ref([])


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


  onMounted(() => {
    getSellerRequestWaitList()
  })
</script>

<style scoped>

</style>
