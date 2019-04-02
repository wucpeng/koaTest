'use strict';
const log = require('../utils/log4js.js');


exports.midLog4jsRes = async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    log.resLogger(ctx, ms);
};

