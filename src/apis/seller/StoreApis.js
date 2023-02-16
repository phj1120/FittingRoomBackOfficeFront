import axios from "axios";

const domain = 'http://localhost:8080'

export const insertRequestHistorySeller = async (requestHistoryData) => {
  // const res = await axios.post(`http://localhost:8080/rolling/add`, { 'name': rolling })
  const res = await axios.post(`${domain}/api/seller/store/request`, requestHistoryData)
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

