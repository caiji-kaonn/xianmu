// 这里是用于处理axios的请求拦截插件配置--校验当前的用户名是否有效
import {Message} from 'element-ui'

export default ({$axios})=>{
$axios.onError(res=>{
    // console.log(res.response)
    const{statusCode,message}=res.response.data
    if(statusCode===400){
        Message.error(message)
    }
})
}