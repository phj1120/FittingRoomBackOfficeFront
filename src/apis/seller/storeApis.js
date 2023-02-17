import axios from "axios";

const domain = 'http://localhost:8080'

export const insertRequestHistorySeller = async (requestHistoryData) => {
  const res = await axios.post(`${domain}/api/seller/store/request`, requestHistoryData)
  return res.data
}

export const insertRequestAnswer = async ( requestHistory ) => {
  const res = await axios.post(`${domain}/api/seller/answer`, requestHistory)
  return res.data
}
