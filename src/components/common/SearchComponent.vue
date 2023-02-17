<template>
  <v-form class="ma-4 searchBox" @submit.prevent>
    <v-col cols="12">
      <v-row>
        <v-col cols="4" class="pa-0">
          <v-combobox class="searchTypeBox" label="Type" v-model="searchInfo.type" :items="searchInfo.searchList"
                      variant="underlined"></v-combobox>
        </v-col>
        <v-col cols="6" class="pa-0">
          <v-text-field class="searchValueBox" v-model="searchInfo.keyword" label="Keyword" variant="underlined"
                        required></v-text-field>
        </v-col>
        <v-col cols="2" class="pa-0">
          <v-btn class="mt-3" type="submit" variant="text" @click="emits('handleClickSearch', searchInfo)">Search</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-form>
</template>

<script setup>
  import {ref} from "vue";


  const props = defineProps(['searchList', 'listInfo'])
  const emits = defineEmits(['handleClickSearch'])
  const searchInfo = ref({ searchList: props.searchList, type: props.listInfo.type, keyword: props.listInfo.keyword })
</script>

<style scoped>

</style>
