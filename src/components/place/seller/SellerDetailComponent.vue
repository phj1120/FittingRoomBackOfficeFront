<template>
  <v-col cols="12">
    <v-table class="ma-4 border">
      <tbody>
        <tr>
          <th class="text-center bg-blue">판매점</th>
          <td >{{ sellerDetail.seName }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">담당자</th>
          <td >{{ sellerDetail.seManager }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">연락처</th>
          <td >{{ sellerDetail.sePhone }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">이메일</th>
          <td >{{ sellerDetail.seEmail }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">주소</th>
          <td >{{ sellerDetail.seAddress }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">상태</th>
          <td>{{ sellerDetail.seStatus }}</td>
        </tr>
        <tr>
          <th class="text-center bg-blue">시작일</th>
          <td>{{ sellerDetail.seCreateDt }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-col>
</template>

<script setup>
  const props = defineProps(['sellerDetail'])
</script>

<style scoped>

</style>
