// 服务器地址
const serverUrl = `${import.meta.env.VITE_HOST_SERVER}api`;

//创建axios实例
const call = axios.create({
    baseURL: serverUrl,
    timeout: 6000,
});
// 请求拦截方法
let reqInterceptor = (req) => {
    // 请求头带token
    req.headers.set("accessToken", "aaa");
    req.headers.set("refreshToken", "bbb");
    return req;
}
// 响应拦截方法
let resSuccessInterceptor = (res) => {
    return res
}
let resErrorInterceptor = (err) => {
    return err
}
// 请求拦截器
call.interceptors.request.use(reqInterceptor);
//响应拦截器
call.interceptors.response.use(resSuccessInterceptor, resErrorInterceptor);

export const getAPI = (req) => {
    return call.request({
        method: "GET",
        url: '',
        params: req,
        data: ""
    })
}

export const postAPI = (req) => {
    return call.request({
        method: "POST",
        url: '',
        params: "",
        data: req
    })
}