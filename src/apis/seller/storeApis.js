
import axios from "axios";
import authAxios from "@/apis/common/authAxios";

const domain = 'http://localhost:7070'

/**
 * 영업관리 apis
 * 작성자 : 주호승
 * 일시 : 2023-02-17
 * 버전 : v1
 **/
export const insertRequestHistorySeller = async (requestHistoryData) => {
  const res = await authAxios.post(`${domain}/api/seller/store/request`, requestHistoryData)
  return res.data
}

export const updateRequestHistorySeller = async (requestHistoryData) => {
  // const res = await authAxios.post(`http://localhost:7070/rolling/add`, { 'name': rolling })
  // const res = await axios.post(`http://localhost:7070/rolling/add`, { 'name': rolling })

  const res = await authAxios.put(`${domain}/api/seller/store/status`, requestHistoryData)
  return res.data
}

export const getStoreStatus = async ( id ) => {
  const res = await authAxios.get(`${ domain }/api/seller/store/status/${id}`)
  return res.data
}

export const getStoreStatusList = async ( listInfo ) => {
  const res = await authAxios.get(`${ domain }/api/seller/store/status`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10, id: listInfo.id
    }
  })
  return res.data
}


export const insertRequestAnswer = async ( requestHistory ) => {
  const res = await authAxios.post(`${domain}/api/seller/answer`, requestHistory)
  return res.data
}
