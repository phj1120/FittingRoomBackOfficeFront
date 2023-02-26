import authAxios from "@/apis/common/authAxios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':7070' : ':3256')

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

export const insertPlaceRegister = async ( placeInfo ) => {
  const formData = new FormData();
  formData.append('pmName', placeInfo.pmName)
  formData.append('pmBirth', placeInfo.pmBirth)
  formData.append('pmId', placeInfo.pmId)
  formData.append('pmPassword', placeInfo.pmPassword)
  formData.append('pmEmail', placeInfo.pmEmail)
  formData.append('pmPhone', placeInfo.pmPhone)
  formData.append('pmStatus', placeInfo.pmStatus)

  formData.append('roName', placeInfo.roName)
  formData.append('roAddress', placeInfo.roAddress)
  formData.append('roDetailAddress', placeInfo.roDetailAddress)
  formData.append('roPostcode', placeInfo.roPostcode)

  if (placeInfo.images.length != 0) {
    formData.append('thumbnail', placeInfo.thumbnail)

    for (let i = 0; i < placeInfo.images.length; i++) {
      formData.append(`images[${i}]`, placeInfo.images[i])
    }
  }

  const res = await authAxios.post(`${ domain }/api/place/register`, formData, {headers: {'Content-Type' : 'false'}})
  return res.data
}
