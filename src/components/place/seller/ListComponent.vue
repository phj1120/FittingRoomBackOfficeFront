<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <v-card>
        <div>
        <v-col cols="2">
          <v-card color="blue" class="pt-2 pb-2">
            <h1 class="text-white text-center">입점 목록</h1>
          </v-card>
        </v-col>
        </div>
        <v-row class="mt-5 ml-2 mr-2">
          <v-col cols="1">
            <v-select label="Status" v-model="statusList.value" :items="statusList.item" variant="underlined" @update:modelValue="handleChangeStatus"></v-select>
          </v-col>
          <v-col cols="8">

          </v-col>
          <v-col cols="3" class="pa-0">
            <SearchComponent :searchList="searchList" :listInfo="props.listInfo" @handleClickSearch="handleClickSearch" />
          </v-col>
        </v-row>
        <v-table class="ma-4">
          <thead>
          <tr class="bg-amber-accent-2">
            <th class="text-center font-weight-bold">판매점</th>
            <th class="text-center font-weight-bold">담당자</th>
            <th class="text-center font-weight-bold">연락처</th>
            <th class="text-center font-weight-bold">상태</th>
            <th class="text-center font-weight-bold">등록일</th>
            <th class="text-center font-weight-bold w-0"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="seller in sellerList" :key="seller.seNo">
            <td class="text-center">{{ seller.seName }}</td>
            <td class="text-center">{{ seller.seManager }}</td>
            <td class="text-center">{{ seller.sePhone }}</td>
            <td class="text-center">{{ seller.seStatus }}</td>
            <td class="text-center">{{ seller.seCreateDt }}</td>
            <td class="text-center">
              <v-btn color="success" @click="handleClickDialogs(seller.seNo)">Detail</v-btn>
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
  <v-col :key="dialog">
    <DialogsComponent :dialog="dialog">
      <template v-slot:dialogContent>
        <DetailComponent :sellerDetail="sellerDetail[0]"></DetailComponent>
      </template>
      <template v-slot:dialogBtn>
        <v-btn class="mr-5" color="success" @click="handleClickDialogs">RUN</v-btn>
        <v-btn class="ml-5" color="error" @click="handleClickDialogs">close</v-btn>
      </template>
    </DialogsComponent>
  </v-col>
</template>

<script setup>
  import {getPlaceSellerList} from "@/apis/place/sellerApis";
  import {onMounted, ref} from "vue";
  import SearchComponent from "@/components/common/SearchComponent.vue";
  import DialogsComponent from "@/components/common/DialogsComponent.vue";
  import DetailComponent from "@/components/place/seller/DetailComponent.vue";


  const props = defineProps(['listInfo'])
  const emits = defineEmits(['handleRouterList', 'handleRouterSearchList', 'handleRouterStatus'])
  const pageInfo = ref([{ page: null, size: null, last: null, start: 1 }])
  const searchList = ref([ 'Store', 'Manager' ])
  const sellerList = ref([])
  const sellerDetail = ref()
  const statusList = ref({item: ['전체','영업', '휴업'], value: props.listInfo.status})
  const dialog = ref(false)


  const handleClickPage = ( pageInfo ) => {
    emits('handleRouterList', pageInfo)
  }

  const handleClickSearch = ( searchInfo ) => {
    emits('handleRouterSearchList', searchInfo)
  }

  const handleChangeStatus = ( status ) => {
    emits( 'handleRouterStatus', status )
  }

  const handleClickDialogs = ( seNo ) => {
    sellerDetail.value = sellerList.value.filter(item => item.seNo == seNo)
    dialog.value = !dialog.value
  }

  const getSellerList = async () => {
    const data = await getPlaceSellerList( props.listInfo )
    sellerList.value = data.dtoList
    pageInfo.value.page = data.page
    pageInfo.value.size = data.size
    pageInfo.value.last = data.last
  }


  onMounted(() => {
    getSellerList()
  })
</script>

<style scoped>

</style>
