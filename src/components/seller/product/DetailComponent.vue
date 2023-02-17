<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <h2>Detail Component</h2>
      <v-row>
        <v-col cols="4">
          썸네일
          대표 사진
          상세 사진
        </v-col>
        <v-col cols="8">
          <v-row>
            상품 정보
          </v-row>
          <v-row>
            <v-table>
              <tbody>
              <tr>
                <th class="text-left">
                  상품 번호
                </th>
                <td>
                  1
                </td>
                <th class="text-left">
                  카테고리
                </th>
                <td>
                  2
                </td>
              </tr>
              <tr>
                <th class="text-left">
                  상품명
                </th>
                <td>
                  1
                </td>
                <th class="text-left">
                  가격
                </th>
                <td>
                  2
                </td>
              </tr>
              <tr>
                <th class="text-left">
                  브랜드
                </th>
                <td>
                  1
                </td>
                <th class="text-left">
                  예약횟수
                </th>
                <td>
                  2
                </td>
              </tr>
              </tbody>
            </v-table>
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
                    이름
                  </th>
                  <th class="text-left">
                    사이즈
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="size in sizes"
                  :key="size.spNo"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
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
import {getProduct} from "@/api/seller/productApis";


const getProductData = (prNo)=>{
  const result = getProduct(prNo)

  console.log(result)
}

getProductData(85)





</script>

<style scoped>

</style>
