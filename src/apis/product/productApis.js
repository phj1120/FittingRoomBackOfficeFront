import axios from "axios";
import authAxios from "@/apis/common/authAxios";

const domain = 'http://localhost:8080'

/**
 * 상품 조회 API
 **/
export const getProduct = async (prNo) => {
  const res = await authAxios.get(`${domain}/api/seller/product/${prNo}`)
  return res.data
}


/**
 *  상품 목록 조회 API
 **/
export const getProductList = async (pageSearch) => {
  let params = {};

  // 사용자
  params.seNo = pageSearch.seNo

  // 페이징
  params.size = pageSearch.size || 10
  params.page = pageSearch.page || 1

  // 검색 조건이 있으면 (types, keyword)
  if (pageSearch.types && pageSearch.types.length !== 0
    && pageSearch.types.values() && pageSearch.keyword) {
    params.keyword = pageSearch.keyword
    params.types = pageSearch.types.join(',')
  }

  // 날짜 제한이 있으면 (startDt, endDt)
  if (pageSearch.startDt && pageSearch.endDt) {
    params.startDt = pageSearch.startDt
    params.endDt = pageSearch.endDt
  }

  const res = await authAxios.get(`${domain}/api/seller/product/list`, {
    params: params
  });

  return res.data
}


/**
 * 상품 추가 API
 **/
export const insertProduct = async (productInfo) => {
  const formData = new FormData();
  formData.append('prName', productInfo.prName)
  formData.append('prBrand', productInfo.prBrand)
  formData.append('prPrice', productInfo.prPrice)
  formData.append('prcNo', productInfo.prcNo)
  formData.append('prStatus', productInfo.prStatus)

  if (productInfo.topFiles.length != 0) {
    formData.append('thumbnailIndex', productInfo.thumbnailIndex)

    for (let i = 0; i < productInfo.topFiles.length; i++) {
      formData.append(`topFiles[${i}]`, productInfo.topFiles[i])
    }
  }

  if (productInfo.bottomFiles.length != 0) {
    formData.append('thumbnailIndex', productInfo.thumbnailIndex)

    for (let i = 0; i < productInfo.bottomFiles.length; i++) {
      formData.append(`bottomFiles[${i}]`, productInfo.bottomFiles[i])
    }
  }

  const res = await axios.post(`${domain}/api/seller/product`, formData,
    {headers: {'Content-Type': 'false'}})

  return res.data
}

/**
 * 상품 수정 API
 **/
export const updateProduct = async (productInfo) => {
  const formData = new FormData();
  formData.append('prName', productInfo.prName)
  formData.append('prBrand', productInfo.prBrand)
  formData.append('prPrice', productInfo.prPrice)
  formData.append('prcNo', productInfo.prcNo)
  formData.append('prStatus', productInfo.prStatus)

  if (productInfo.topFiles.length != 0) {
    formData.append('thumbnailIndex', productInfo.thumbnailIndex)

    for (let i = 0; i < productInfo.topFiles.length; i++) {
      formData.append(`topFiles[${i}]`, productInfo.topFiles[i])
    }
  }

  if (productInfo.bottomFiles.length != 0) {
    formData.append('thumbnailIndex', productInfo.thumbnailIndex)

    for (let i = 0; i < productInfo.bottomFiles.length; i++) {
      formData.append(`bottomFiles[${i}]`, productInfo.bottomFiles[i])
    }
  }
  const res = await authAxios.put(`${domain}/api/seller/product/${productInfo.prNo}`, formData,
    {headers: {'Content-Type': 'false'}})

  return res.data
}

/**
 * 상품 상태 일괄 변경 API
 **/
export const updateProductStatusAtOnce = async (status, products) => {
  console.log(`[Product Apis] getChangeStatusAtOnce`)
  console.log(status)
  console.log(products)

  const res = await authAxios.put(`${domain}/api/seller/product/status`, {
    prNos: products,
    prStatus: status
  });

  console.log(res.data)
  return res.data
}


/**
 * 카테고리 조회 API
 **/
export const getCategories = async () => {
  const res = await authAxios.get(`${domain}/api/seller/product/categories`)
  return res.data
}

/**
 * 판매 상품 조회 API
 **/
export const getSellProduct = async (prNo) => {
  const res = await authAxios.get(`${domain}/api/seller/sellproduct/${prNo}`)
  return res.data
}

/**
 * 판매 상품 등록 API
 **/
export const insertSellProduct = async (sellProductInfo) => {
  const params = {}
  params.spSize = sellProductInfo.spSize
  params.spStatus = sellProductInfo.spStatus
  const res = await authAxios.post(`${domain}/api/seller/sellproduct/${sellProductInfo.prNo}`, params)
  return res.data
}

/**
 * 판매 상품 수정 API
 **/
export const updateSellProduct = async (sellProductInfo) => {
  const params = {}
  params.spSize = sellProductInfo.spSize
  params.spStatus = sellProductInfo.spStatus
  const res = await authAxios.put(`${domain}/api/seller/sellproduct/${sellProductInfo.spNo}`, params)
  return res.data
}

/**
 * 판매 상품 삭제 API
 **/
export const deleteSellProduct = async (spNo) => {
  const res = await authAxios.delete(`${domain}/api/seller/sellproduct/${spNo}`)
  return res.data
}

