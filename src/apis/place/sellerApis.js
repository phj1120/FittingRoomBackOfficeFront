import authAxios from "@/apis/common/authAxios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':7070' : ':3256')

export const getSellerRequestList = async ( listInfo ) => {
  const res = await authAxios.get(`${ domain }/api/seller/status`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10
    }
  })
  return res.data
}

export const getPlaceSellerList = async ( listInfo ) => {
  const searchType = {Manager: 'MANAGER', Store: 'STORE'}
  const statusType = {전체: 'ALL', 영업: 'RUNNING', 휴업: 'STOP'}
  const res = await authAxios.get(`${ domain }/api/seller/list`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10, status: statusType[listInfo.status],
      type: searchType[listInfo.type], keyword: listInfo.keyword
    }
  })
  return res.data
}

export const getSellerRequestSearchList = async ( listInfo ) => {
  const res = await authAxios.get(`${ domain }/api/seller/history`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10,
      type: listInfo.type, status: listInfo.status, toDate: listInfo.toDate, fromDate: listInfo.fromDate
    }
  })
  return res.data
}

export const getSellerStatusTypeList = async () => {
  const res = await authAxios.get(`${ domain }/api/seller/statusTypeList`)
  return res.data
}
