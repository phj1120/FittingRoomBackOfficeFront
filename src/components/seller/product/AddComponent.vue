<template>
  <v-col cols="12">
    <v-card class="bg-grey-darken-2" min-height="85vh">
      <v-form class="mt-10">
        <v-card class="ma-auto w-50 bg-grey-darken-1 mb-16">
          <h2 class="text-center mt-10">상품 등록</h2>
          <v-card class="ma-10 bg-grey-lighten-2">
            <div class="d-flex justify-center ma-10">
              <div class="v-col-4">
                <v-text-field
                  v-model="productInfo.prName"
                  label="상품명" required
                ></v-text-field>
                <v-select
                  v-model="productInfo.prcNo"
                  :items="categoriesInfo"
                  item-title="prcPathName"
                  item-value="prcNo"
                  label="카테고리" required
                ></v-select>
              </div>
              <div class="v-col-4">
                <v-text-field
                  v-model="productInfo.prBrand"
                  label="브랜드" required
                ></v-text-field>
                <v-text-field
                  v-model="productInfo.prPrice"
                  label="가격" required
                ></v-text-field>
              </div>
            </div>
          </v-card>
          <v-card class="ma-10 bg-grey-lighten-2">
            <div class="v-col-7 ma-auto mt-5">
              <v-file-input multiple type="file" label="상품 사진 첨부" prepend-icon="mdi-camera" v-model="fileInfo.files"
                            @change="handleChangeFile()" accept="image/*"></v-file-input>
              <v-col>
                <v-radio-group v-model="productInfo.thumbnailIndex">
                  <v-row class="justify-center">
                    <div class="ma-5" v-for="(preview,i) in fileInfo.previews" :key="i">
                      <v-img class="mb-10 w-auto" :src="preview.url" contain height="25vh"/>
                      <v-row>
                        <v-radio :label="preview.name" :value="i" class="mr-5"></v-radio>
                        <v-btn @click="clickRemoveBtn(i)">삭제</v-btn>
                      </v-row>
                    </div>
                  </v-row>
                </v-radio-group>
              </v-col>
              <v-file-input type="file" label="상품 상세정보 파일 첨부" v-model="productInfo.bottomFiles"></v-file-input>
            </div>
            <div class="v-col-3 ma-auto mt-5">
              <v-select
                v-model="productInfo.prStatus"
                :items="status"
                label="등록 상태" required
              ></v-select>
            </div>
          </v-card>
          <div class="text-center ma-10">
            <v-btn class="me-4" @click="handleClickSubmit" color="success">
              완료
            </v-btn>
            <v-btn @click="emits('handleMoveList')" color="red">
              취소
            </v-btn>
          </div>
        </v-card>
      </v-form>
      <v-dialog v-model="dialog" class="ma-auto w-33">
        <v-card>
          <v-card-text class="text-center">
            {{ count }}개의 파일이 실패하였습니다.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-col>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import {getCategories, insertProduct} from "@/apis/product/productApis";

const emits = defineEmits(['handleMoveList'])
const fileInfo = ref({files: [], previews: []})
const categoriesInfo = ref([{prcNo: null, prcPathName: null}])
const status = ref(['ACTIVE', 'INACTIVE', 'SOLDOUT'])
const dialog = ref(false)
let count = 0

/**
 * 입력한 상품데이터
 **/
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

/**
 * 상품데이터 추가 API 호출
 **/
const handleClickSubmit = async () => {
  await insertProduct(productInfo.value)
  emits('handleMoveList')
}


/**
 * 카테고리 조회 API 호출
 **/
const getCategoriesInfo = async () => {
  const res = await getCategories()
  categoriesInfo.value = res.data
}

onMounted(() => {
  getCategoriesInfo()
})

/**
 * 파일 추가
 **/
const addFile = (files) => {
  for (let i = 0; i < files.length; i++) {
    productInfo.value.topFiles.push(files[i])
  }
}

/**
 * 파일 변경 메소드
 **/
const handleChangeFile = () => {
  count = 0
  if (!fileInfo.value.files) {
    return
  }
  const correctImage = []
  fileInfo.value.files.forEach((file) => {
    if (!fileRule(file)) {
      count++
      return
    }
    correctImage.push(file)
  })
  addFile(correctImage)
  fileInfo.value.files = [] // 값이 남는 것을 방지하기 위해 초기화

  if (count !== 0) {
    dialog.value = true
  }
}

/**
 * 파일 규칙
 **/
const fileRule = (file) => {
  const ableExt = ['jpg', 'png', 'gif', 'jpeg']
  const ext = file.name.split('.').pop().toLowerCase()
  if (!ableExt.includes(ext)) {
    return false
  }
  return true
}

/**
 * 이미지 파일 각각 삭제
 **/
const clickRemoveBtn = (i) => {
  productInfo.value.topFiles.splice(i, 1)

  // 썸네일을 삭제한 경우 첫번째 사진을 썸네일로 지정
  if (i === productInfo.value.thumbnailIndex) {
    productInfo.value.thumbnailIndex = 0
  }

  // 썸네일 이전 값을 삭제한 경우 썸네일 번호 재지정
  if (i < productInfo.value.thumbnailIndex) {
    productInfo.value.thumbnailIndex--
  }
}

/**
 * 이미지 미리보기
 **/
watch(productInfo.value.topFiles, async () => {
  fileInfo.value.previews = []
  productInfo.value.topFiles.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        fileInfo.value.previews.push({name: file.name, url: reader.result})
      }
    }
  )
})
</script>

<style scoped>

</style>
