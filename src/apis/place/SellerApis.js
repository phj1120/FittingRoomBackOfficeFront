import axios from "axios";

const domain = 'http://localhost:8080'

export const getSellerRequestList = async ( listInfo ) => {
  const res = await axios.get(`${ domain }/api/seller/status`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10, id: listInfo.id
    }
  })
  return res.data
}

export const insertSeller = async ( insertSellerData ) => {
  const formData = new FormData();
  formData.append('seName', insertSellerData.seName)
  formData.append('seManager', insertSellerData.seManager)
  formData.append('seId', insertSellerData.seId)
  formData.append('sePassword', insertSellerData.sePassword)
  formData.append('seEmail', insertSellerData.seEmail)
  formData.append('sePhone', insertSellerData.sePhone)
  formData.append('seAddress', insertSellerData.seAddress)
  formData.append('pmNo', insertSellerData.pmNo)
  formData.append('image', insertSellerData.image[0])


  const res = await axios.post(`${domain}/api/seller/register`, formData,{headers: {'Content-Type': 'multipart/form-data'}})
  return res.data
}
