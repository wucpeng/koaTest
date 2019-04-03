'use strict';
const Router = require('koa-router');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const {log, errLogger} = require('./utils/log4js.js');
const midWare = require('./routes/midWare.js');
const {baseRouter} = require('./routes/api.js');

app.use(midWare.midLog4jsRes);
app.use(koaBody());
app.use(midWare.midParamsBody);

const router = new Router();
router.get('/', (ctx) => {
    ctx.redirect('/2');
    ctx.status = 301;
});
app.use(router.routes());
app.use(baseRouter.routes(), baseRouter.allowedMethods());

app.on('error', (err, ctx) => {
    errLogger(ctx, err);
    log.error('server error', err);
});
module.exports = app;
if (!module.parent) {
    app.listen(4000); // == http.createServer(app.callback()).listen(4000);
    console.log('server listen 4000');
}
