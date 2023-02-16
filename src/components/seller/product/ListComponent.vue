<template>
  <v-col :key="componentKey" cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <p>pageSearch: {{ pageSearch }}</p>
      <p>search: {{ search }}</p>
      <h1>목록 페이지</h1>
      <v-row>
        <v-col cols="8">
          <v-row
            align="start"
            no-gutters>
            <v-col cols="2">
              <v-combobox
                v-model="search.types"
                :items="categories"
                label="검색 조건"
                multiple
              ></v-combobox>
            </v-col>
            <v-col>
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
              날짜 선택하는 라이브러리
            </v-col>
            <v-col cols="2">
              <p>끝</p>
            </v-col>
            <v-col cols="4">
              날짜 선택하는 라이브러리
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-btn @click="clickSearchButton"  min-height="100">검색</v-btn>
        </v-col>
      </v-row>
      <br/>
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
          <td>{{ product.prNo }}</td>
          <td>{{ product.categoryPathName }}</td>
          <td>{{ product.prBrand }}</td>
          <td>{{ product.prName }}</td>
          <td>{{ product.thumbnail }}</td>
          <td>{{ product.prPrice }}</td>
          <td>{{ product.prCreateDt }}</td>
          <td>{{ product.prModifyDt }}</td>
          <td>{{ product.prStatus }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-col>
</template>

<script setup>
import {getProductList} from "@/api/seller/productApis";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const categories = ['NO', 'BRAND', 'NAME']

const componentKey = ref(0)
const search = ref({keyword: null, types: ['NO']})
const pageSearch = ref({
  seNo: route.query.seNo, page: route.query.page,
  size: route.query.size, startDt: route.query.start, endDt: route.query.endDt,
  types: route.query.types, keyword: route.query.keyword
})
const products = ref({})

const getPageListAxios = async () => {
  const res = await getProductList(pageSearch.value)

  products.value = res.dtoList
}

const clickSearchButton = () => {
  pageSearch.value.keyword = search.value.keyword
  pageSearch.value.types = search.value.types
  pageSearch.value.page = 1

  // 페이지 이동
  router.push({name: 'SellerProductListPage', query: pageSearch.value})
}

getPageListAxios()

router.beforeEach((to, from, next) => {
  pageSearch.value.page = to.query.page
  pageSearch.value.size = to.query.size
  pageSearch.value.types = to.query.types
  pageSearch.value.keyword = to.query.keyword

  // 컴포넌트 갱신
  componentKey.value++
  getPageListAxios()

  next()
})

</script>

<style scoped>

</style>
