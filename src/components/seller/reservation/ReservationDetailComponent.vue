<template>
  <v-col cols="12">
    <v-table class="ma-4 border">
      <tbody>
      <tr>
        <th class="text-center bg-blue">예약번호</th>
        <td >{{ props.detailData.reNo }}</td>
      </tr>
      <tr>
        <th class="text-center bg-blue">예약일</th>
        <td >{{ props.detailData.reDt }}</td>
      </tr>
      <tr>
        <th class="text-center bg-blue">예약자명</th>
        <td >{{ props.detailData.coName }}</td>
      </tr>
      <tr>
        <th class="text-center bg-blue">예약상태</th>
        <td >{{ props.detailData.orStatus }}</td>
      </tr>
      </tbody>
    </v-table>
    <v-table class="ml-2 mr-2 mb-2">
      <thead>
      <tr class="bg-amber-accent-2">
        <th class="text-center font-weight-bold">상품번호</th>
        <th class="text-center font-weight-bold">상품명</th>
        <th class="text-center font-weight-bold">상품가격</th>
        <th class="text-center font-weight-bold">상품사이즈</th>
        <th class="text-center font-weight-bold">상품상태</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in productList" :key="product.reNo">
        <td class="text-center">{{ product.prNo }}</td>
        <td class="text-center">{{ product.prName }}</td>
        <td class="text-center">{{ product.prPrice }}</td>
        <td class="text-center">{{ product.spSize }}</td>
        <td class="text-center">

          <v-btn v-if="product.cpStatus">거절된상품</v-btn>
          <v-btn v-if="!product.cpStatus" @click="modifyProduct(product.cpNo)">거절</v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-col>
</template>

<script setup>
import {getProductListApi, modifyProductApi} from "@/apis/seller/reservationApis";
import {onMounted, ref} from "vue";


const props = defineProps(['detailData'])
const productList = ref([])
const datas = ref({caNo : 0, seNo: 13, reNo:0, cpNo : 0})
const getProductList = async () => {
  console.log(datas.value)

  const data = await getProductListApi( datas.value)
  productList.value=data
}

const modifyProduct = async (cpNo) => {
  datas.value.cpNo = cpNo
  const data = await modifyProductApi(datas.value)
}

onMounted(() => {
  datas.value.caNo = props.detailData.caNo
  datas.value.reNo = props.detailData.reNo
  getProductList()
})
</script>

<style scoped>

</style>
