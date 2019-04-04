'use strict';
const BaseDao = require('../lib/baseDao');
const testModel = require('./testModel.js');
class testDao extends BaseDao {
    constructor() {
        super(testModel);
    }
}
module.exports = testDao;
