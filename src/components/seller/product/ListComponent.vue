<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <h1>목록 페이지</h1>

      <!--  활성, 비활성, 품절, 삭제  -->
      <v-row>
        <v-col v-for="statusType in statusTypes" :key=statusType.code cols="1">
          <v-btn @click="clickChangeStatusButton(statusType.code)">
            {{ statusType.name }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-table>
          <thead>
          <tr>
            <th class="text-left">
              선택
            </th>
            <th class="text-left">
              상품 번호
            </th>
            <th class="text-left">
              카테고리
            </th>
            <th class="text-left">
              브랜드
            </th>
            <th class="text-left">
              상품명
            </th>
            <th class="text-left">
              이미지
            </th>
            <th class="text-left">
              가격
            </th>
            <th class="text-left">
              등록일
            </th>
            <th class="text-left">
              수정일
            </th>
            <th class="text-left">
              상태
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="product in products"
            :key="product.prNo"
          >
            <v-checkbox
              v-model="selectedPNos"
              :value="product.prNo"
            ></v-checkbox>
            <td @click="clickProductDetail(product.prNo)">{{ product.prNo }}</td>
            <td @click="clickProductDetail(product.prNo)">{{ product.categoryPathName }}</td>
            <td @click="clickProductDetail(product.prNo)">{{ product.prBrand }}</td>
            <td @click="clickProductDetail(product.prNo)">{{ product.prName }}</td>
            <td @click="clickProductDetail(product.prNo)">
              <v-img
                :src="getImageUrl(product.thumbnail)"
                cover
              ></v-img>
            </td>
            <td @click="clickProductDetail(product.prNo)">{{ product.prPrice }}</td>
            <td @click="clickProductDetail(product.prNo)">{{ product.prCreateDt }}</td>
            <td @click="clickProductDetail(product.prNo)">{{ product.prModifyDt }}</td>
            <td @click="clickProductDetail(product.prNo)">{{ product.prStatus }}</td>
          </tr>
          </tbody>
        </v-table>
      </v-row>
    </v-card>
  </v-col>
  <v-pagination
    v-model="pageInfo.page"
    :length="pageInfo.end"
    :total-visible="10"
    @click="clickPageButton"
  ></v-pagination>
</template>

<script setup>
import {getImageUrl, getProductList, updateProductStatusAtOnce} from "@/api/seller/productApis";
import {onMounted, ref} from "vue";

const props = defineProps(['pageSearch'])
const emits = defineEmits(['handleProductSearch', 'handelDetailPage'])

const pageInfo = ref({page: null, end: null})
const products = ref([])
const selectedPNos = ref([])
const statusTypes = [{name: '활성', code: 'ACTIVE'},
  {name: '비활성', code: 'INACTIVE'},
  {name: '품절', code: 'SOLDOUT'},
  {name: '삭제', code: 'DELETE'}
]

const getProductListData = async () => {
  const res = await getProductList(props.pageSearch)

  products.value = res.dtoList
  pageInfo.value.page = res.page
  pageInfo.value.end = res.end
}

console.log(props.pageSearch)

const clickChangeStatusButton = async (status) => {
  await updateProductStatusAtOnce(status, selectedPNos.value).then(() => {
      getProductListData()
      selectedPNos.value = []
    }
  ).catch(
    () => {
      console.log('fail')
    }
  )
}

const clickPageButton = () => {
  emits('handleChangePage', pageInfo)
}

const clickProductDetail = (prNo) => {
  emits('handelDetailPage', prNo)
}


onMounted(() => {
  getProductListData()
})

</script>

<style scoped>
</style>
