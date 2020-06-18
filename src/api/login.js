/**
 * Created by lk on 17/6/4.
 */
import axios from "../utils/axios";
// 获取信息
export function userInfo(id, token) {
    return axios({
        url: "/admin/auth/login/userInfo",
        method: "get",
        params: { id, token }
    });
}

export function loginName(accountNumber, password) {
    return axios({
        url: "/user/login",
        method: "post",
        data: { accountNumber, password }
    });
}

export function logout(uid, token) {
    return axios({
        url: "/admin/auth/login/out",
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
