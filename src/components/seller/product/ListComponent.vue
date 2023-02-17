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
  <v-col :key="detailDialog">
    <DialogsComponent :dialog="detailDialog">
      <template v-slot:dialogContent>
        <v-col cols="12">
          <v-row>
            <v-col cols="4" class="pa-0">
              대표 사진
              <v-carousel height="300">
                <v-carousel-item v-for="file in productInfo.topFiles" :key="file.prfNo"
                                 :src=getImageUrl(file.prfUuid)
                                 cover
                ></v-carousel-item>
              </v-carousel>
              상세 사진
              <v-carousel height="300">
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
        </v-col>
      </template>
      <template v-slot:dialogBtn>
        <v-col>
          <v-btn @click="clickUpdateButton">
            수정
          </v-btn>
          <v-btn @click="clickCancelButton">
            닫기
          </v-btn>
        </v-col>
      </template>
    </DialogsComponent>
  </v-col>
</template>

<script setup>
import {getImageUrl, getProduct, getProductList, updateProductStatusAtOnce} from "@/apis/product/productApis";
import {onMounted, ref} from "vue";
import DialogsComponent from "@/components/common/DialogsComponent.vue";

const props = defineProps(['pageSearch'])
const emits = defineEmits(['handelDetailPage', 'handleChangePage', 'handleUpdatePage'])

const pageInfo = ref({
  page: null,
  end: null
})
const selectedPNos = ref([])
const detailDialog = ref(false)
const products = ref([])
const productInfo = ref({
  prNo:null,
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

const clickUpdateButton = () =>{
  console.log('click update')
  emits('handleUpdatePage', productInfo.value.prNo)
}

const clickCancelButton = () =>{
  detailDialog.value = !detailDialog.value
}


onMounted(() => {
  getProductListData()
})

</script>

<style scoped>
</style>
