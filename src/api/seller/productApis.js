import axios from "axios";

const domain = 'http://localhost:8080'

export const getProductList = async (pageSearch) => {
  console.log(`[Product Apis] getProductList`)
  console.log(pageSearch);

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
    params.startDt = convertLocalDate(new Date(pageSearch.startDt))
    params.endDt = convertLocalDate(new Date(pageSearch.endDt))
  }

  const res = await axios.get(`${domain}/api/seller/product/list`, {
    params: params
  });

  console.log(res.data)
  return res.data
}

export const updateProductStatusAtOnce = async (status, products) => {
  console.log(`[Product Apis] getChangeStatusAtOnce`)
  console.log(status)
  console.log(products)

  const res = await axios.put(`${domain}/api/seller/product/status`, {
    prNos: products,
    prStatus: status
  });

  console.log(res.data)
  return res.data
}

const convertLocalDate = ((localDateTime) => {
  const localDate = localDateTime.getFullYear() +
    "-" + ((localDateTime.getMonth() + 1) > 9 ? (localDateTime.getMonth() + 1).toString() : "0" + (localDateTime.getMonth() + 1)) +
    "-" + (localDateTime.getDate() > 9 ? localDateTime.getDate().toString() : "0" + localDateTime.getDate().toString())

  return localDate
})

