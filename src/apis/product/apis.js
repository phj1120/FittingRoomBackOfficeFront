import axios from "axios";

const domain = 'http://localhost:8080'

/**
 * 상품 조회 API
 **/
export const getProduct = async (prNo) => {
  const res = await axios.get(`${domain}/api/seller/product/${prNo}`)
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
  const res = await axios.put(`${domain}/api/seller/product/${productInfo.prNo}`, formData,
    {headers: {'Content-Type': 'false'}})

  return res.data
}

/**
 * 카테고리 조회 API
 **/
export const getCategories = async () => {
  const res = await axios.get(`${domain}/api/seller/product/categories`)
  return res.data
}

