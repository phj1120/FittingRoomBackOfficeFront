import axios from "axios";

const domain = 'http://localhost:8080'
/**
 * 영업관리 apis
 * 작성자 : 주호승
 * 일시 : 2023-02-17
 * 버전 : v1
 **/
export const insertRequestHistorySeller = async (requestHistoryData) => {
  const res = await axios.post(`${domain}/api/seller/store/request`, requestHistoryData)
  return res.data
}

export const updateRequestHistorySeller = async (requestHistoryData) => {
  // const res = await axios.post(`http://localhost:8080/rolling/add`, { 'name': rolling })
  const res = await axios.put(`${domain}/api/seller/store/status`, requestHistoryData)
  return res.data
}

export const getStoreStatus = async ( id ) => {
  const res = await axios.get(`${ domain }/api/seller/store/status/${id}`)
  return res.data
}

export const getStoreStatusList = async ( listInfo ) => {
  const res = await axios.get(`${ domain }/api/seller/store/status`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10, id: listInfo.id
    }
  })
  return res.data
}


export const insertRequestAnswer = async ( requestHistory ) => {
  const res = await axios.post(`${domain}/api/seller/answer`, requestHistory)
  return res.data
}
