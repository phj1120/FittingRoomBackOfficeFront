<template>
  <v-col cols="12">
    <v-card class="bg-grey-darken-2" min-height="85vh">
      <v-form class="mt-10">
        <v-card class="ma-auto w-50">
          <div class="d-flex ma-10 bg-grey-lighten-1 text-black" v-for="row in rows">
            <div class="v-col-3 mt-5 ml-16">
              <v-text-field
                v-model="sellProductInfo.spSize"
                label="사이즈" required
              ></v-text-field>
            </div>
            <div class="v-col-3 mt-5">
              <v-select
                v-model="sellProductInfo.spStatus"
                :items="status"
                label="상태" required
              ></v-select>
            </div>
            <div class="v-col-6 mt-7 ml-10">
              <v-btn class="me-4" @click="addRow" v-model="row.name" color="success">
                등록
              </v-btn>
            </div>
          </div>

          <div class="d-flex ma-10 bg-grey-lighten-1 text-black">
            <div class="v-col-3 mt-5 ml-16">
              <v-text-field
                v-model="sellProductInfo.spSize"
                label="사이즈" required
              ></v-text-field>
            </div>
            <div class="v-col-3 mt-5">
              <v-select
                v-model="sellProductInfo.spStatus"
                :items="status"
                label="상태" required
              ></v-select>
            </div>
            <div class="v-col-6 mt-7">
              <v-btn class="me-4" @click="handleClickSubmit" color="blue">
                수정
              </v-btn>
              <v-btn class="me-4" @click="removeRow" color="red">
                삭제
              </v-btn>
            </div>
          </div>

          <div class="text-center ma-10">
            <v-btn class="me-4" @click="handleClickSubmit" color="success">
              완료
            </v-btn>
          </div>
        </v-card>
      </v-form>
    </v-card>
  </v-col>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps(['prNo'])
const emits = defineEmits(['handleMoveList'])
const status = ref(['ACTIVE', 'INACTIVE', 'SOLDOUT'])
const rows = ref([{spSize: "", spStatus: ""}])

const addRow = () => {
  rows.value.push({spSize: "", spStatus: ""})
}

const removeRow = (row) => {
  rows.value.pop(row);
}

/**
 * 입력한 상품 옵션 데이터
 **/
const sellProductInfo = ref({
  prNo: props.prNo,
  spSize: '',
  spStatus: '',
})

const handleClickSubmit = async () => {

}

</script>

<style scoped>

</style>
