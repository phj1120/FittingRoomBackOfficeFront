<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <h1>영업 상태 변경 신청 페이지</h1>
      <v-container class="container">
        <div class="box">
       <v-select class="boxForm"></v-select>
          <Datepicker
           v-model="picked"

          :locale = "locale"
          :inputFormat="inputFormat"
          />
          <button type="button" @click="getCalValue()">Get Value</button>

        </div>

        <v-text-field class="textareaForm" bg-color="white" color="black"></v-text-field>
      </v-container>

    </v-card>
  </v-col>
</template>

<script setup>
import {reactive, ref} from "vue";
import Datepicker from 'vue3-datepicker';
import {ko} from "date-fns/locale";
const picked = ref(new Date())
const locale = reactive(ko)
const inputFormat = ref('yyyy-MM-dd')
const date = ref('')
console.log( picked.value)

const getCalValue = () => {
  // console.log(refId);
  // console.log(datepicker1.value.input);
  // ref="datepicker1"

 console.log(picked.value.toLocaleDateString().replaceAll(".","-"))
};


</script>

<style scoped>

.textareaForm{

  min-height: 500px;
}
.boxForm{
  max-width: 20rem;

}
.box{
  display: flex;
  justify-content: space-between;
}
.container{
  display: flex;
  flex-direction: column;
}

.pickerStyle {

}
</style>
