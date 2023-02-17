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
