<template>
  <v-col :key="componentKey" cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <p>pageSearch: {{ pageSearch }}</p>
      <p>search: {{ search }}</p>
      <p>pageInfo: {{ pageInfo }}</p>
      <p>selectedPnos: {{ selectedPNos }}</p>
      <h1>목록 페이지</h1>
      <v-row>
        <v-col cols="8">
          <v-row
            align="start"
            no-gutters>
            <v-col cols="4">
              <v-combobox
                v-model="search.types"
                :items="categories"
                item-title="name"
                item-value="code"
                label="검색 조건"
                multiple
              ></v-combobox>
            </v-col>
            <v-col cols="8">
              <v-text-field label="검색" variant="outlined" v-model="search.keyword"></v-text-field>
            </v-col>
          </v-row>
          <v-row
            align="start"
            no-gutters>
            <v-col cols="2">
              <p>시작</p>
            </v-col>
            <v-col cols="4">
              <Datepicker v-model="search.startDt"
                          inputFormat="yyyy-MM-dd"/>
            </v-col>
            <v-col cols="2">
              <p>끝</p>
            </v-col>
            <v-col cols="4">
              <Datepicker v-model="search.endDt"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-btn @click="clickSearchButton" min-height="100">검색</v-btn>
        </v-col>
      </v-row>

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
            <td @click="clickProductDetail(product.prNo)">{{ product.thumbnail }}</td>
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
import {getProductList, updateProductStatusAtOnce} from "@/api/seller/productApis";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import Datepicker from 'vue3-datepicker';

const route = useRoute();
const router = useRouter();

const categories = ['NO', 'BRAND', 'NAME']

const componentKey = ref(0)
const pageInfo = ref({page: null, end: null})
const search = ref({
  keyword: route.query.keyword,
  types: typeof route.query.types === 'string' ? [route.query.types] : route.query.types,
  startDt: route.query.startDt, endDt: route.query.endDt
})
const pageSearch = ref({
  seNo: route.query.seNo,
  page: route.query.page, size: route.query.size,
  startDt: route.query.startDt, endDt: route.query.endDt,
  types: typeof route.query.types === 'string' ? [route.query.types] : route.query.types,
  keyword: route.query.keyword
})
const products = ref([])
const selectedPNos = ref([])

const statusTypes = [{name: '활성', code: 'ACTIVE'},
  {name: '비활성', code: 'INACTIVE'},
  {name: '품절', code: 'SOLDOUT'},
  {name: '삭제', code: 'DELETE'}
]

const getProductListData = async () => {
  const res = await getProductList(pageSearch.value)

  products.value = res.dtoList
  pageInfo.value.page = res.page
  pageInfo.value.end = res.end
}

const clickChangeStatusButton = async (status) => {
  await updateProductStatusAtOnce(status, selectedPNos.value).then(() => {
      componentKey.value++
      getProductListData()
      selectedPNos.value = []
    }
  ).catch(
    () => {
      console.log('fail')
    }
  )
}


const clickSearchButton = () => {
  pageSearch.value.keyword = search.value.keyword
  pageSearch.value.types = search.value.types
  pageSearch.value.startDt = convertLocalDate(search.value.startDt)
  pageSearch.value.endDt = convertLocalDate(search.value.endDt)
  pageSearch.value.page = 1

  // 페이지 이동
  router.push({name: 'SellerProductListPage', query: pageSearch.value})
}

const clickPageButton = () => {
  pageSearch.value.page = pageInfo.value.page

  router.push({name: 'SellerProductListPage', query: pageSearch.value})
}

const clickProductDetail = (prNo) => {
  router.push({name: 'SellerProductDetailPage', params: {id:prNo}, query: pageSearch.value})
}

const convertLocalDate = ((localDateTime) => {
  const localDate = localDateTime.getFullYear() +
    "-" + ((localDateTime.getMonth() + 1) > 9 ? (localDateTime.getMonth() + 1).toString() : "0" + (localDateTime.getMonth() + 1)) +
    "-" + (localDateTime.getDate() > 9 ? localDateTime.getDate().toString() : "0" + localDateTime.getDate().toString())

  return localDate
})





onMounted(() => {
  getProductListData()
})

router.beforeEach((to, from, next) => {
  pageSearch.value.seNo = to.query.seNo
  pageSearch.value.page = to.query.page
  pageSearch.value.size = to.query.size
  pageSearch.value.types = to.query.types
  pageSearch.value.keyword = to.query.keyword

  // 컴포넌트 갱신
  componentKey.value++
  getProductListData()

  next()
})


</script>

<style scoped>
</style>
