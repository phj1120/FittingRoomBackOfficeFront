import axios from "axios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')

// userInfo:{memberId:null, password:null, type: null} type: place, seller
export const signIn = async (userInfo) => {
  const loginInfo = {
    memberId: userInfo.type.charAt(0) + '_' + userInfo.memberId,
    password: userInfo.password
  }

  const res = await axios.post(`${domain}/api/sign-in`, loginInfo)
  return res.data
}