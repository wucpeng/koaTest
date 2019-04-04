'use strict';
const dbProxy = require('../../db/dbProxy');
const {log} = require('../../utils/log4js');

exports.login = async (ctx)=> {
    log.info('login', ctx.paramInfo);
    let body = await dbProxy.testDao.findById("5ca56a70c020166b111851c9");
    log.debug('login body', body);
    ctx.body = "login success\n";
};
