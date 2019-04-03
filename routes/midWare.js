'use strict';
const _ = require('underscore');
const {resLogger, errLogger, log} = require('../utils/log4js.js');
exports.midLog4jsRes = async (ctx, next) => {
    try {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        resLogger(ctx, ms);
    } catch (e) {
        errLogger(ctx, e);
        // todo ctx status and message
    }
};

exports.midParamsBody = async (ctx, next)=> {
    let {body, query, params} = ctx.request;
    let paramInfo = {};
    if (ctx.method == "GET") {
        _.extend(paramInfo, params, query);
    } else {
        _.extend(paramInfo, body, params, query);
    }
    ctx.paramInfo = paramInfo;
    await next();
};
