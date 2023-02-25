<template>
  <v-col cols="12">
    <v-table class="ma-4 border">
      <tbody>
        <tr>
          <th class="text-center bg-blue">판매점</th>
          <td class="">{{ props.requestDetail.seName }}</td>
          <th class="text-center bg-blue">이메일</th>
          <td class="">{{ props.requestDetail.seEmail }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">담당자</th>
          <td>{{ props.requestDetail.seManager }}</td>
          <th class="text-center bg-blue">연락처</th>
          <td>{{ props.requestDetail.sePhone }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">판매점 주소</th>
          <td colspan="3">{{ props.requestDetail.seAddress }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">요청항목</th>
          <td>{{ props.requestDetail.rhContent }}</td>
          <th class="text-center bg-blue">요청상태</th>
          <td>{{ props.requestDetail.rhStatus }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">요청일자</th>
          <td>{{ props.requestDetail.rhCreateDt }}</td>
          <th class="text-center bg-blue">시행일자</th>
          <td class="text-red font-weight-bold">{{ props.requestDetail.rhStartDt || '해당 사항 없음' }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">첨부파일</th>
          <td colspan="3"></td>
        </tr>
      </tbody>
    </v-table>
    <v-textarea class="ma-4" label="요청 사유" v-model="props.requestDetail.rhReason" variant="solo" readonly></v-textarea>
    <v-textarea class="ma-4" label="거절 사유" variant="solo" v-model="reason" v-if="signDetail.signYn" @update:modelValue="emits('handleChangeReason', reason)"></v-textarea>
  </v-col>
</template>

<script setup>
  import {ref} from "vue";


  const props = defineProps(['requestDetail', 'signDetail'])
  const emits = defineEmits(['handleChangeReason'])
  const reason = ref(null)
  const signDetail = ref(props.signDetail)



</script>

<style scoped>

</style>
