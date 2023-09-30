import axios from 'axios'

const instance = axios.create({
    validateStatus: function(status){
      return status>=200 && status < 500;
    },
})

export default instance