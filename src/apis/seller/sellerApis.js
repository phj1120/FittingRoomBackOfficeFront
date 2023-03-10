import axios from "axios";
import authAxios from "@/apis/common/authAxios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':7070' : ':3256')
/**
 * 판매자 apis
 * 작성자 : 주호승
 * 일시 : 2023-02-17
 * 버전 : v1
 **/
export const insertSeller = async ( insertSellerData ) => {
  const formData = new FormData();
  formData.append('seName', insertSellerData.seName)
  formData.append('seManager', insertSellerData.seManager)
  formData.append('seId', insertSellerData.seId)
  formData.append('sePassword', insertSellerData.sePassword)
  formData.append('seEmail', insertSellerData.seEmail)
  formData.append('sePhone', insertSellerData.sePhone)
  formData.append('seAddress', insertSellerData.seAddress)
  formData.append('pmNo', String(insertSellerData.pmNo))
  formData.append('image' ,insertSellerData.image[0])


  const res = await axios.post(`${ domain }/api/seller/register`,formData,
    {headers: {'Content-Type': 'false'}})
  return res.data
}

export const getProfileSeller = async () => {
  const res = await authAxios.get(`${ domain }/api/seller/profile`)
  console.log(res.data)
  return res.data
}

export const modifyProfileSeller = async (profileData) => {
  const res = await authAxios.put(`${ domain }/api/seller/profile`,profileData)
  console.log(res.data)
  return res.data
}
