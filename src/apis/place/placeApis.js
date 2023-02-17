import axios from "axios";

const domain = 'http://' + window.location.hostname + ':8080'

export const getPlaceRoomStatus = async ( id ) => {
  const res = await axios.get(`${ domain }/api/place/${id}`)
  return res.data
}

export const getPlaceRoomStatusList = async ( listInfo ) => {
  const res = await axios.get(`${ domain }/api/room/status/list`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10, id: listInfo.id
    }
  })
  return res.data
}
