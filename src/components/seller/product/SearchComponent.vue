<template>
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
