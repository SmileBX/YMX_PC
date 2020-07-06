//可借助window.sessionStorage.setItem('token',res.data.Token),window.sessionStorage.getItem('token'),window.sessionStorage.clear(),
import Cookies from "js-cookie";
/**
 * 存储localStorage
 */
export const setStore = (name, content, expireDay) => {
    if (!name) return;
    if (typeof content !== "string") {
        content = JSON.stringify(content);
    }
    Cookies.set(name, content, { expires: expireDay });
};

/**
 * 获取localStorage
 */
export const getStore = name => {
    // console.log(name,"name22222222222222")
    if (!name) return;
    let content = Cookies.get(name);
    // console.log(content,"333333333333333333333")
    try {
        content = JSON.parse(content);
        return content;
    } catch (e) {
        return content;
    }
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    Cookies.remove(name);
};
