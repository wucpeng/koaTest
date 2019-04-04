'use strict';
const TestDao = require('./models/testDao');
const exportData = {
    testDao: new TestDao()
};
module.exports = exportData;

