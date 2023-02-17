<template>
</template>

<script setup>
import {getImageUrl, getProduct} from "@/apis/product/productApis";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

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


const getProductData = async (prNo) => {
  const result = await getProduct(prNo)
  productInfo.value = result
}

onMounted(() => {
  getProductData(route.params.prNo)
})


</script>

<style scoped>

</style>
