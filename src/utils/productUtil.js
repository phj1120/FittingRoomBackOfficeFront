const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':7070' : ':3256')

/**
 * 이미지 조회
 **/
export const getImageUrl = (path) => {
  return `${domain}
  /image/${path}`
}

/**
 * localDateTime -> localDate
 **/
export const convertLocalDate = ((localDateTime) => {
  if (!localDateTime) return null

  const date = new Date(localDateTime)
  const localDate = date.getFullYear() +
    "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) +
    "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString())

  return localDate
})
