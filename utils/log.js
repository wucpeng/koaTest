'use strict';
const log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console', category: "console"},
        {
            type: 'dateFile',
            filename: __dirname + '/../log4js/log.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: 'normal'
        }
    ]}
);
let logger = log4js.getLogger('normal');
module.exports = logger;