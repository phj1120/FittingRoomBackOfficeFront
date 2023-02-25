<template>
  <v-row class="ma-5 mb-0">
    <div class="d-flex ma-4 mb-0 w-100">
      <v-combobox class="w-25"
                  variant="solo"
                  v-model="search.types"
                  :items="categories"
                  item-title="name"
                  item-value="code"
                  label="검색 조건"
                  multiple
      ></v-combobox>
      <v-text-field label="검색" variant="solo" v-model="search.keyword" class="mr-1 ml-1 w-75"></v-text-field>
      <v-btn @click="clickSearchButton" style="height: 56px; width: 100px" color="green">검색</v-btn>
    </div>
    <div class="d-flex ml-5 mb-3 border">
      <p class="ml-5">시작일</p>
      <Datepicker v-model="search.startDt" inputFormat="yyyy-MM-dd" class="bg-white ml-5 mr-5"/>
      <p>종료일</p>
      <Datepicker v-model="search.endDt" inputFormat="yyyy-MM-dd" class="bg-white ml-5"/>
    </div>
  </v-row>
</template>

<script setup>
import Datepicker from 'vue3-datepicker';
import {ref} from "vue";

const categories = ['NO', 'BRAND', 'NAME']
const props = defineProps(['pageSearch'])
const emits = defineEmits(['handleProductSearch'])

const search = ref({
  keyword: props.pageSearch.keyword,
  types: typeof props.pageSearch.types === 'string' ? [props.pageSearch.types] : props.pageSearch.types,
  startDt: new Date(props.pageSearch.startDt),
  endDt: new Date(props.pageSearch.endDt)
})

const clickSearchButton = () => {
  emits('handleProductSearch', search)
}

</script>

<style scoped>

</style>
