'use strict';
const Router = require('koa-router');
const {log} = require('../utils/log4js.js');
const CONFIG = require('../config/config.js');

const baseRouter = new Router({prefix: '/2'});
baseRouter.get('/', ctx => {
    //throw "error test";
    log.debug('test body', process.pid);
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});

baseRouter.get('/signin', ctx => {
    log.debug('test signin get');
    ctx.body = "I am okay get\n";
});

baseRouter.post('/signin', ctx => {
    log.debug('test signin post');
    log.debug(CONFIG);
    ctx.body = "I am okay post\n";
});

const clientApp = new Router({prefix: '/app'});

clientApp.get('/data', ctx=> {
    console.log(ctx.url);
    //throw 'test mid err';
    ctx.body = "test step router\n";
});

baseRouter.use(clientApp.routes(), clientApp.allowedMethods());
exports.baseRouter = baseRouter;