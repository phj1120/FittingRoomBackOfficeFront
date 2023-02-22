<template>
  <v-card class="pt-10 margin-center" width="50vw" min-height="70vh">
    <v-img class="mt-8 mb-15 margin-center" width="10vw" src="https://vo.la/AcATy"></v-img>
    <v-table class="ma-10 border">
      <tbody>
        <tr>
          <th class="text-center">성명</th>
          <td><v-text-field class="pt-5" v-model="placeInfo.pmName" variant="outlined"></v-text-field></td>
          <th class="text-center">생년월일</th>
          <td><v-text-field class="pt-5" v-model="placeInfo.pmBirth" variant="outlined"></v-text-field></td>
        </tr>
        <tr>
          <th class="text-center">지점명</th>
          <td colspan="3"><v-text-field class="pt-5" v-model="placeInfo.roName" variant="outlined"></v-text-field></td>
        </tr>
        <tr>
          <th class="text-center">아이디</th>
          <td colspan="3"><v-text-field class="pt-5" v-model="placeInfo.pmId" variant="outlined"></v-text-field></td>
        </tr>
        <tr>
          <th class="text-center">비밀번호</th>
          <td colspan="3"><v-text-field class="pt-5" v-model="placeInfo.pmPassword" type="password" variant="outlined"></v-text-field></td>
        </tr>
        <tr>
          <th class="text-center">이메일</th>
          <td><v-text-field class="pt-5" v-model="placeInfo.pmEmail" type="email" variant="outlined"></v-text-field></td>
          <th class="text-center">연락처</th>
          <td><v-text-field class="pt-5" v-model="placeInfo.pmPhone" variant="outlined"></v-text-field></td>
        </tr>
        <tr>
          <th class="text-center">주소</th>
          <td colspan="2"><v-text-field class="pt-5" v-model="addressInfo.address" variant="outlined"></v-text-field></td>
          <td colspan="1"><v-btn class="w-100" color="primary" @click="handleClickAddress">주소 찾기</v-btn></td>
        </tr>
        <tr>
          <th class="text-center">상세주소</th>
          <td colspan="3"><v-text-field class="pt-5" v-model="placeInfo.roDetailAddress" variant="outlined"></v-text-field></td>
        </tr>
        <tr>
          <th class="text-center">첨부파일</th>
          <td colspan="3" class="pt-4"><v-file-input multiple type="file" v-model="fileInfo.files" accept="image/*" @change="handleChangeFile" ></v-file-input></td>
        </tr>
      </tbody>
    </v-table>
    <v-radio-group v-model="placeInfo.thumbnail">
      <v-row class="justify-center">
        <v-col cols="5" class="ma-5" v-for="(preview, i) in fileInfo.previews" :key="i">
          <v-img class="ma-5" :src="preview.url"/>
          <v-row>
            <v-radio :label="preview.name" :value="i"></v-radio>
            <v-btn @click="handleClickRemove(i)">삭제</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-radio-group>

    <v-btn class="float-right mr-10 mb-10" color="success" @click="handleClickSubmit">가입신청</v-btn>
  </v-card>

</template>

<script setup>
  import {ref, watch} from "vue";
  import useUtil from "@/store/common/useUtil";
  import {insertPlaceRegister} from "@/apis/place/placeApis";


  const emits = defineEmits(['handleLoginPage'])
  const { execDaumPostcode } = useUtil()


  const addressInfo = ref({})
  const fileInfo = ref({files: [], previews: [], previewIndex: 0})
  const placeInfo = ref({
    images: [],
    thumbnail: 0,

    pmName: null,
    pmBirth: null,
    pmId: null,
    pmPassword: null,
    pmEmail: null,
    pmPhone: null,
    pmStatus: null,

    roName: null,
    roAddress: null,
    roDetailAddress: null,
    roPostcode: null
  })


  const handleChangeFile = () => {
    fileInfo.value.files.forEach(( file ) => {
      placeInfo.value.images.push(file)
    })

    fileInfo.value.files = []

  }

  const handleClickRemove = ( index ) => {
    placeInfo.value.images.splice( index, 1 )

    // 썸네일을 삭제한 경우 첫번째 사진을 썸네일로 지정
    if (index === placeInfo.value.thumbnail) {
      placeInfo.value.thumbnail = 0
    }

    // 썸네일 이전 값을 삭제한 경우 썸네일 번호 재지정
    if (index < placeInfo.value.thumbnail) {
      placeInfo.value.thumbnail--
    }
  }

  const handleClickAddress = () => {
    addressInfo.value = execDaumPostcode()
  }

  const handleClickSubmit = async () => {
    placeInfo.value.roAddress = addressInfo.value.address
    placeInfo.value.roPostcode = addressInfo.value.postcode

    await insertPlaceRegister( placeInfo.value )
    emits('handleLoginPage')
  }


  watch(placeInfo.value.images, async () => {
    fileInfo.value.previews = []
    placeInfo.value.images.forEach(( file ) => {
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
  .margin-center {
    margin: 0 auto;
  }
</style>
