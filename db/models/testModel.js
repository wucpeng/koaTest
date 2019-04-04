'use strict';
const {Schema} = require('mongoose');
const {testDb} = require('../mongodb.js');
/**
 * 操作 MongoDb 时需要创建两个文件 model.js 和 modelDao.js
 *
 * 一. 对于 Model.js 以下几部分：
 * 1. Schema 必要
 * 2. plugin 可选
 * 3. hook 可选
 * 4. 调用 testDb.model() 创建 Model，此处注意，Model 名称与 js 文件名一样，但首字母大写
 *
 * 二. 对于 testDao.js
 * 我们需要声明一个 testDao 的 class 继承自 BaseDao， BaseDao 中包含基本的 crud 操作，也可以根据需求自行定义
 *
 * 三. 外部使用
 * var dao = new testDao()
 * dao.crud();
 */
const testSchema = new Schema({
    // name: {type: String},
    // height: Number,
    // weight: Number
    title: String,
    author: String,
    isbnNo: String,
    author1: String
});
testSchema.index({name: 1, weight: 1});

/**
 * 参数一要求与 Model 名称一致
 * 参数二为 Schema
 * 参数三为映射到 MongoDB 的 Collection 名
 */
let testModule = testDb.model(`Test`, testSchema, 'book');
module.exports = testModule;


/**
 * 配置 plugin
 */
// (function () {
//     let plugin = require('./plugin');
//     testSchema.plugin(plugin.createdAt);
//     testSchema.plugin(plugin.updatedAt);
// })();


/**
 * 配置 hook
 */
// (function () {
//     testSchema.pre('update', function (next) {
//         console.log('pre update');
//         next();
//     });
//
//     testSchema.post('update', function (result, next) {
//         console.log('post update', result);
//         next();
//     });
//
//     testSchema.pre('save', function (next) {
//         console.log('--------pre1------');
//         next();
//     });
//
//     testSchema.pre('save', function (next) {
//         console.log('--------pre2------');
//         next(); // 如果有下一个 pre(), 则执行下一个 pre(), 否则 执行 save()
//     });
//     testSchema.post('save', function (result, next) {
//         console.log('---------post1----------', result);
//         next();
//     });
//
//     testSchema.post('save', function (result, next) {
//         console.log('---------post2----------', result);
//         next(); // 如果有下一个 post(), 则执行下一个 post(), 否则 结束
//     });
// })();

