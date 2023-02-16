<template>
  <v-col cols="12">
    <v-card color="grey-darken-2" min-height="85vh">
      <v-card>
        <v-col cols="2">
          <v-card color="blue" class="pt-2 pb-2">
            <h1 class="text-white text-center">요청 현황</h1>
          </v-card>
        </v-col>
        <v-table class="ma-4">
          <thead>
          <tr class="bg-amber-accent-2">
            <th class="text-center font-weight-bold">종류</th>
            <th class="text-center font-weight-bold">스토어</th>
            <th class="text-center font-weight-bold">담당자</th>
            <th class="text-center font-weight-bold">등록일</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="history, index in historyList" :key="history.pmNo">
            <td class="text-center">{{ history.rhContent }}</td>
            <td class="text-center">{{ history.rhReason }}</td>
            <td class="text-center">{{ history.rhStatus }}</td>
            <td class="text-center">{{ history.rhCreateDt }}</td>
          </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-card>
  </v-col>
</template>

<script setup>

</script>

<style scoped>

</style>
