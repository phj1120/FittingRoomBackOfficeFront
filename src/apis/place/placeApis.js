import authAxios from "@/apis/common/authAxios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')

export const getPlaceRoomStatus = async ( id ) => {
  const res = await authAxios.get(`${ domain }/api/place/${id}`)
  return res.data
}

export const getPlaceRoomStatusList = async ( listInfo ) => {
  const res = await authAxios.get(`${ domain }/api/room/status/list`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10, id: listInfo.id
    }
  })
  return res.data
}
