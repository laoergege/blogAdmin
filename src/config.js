 // api 服务器地址
const addr =  process.env.API_ROOT;

export default {
    // api 服务器地址
    APIADDR: addr,

    // markbooks
    markboos: `${addr}/markbooks`,

    uploadSize: 1 // 单位 MB
}