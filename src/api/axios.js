import axios from "axios";
import { Message } from "element-ui";
import store from "../store/index";
import router from "../router/index";


const BASE_URL = 'https://www.amzshop-us.uk/api.php/'
// 创建axios实例
const service = axios.create({
    baseURL: BASE_URL, // api的base_url
    // timeout: 5000 // 请求超时时间
});

// export function get(url, query) {
//     return service({
//         method: 'get', url: url, params: query
//     });
// }

// export function post(url, body) {
//     return service({
//         method: 'post', url: url,headers:{'Content-Type':'application/json;charset=UTF-8'}, data: body
//     });
// }

 // get请求
 export  function get(url, data) {
    return request(url, 'GET', data)
}
  // post请求
export function post(url, data) {
    return request(url, 'POST', data)
}

function request(url, method, data) {
    return new Promise((resolve, reject) => { 
        const options = {
            url,
            method,
            data
          }
        service(options)
          .then(res => {
            // console.log('返回数据66666', res)
            resolve(res)
          })
          .catch(error => {
            
            console.error(error)
            // reject()
          })
    })
  }

// request拦截器
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (store.getters.adminId && store.getters.token) {
            config.headers["X-Adminid"] = store.getters.adminId;
            config.headers["X-Token"] = store.getters.token;
        }
        return config;
    },
    error => {
        // Do something with request error
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        const data = response.data;
        if (data.code) {
            //2重新登陆 408需要登陆 409观看次数超，请开通会员，410修改密码失效，手机号或者密码错误 411没有此用户 412参数异常
            if (data.code === 2) {
                store.dispatch("fedLogout").then(() => {
                    Message.error(data.msg);
                    setTimeout(()=>{
                        router.push({
                            path: "/login",
                            query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转过来
                        });
                    },1500)
                });
            }else if(data.code == 408){
                Message.error("请重新登录后使用！");
                router.push({
                    path: "/login",
                    query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转过来
                });
            }else if(data.code==409){
                Message.error("您已超过限免次数，请开通会员后后使用！");
                router.push({
                    path: "/right",
                    query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转过来
                });
            }else if(data.code==410){
                Message.error("手机号或者密码错误，请重新登陆！");
                router.push({
                    path: "/login",
                    query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转过来
                });
            }else if(data.code==411){
                Message.error("您输入的账号有误！没有此用户");
                router.push({
                    path: "/login",
                    query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转过来
                });
            }
        }
        return data;
    },
    error => {
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
