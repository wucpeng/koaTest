'use strict';
const fs = require('fs');
const _ = require('underscore');
const CONFIG = {
    testDbLink: "mongodb://wucpeng:123456@192.168.0.2:27017/testdb"
};
(()=> {
    try {
        if (process.env.NODE_ENV == 'production') {
            _.extend(CONFIG, JSON.parse(fs.readFileSync(__dirname + '/env_prod.json')));
        } else {
            _.extend(CONFIG, JSON.parse(fs.readFileSync(__dirname + '/env_dev.json')));
        }
    } catch (e) {
        console.log('init config catch err', e);
        process.exit(-1);
    }
})();
module.exports = CONFIG;
