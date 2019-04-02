'use strict';

const Router = require('koa-router');
const Koa = require('koa');
const http = require('http');
const koaBody = require('koa-body');
const app = new Koa();
const log4 = require('./utils/log4js.js');
const midWare = require('./routes/midWare.js');
const logger = require('./utils/log.js');
const log4js = require('log4js');

app.use(log4js.connectLogger(logger, {format:':method :url :status :res[content-length] - :response-time ms :remote-addr'}));
logger.setLevel('DEBUG');
app.use(midWare.midLog4jsRes);
app.use(koaBody());

const router = new Router();
router.get('/', (ctx) => {
    ctx.redirect('/2');
    ctx.status = 301;
});
app.use(router.routes());
const baseRouter = new Router({prefix: '/2'});
app.use(baseRouter.routes());
baseRouter.get('/', ctx => {
    //throw "error test";
    console.log('test body', process.pid);
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});
//app.post = 4000;
//app.title = "testKoa";
app.on('error', (err, ctx) => {
    log4.errLogger(ctx, err);
    console.error('server error', err);
});
module.exports = app;
if (!module.parent) {
    app.listen(4000); // == http.createServer(app.callback()).listen(4000);
    console.log('server listen 4000');
}


//let mid1 = async (ctx, next) => {
//    await next();
//    const rt = ctx.response.get('X-Response-Time');
//    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
//};
//let mid2 = async (ctx, next)=> {
//    const start = Date.now();
//    await next();
//    const ms = Date.now() - start;
//    ctx.set('X-Response-Time', `${ms}ms`);
//};
//let helloWord = (ctx)=> ctx.body = "Hello World";

//app.use(mid1);
//app.use(mid2);
//app.use(helloWord);

