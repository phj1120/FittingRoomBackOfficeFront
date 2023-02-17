<template>
  <v-col cols="12">
    <v-card class="bg-grey-darken-2" min-height="85vh">
      <v-form class="mt-10">
        <v-card class="ma-auto w-33 bg-grey-darken-1 mb-16">
          <h2 class="text-center mt-10">판매 상품 관리</h2>
          <v-card class="d-flex ma-10 text-black bg-grey-lighten-2">
            <div class="v-col-3 mt-5 ml-5">
              <v-text-field
                v-model="sellProductInfo.spSize"
                label="사이즈" required
              ></v-text-field>
            </div>
            <div class="v-col-4 mt-5">
              <v-select
                v-model="sellProductInfo.spStatus"
                :items="status"
                label="상태" required
              ></v-select>
            </div>
            <div class="v-col-6 mt-7 ml-11">
              <v-btn class="me-4" @click="insertSellProductInfo" color="success">
                등록
              </v-btn>
            </div>
          </v-card>
          <v-card class="d-flex ma-10 text-black bg-grey-lighten-2" v-for="(row,i) in rows" :key="i">
            <div class="v-col-3 mt-5 ml-5">
              <v-text-field
                v-model="row.spSize"
                label="사이즈" required
              ></v-text-field>
            </div>
            <div class="v-col-4 mt-5">
              <v-select
                v-model="row.spStatus"
                :items="status"
                label="상태" required
              ></v-select>
            </div>
            <div class="v-col-6 mt-7">
              <v-btn class="me-4" :value="i" @click="updateSellProductInfo(i)" color="blue">
                수정
              </v-btn>
              <v-btn class="me-4" :value="i" @click="deleteSellProductInfo(i)" color="red">
                삭제
              </v-btn>
            </div>
          </v-card>
          <div class="text-center ma-10">
            <v-btn class="me-4" @click="emits('handleMoveList')" color="success">
              완료
            </v-btn>
          </div>
        </v-card>
      </v-form>
    </v-card>
  </v-col>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {deleteSellProduct, getSellProduct, insertSellProduct, updateSellProduct} from "@/apis/product/productApis";

const props = defineProps(['prNo'])
const emits = defineEmits(['handleMoveList', 'handleRefreshKey'])
const status = ref(['ACTIVE', 'INACTIVE', 'SOLDOUT'])
const rows = ref([])

/**
 * 입력한 상품 옵션 데이터
 **/
const sellProductInfo = ref({
  prNo: props.prNo,
  spSize: null,
  spStatus: null,
})

/**
 * 상품 옵션 조회 API 호출
 **/
const getSellProductInfo = async () => {
  const res = await getSellProduct(props.prNo)
  rows.value = res
  console.log(res)
}

onMounted(() => {
  getSellProductInfo()
})

/**
 * 상품 옵션 추가 API 호출
 **/
const insertSellProductInfo = async () => {
  await insertSellProduct(sellProductInfo.value)
  emits('handleRefreshKey')
}

/**
 * 상품 옵션 수정 API 호출
 **/
const updateSellProductInfo = async (i) => {
  await updateSellProduct(rows.value[i])
  emits('handleRefreshKey')
}

/**
 * 상품 옵션 삭제 API 호출
 **/
const deleteSellProductInfo = async (i) => {
  await deleteSellProduct(rows.value[i].spNo)
  emits('handleRefreshKey')
}

</script>

<style scoped>

</style>
