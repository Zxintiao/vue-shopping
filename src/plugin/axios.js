import axios from 'axios'

export default axios.create({
    baseURL: 'http://vebcoder.cn:9527/api'
})