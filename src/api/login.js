/**
 * Created by lk on 17/6/4.
 */
import axios from "./axios";
// 获取信息
export function userInfo(id, token) {
    return axios({
        url: "/admin/auth/login/userInfo",
        method: "get",
        params: { id, token }
    });
}

export function loginName(email, password) {
    return axios({
        url: "/shop/login?lang=en-us",
        method: "post",
        data: { email, password }
    });
}

export function logout(uid, token) {
    return axios({
        url: "/common/loginout?lang=en-us",
        method: "post",
        data: { uid, token }
    });
}

export function password(data) {
    return axios({
        url: "/admin/auth/login/password",
        method: "post",
        data: data
    });
}
