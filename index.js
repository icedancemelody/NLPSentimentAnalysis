/* 该文件为程序入口
 * 职能：
 *     1. 利用 koa 中间件，把交给控制器
 *     2. 监听端口
 */

const Koa = require('koa')              /* 引入 koa 框架 */
const bodyParser = require('koa-bodyparser')   /* 引入 koa-bodyparser, 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上 */
const cors = require('koa2-cors')
const controller = require('./controller')     /* 引入控制器模块（函数） */
const templating = require('./templating')

const app = new Koa()                          /* 创建 koa 实例 */
app.use(cors())

const isProduction = process.env.NODE_ENV === 'production'     /* 是否是生产环境 */

// log request URL:
app.use(async (ctx, next) => {                  /* 接收到请求的第一个回调函数 */
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)/* 输出请求方式和请求路径 */
    await next()                               /* 调用下一个中间件 */
})

/* 若不是在生产环境，则*/
if (!isProduction) {
    let staticFiles = require('./static-files')
    app.use(staticFiles('/static/', __dirname + '/static'))
}

/* 解析请求体 */
app.use(bodyParser())

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}))

/* 执行控制器 */
app.use(controller())

/* 监听端口 */
const port = process.env.PORT || 3001
app.listen(port)

/* 打印端口 */
console.log("Server running at http://localhost:%d", port)