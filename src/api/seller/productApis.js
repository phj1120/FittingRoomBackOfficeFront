import axios from "axios";

const domain = 'http://localhost:8080'

export const getSellProduct = async (prNo) => {
  const res = await axios.get(`${domain}/api/seller/sellproduct/${prNo}`)

  return res.data
}

export const getProductList = async (pageSearch) => {
  console.log(`[Product Apis] getProductList`)
  console.log(pageSearch);

  let params = {
    seNo: pageSearch.seNo,
    size: pageSearch.size, page: pageSearch.page,
  }

  // 검색 조건이 있으면 (types, keyword)
  if (pageSearch.types && pageSearch.types.length !== 0
    && pageSearch.types.values() && pageSearch.keyword) {
    params.keyword = pageSearch.keyword
    params.types = pageSearch.types.join(',')
  }

  const res = await axios.get(`${domain}/api/seller/product/list`, {
    params: params
  });

  console.log(res.data)
  return res.data
}



