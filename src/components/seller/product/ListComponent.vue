<template>
  <v-col cols="12">
    <v-card min-height="85vh" class="ma-5 mt-0">
      <v-col cols=12>
        <v-row class="ml-2">
          <div v-for="statusType in statusTypes" :key=statusType.code class="ma-3">
            <v-btn @click="clickChangeStatusButton(statusType.code)" color="blue">
              {{ statusType.name }}
            </v-btn>
          </div>
        </v-row>
        <v-row class="ma-3">
          <v-table>
            <thead>
            <tr class="bg-grey-lighten-2">
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
            <tbody class="">
            <tr v-for="product in products" :key="product.prNo">
              <td>
                <v-checkbox v-model="selectedPNos" :value="product.prNo" class="mt-5"></v-checkbox>
              </td>
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
              <td @click="clickProductDetail(product.prNo)">{{ convertLocalDate(product.prCreateDt) }}</td>
              <td @click="clickProductDetail(product.prNo)">{{ convertLocalDate(product.prModifyDt) }}</td>
              <td @click="clickProductDetail(product.prNo)">{{ product.prStatus }}</td>
            </tr>
            </tbody>
          </v-table>
        </v-row>
      </v-col>
    </v-card>
  </v-col>
  <v-pagination class="mb-10"
                v-model="pageInfo.page"
                :length="pageInfo.end"
                :total-visible="10"
                @click="clickPageButton"
  ></v-pagination>
  <div :key="detailDialog" class="d-flex">
    <DialogsComponent :dialog="detailDialog">
      <template v-slot:dialogContent>
        <div class="ma-5 ">
          <v-row>
            <div class="pr-10" style="width: 300px;">
              <v-carousel height="355" class="border">
                <v-carousel-item v-for="file in productInfo.topFiles" :key="file.prfNo"
                                 :src=getImageUrl(file.prfUuid) contain
                ></v-carousel-item>
              </v-carousel>
            </div>
            <div class="" style="width: 500px;">
              <v-row>
                <v-col>
                  <v-table class="border">
                    <tbody>
                    <tr>
                      <th class="text-left bg-grey-lighten-2">
                        상품명
                      </th>
                      <td>
                        {{ productInfo.prName }}
                      </td>
                      <th class="text-left bg-grey-lighten-2">
                        브랜드
                      </th>
                      <td>
                        {{ productInfo.prBrand }}
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left bg-grey-lighten-2">
                        카테고리
                      </th>
                      <td>
                        {{ productInfo.categoryPathName }}
                      </td>
                      <th class="text-left bg-grey-lighten-2">
                        가격
                      </th>
                      <td>
                        {{ productInfo.prPrice }}
                      </td>
                    </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-table class="border">
                    <thead>
                    <tr class="bg-grey-lighten-2">
                      <th class="text-center">
                        사이즈
                      </th>
                      <th class="text-center">
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
              <v-btn @click="clickUpdateOptionButton" color="blue" class="ma-auto mt-5 mb-3">
                옵션 수정
              </v-btn>
            </div>
          </v-row>
        </div>
        <v-file-input type="file" label="productInfo.bottomFiles" disabled></v-file-input>
      </template>
      <template v-slot:dialogBtn>
        <v-col class="text-center">
          <v-btn @click="clickUpdateButton" color="blue" class="mr-5">
            수정
          </v-btn>
          <v-btn @click="clickCancelButton">
            닫기
          </v-btn>
        </v-col>
      </template>
    </DialogsComponent>
  </div>
</template>

<script setup>
import {getProduct, getProductList, updateProductStatusAtOnce} from "@/apis/product/productApis";
import {onMounted, ref} from "vue";
import DialogsComponent from "@/components/common/DialogsComponent.vue";
import {convertLocalDate, getImageUrl} from "@/utils/productUtil";

const props = defineProps(['pageSearch'])
const emits = defineEmits(['handelDetailPage', 'handleChangePage', 'handleUpdatePage', 'handleUpdateOptionPage'])

const pageInfo = ref({
  page: null,
  end: null
})
const selectedPNos = ref([])
const detailDialog = ref(false)
const products = ref([])
const productInfo = ref({
  prNo: null,
  prName: null,
  prBrand: null,
  prPrice: null,
  prStatus: null,
  prcNo: null,
  thumbnailIndex: 0,
  topFiles: [],
  bottomFiles: []
})

const statusTypes = [
  {name: '활성', code: 'ACTIVE'},
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

const clickProductDetail = async (prNo) => {
  const result = await getProduct(prNo)
  productInfo.value = result
  detailDialog.value = !detailDialog.value
}

const clickUpdateButton = () => {
  emits('handleUpdatePage', productInfo.value.prNo)
}

const clickCancelButton = () => {
  detailDialog.value = !detailDialog.value
}

const clickUpdateOptionButton = () => {
  emits('handleUpdateOptionPage', productInfo.value.prNo)
}


onMounted(() => {
  getProductListData()
})

</script>

<style scoped>
</style>
