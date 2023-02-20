import {defineStore} from "pinia";


const useUtil = defineStore('useUtil', () => {
  const convertDate = ( date ) => {
    if ( !date ) {
      return
    }

    date = new Date(date)
    const year = date.getFullYear()
    const month = ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
    const day = (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate())

    console.log()

    return [year, month, day].join('-')
  }


  return { convertDate }
})


export default useUtil
