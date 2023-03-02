
import axios from "axios";
import authAxios from "@/apis/common/authAxios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':7070' : ':3256')


/**
 * 예약관리 apis
 * 작성자 : 주호승
 * 일시 : 2023-02-22
 * 버전 : v1
 **/


export const getReservationListApi = async ( listInfo ) => {
  const res = await authAxios.get(`${ domain }/api/reservation/list`, {
    params: {
      page: listInfo.page || 1, size: listInfo.size || 10
    }
  })

  console.log(res.data)
  return res.data
}

export const getProductListApi = async (datas) => {
  console.log(datas)
  const res = await authAxios.get(`${ domain }/api/reservation/detail`, {
    params: {
      caNo: datas.caNo
    }
  } )
  console.log(res.data)
  return res.data
}

export const modifyProductApi = async (datas) => {
  console.log(datas)
  const res = await authAxios.put(`${ domain }/api/reservation/detail/modify`,datas)
  console.log(res.data)
  return res.data
}


