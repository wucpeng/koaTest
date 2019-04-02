'use strict';
const {resLogger} = require('../utils/log4js.js');
exports.midLog4jsRes = async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    resLogger(ctx, ms);
};

