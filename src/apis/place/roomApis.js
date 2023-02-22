import authAxios from "@/apis/common/authAxios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')


export const insertRoomRequest = async ( request ) => {
  const requestList = {
    rhContent: request.itemValue, rhStartDt: request.startDt, rhReason: request.reason, rhStatus: '대기'
  }

  const res = await authAxios.post(`${ domain }/api/room/request`, requestList)
  return res.data
}

export const updateRoomRequest = async ( request ) => {
  const res = await authAxios.put(`${ domain }/api/room/request/list`, request)
  return res.data
}

export const getRoomRequest = async () => {
  const res = await authAxios.get(`${ domain }/api/room/request/list`)
  return res.data
}
