<template>
  <v-col cols="12">
    {{ productInfo }}
    <v-card color="grey-darken-2" min-height="85vh">
      <h2>Detail Component</h2>
      <v-row>
        <v-col cols="4">
          썸네일
          대표 사진
          <v-carousel>
            <v-carousel-item v-for="file in productInfo.topFiles" :key="file.prfNo"
                             :src=getImageUrl(file.prfUuid)
                             cover
            ></v-carousel-item>
          </v-carousel>
          상세 사진
          <v-carousel>
            <v-carousel-item v-for="file in productInfo.bottomFiles" :key="file.prfNo"
                             :src=getImageUrl(file.prfUuid)
                             cover
            ></v-carousel-item>
          </v-carousel>


        </v-col>
        <v-col cols="8">
          <v-row>
            상품 정보
          </v-row>
          <v-row>
            <v-col>
              <v-table>
                <tbody>
                <tr>
                  <th class="text-left">
                    상품 번호
                  </th>
                  <td>
                    {{ productInfo.prNo }}
                  </td>
                  <th class="text-left">
                    카테고리
                  </th>
                  <td>
                    {{ productInfo.categoryPathName }}
                  </td>
                </tr>
                <tr>
                  <th class="text-left">
                    브랜드
                  </th>
                  <td>
                    {{ productInfo.prBrand }}
                  </td>
                  <th class="text-left">
                    가격
                  </th>
                  <td>
                    {{ productInfo.prPrice }}
                  </td>
                </tr>
                <tr>
                  <th class="text-left">
                    상품명
                  </th>
                  <td>
                    {{ productInfo.prName }}
                  </td>
                </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>

          <v-row>
            사이즈
          </v-row>
          <v-row>
            <v-col>
              <v-table>
                <thead>
                <tr>
                  <th class="text-left">
                    사이즈
                  </th>
                  <th class="text-left">
                    상태
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="option in productInfo.options"
                  :key="option.spNo"
                >
                  <td>{{ option.spSize }}</td>
                  <td>{{ option.spStatus }}</td>
                </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-card>
  </v-col>
</template>

<script setup>
import {getImageUrl, getProduct} from "@/api/seller/productApis";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const productInfo = ref({
  prName: null,
  prBrand: null,
  prPrice: null,
  prStatus: null,
  prcNo: null,
  thumbnailIndex: 0,
  topFiles: [],
  bottomFiles: []
})


const getProductData = async (prNo) => {
  const result = await getProduct(prNo)
  productInfo.value = result
  console.log(result)
}


// watch(productInfo.value.topFiles, async () => {
//
// })

onMounted(() => {
  getProductData(route.params.prNo)
})


</script>

<style scoped>

</style>
