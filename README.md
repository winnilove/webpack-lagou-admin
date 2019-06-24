# webpack-lagou-admin
webpack搭建后台管理系统

## 环境搭建

npm install

## 服务器

yarn start

## 后台前端

yarn serve


## 架构

1. 前后端分离的架构

2. http(s)

- ajax

1. 接口

- url
- request(header,body)
- response(header,body<json>)
- type(get,post,put,patch,delete)
- content-type(formdata,json)

1. mock

- http-proxy-middleware

一 、前端

1. RMVC
2. UI框架(基于bootstrap/adminLTE)
3. jQuery
4. SEMRouter
5. Model
6. Handlebars
7. Webpack(前端工程化)

二 、后端

- 技术层面

1. RMVC
2. Node.js + Express
3. R：Express 路由中间件
4. M：MongoDB+Mongoose(驱动，定义数据结构)
5. V：EJS
6. C：Express(业务中间件(res,req,next),next为了中间栈)

- 登录注册

1. cookie-session
   - cookie容易被钓鱼
   - 在服务器端存储数据
   - cookie存储数据有限
2. token(oAuth2)
   - 登录成功，记录用户登录状态（因为http不会记录状态）
   - 在后端生产token
     - jsonwebtoken：
       - 对称
       - 非对称（自己生成公钥和私钥）
       - 通过header 将token传递给前端
       - 前端存储在localstrage里
       - 当需要鉴权的时候，前端将token再通过header传递给后端
       - 后端进行认证
     - 优点：
       - 不需要后端存储数据
       - 非对称加密，无法破解
     - 缺点：
       - 重放攻击



- 路由导航
  1. 组件（标签，元素）导航
  2. 编程式导航（router.go）



