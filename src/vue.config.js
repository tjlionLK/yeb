let proxyObj={}
proxyObj['/']={
    WS:false,
    target:"http://localhost:8081",
    changeOrigin: true,
    //不重写请求地址
    pathReWrite:{
        '^/':'/'
    }
}
module.exports={
    devServer:{
        host: 'localhost',
        port: 8080,
        proxy:proxyObj
    }
}