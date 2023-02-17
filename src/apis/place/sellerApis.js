import axios from "axios";


const domain = 'http://' + window.location.hostname + ':8080'

export const getSellerRequestList = async ( listInfo ) => {
  const res = await axios.get(`${ domain }/api/seller/status`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10, id: listInfo.id
    }
  })
  return res.data
}

export const getPlaceSellerList = async ( listInfo ) => {
  const searchType = {Manager: 'MANAGER', Store: 'STORE'}
  const statusType = {전체: 'ALL', 영업: 'RUNNING', 휴업: 'STOP'}
  const res = await axios.get(`${ domain }/api/seller/list`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10, id: listInfo.id, status: statusType[listInfo.status],
      type: searchType[listInfo.type], keyword: listInfo.keyword
    }
  })
  return res.data
}

export const getSellerStatusTypeList = async () => {
  const res = await axios.get(`${ domain }/api/seller/statusTypeList`)
  return res.data
}
