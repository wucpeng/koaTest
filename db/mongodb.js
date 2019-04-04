'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise; //global.Promise;
const testDbLink = require('../config/config.js').testDbLink; //"mongodb://wucpeng:123456@192.168.0.2:27017/testdb";
const dbOptions = {
    useNewUrlParser: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE, //30,
    reconnectInterval: 500,
    poolSize: 10,
    connectTimeoutMS: 1000,
    autoReconnect: true
};
exports.testDb = mongoose.createConnection(testDbLink, dbOptions);
//module.exports = testDb;


// mongoose.connect(testDbLink, dbOptions);
// const con = mongoose.connection;
// con.on('error', err=> console.error('连接数据库失败', err));
// con.once('open',()=>{
//     //成功连接
//     console.log('connect success');
// });
//
// exports.getTestDb = async ()=> {
//     let testDb = await mongoose.connect(testDbLink, dbOptions);
//     return testDb;
// };

//(async ()=> {
//    exports.testDb = await mongoose.connect(testDbLink, dbOptions);
//    //const testSchema = new mongoose.Schema({
//    //    name: {type: String},
//    //    height: Number,
//    //    weight: Number
//    //});
//    //testSchema.index({name: 1, weight: 1});
//    //const testModel = testDb.model('Test', testSchema, "test");
//    //testModel.find((error, result)=> {
//    //    console.log('find1', error, result);
//    //});
//})();

//const Schema = mongoose.Schema;
//const testSchema = new Schema({
//    name: {type: String},
//    height: Number,
//    weight: Number
//});
//testSchema.index({name: 1, weight: 1});
//const testModel = db.model('Test', testSchema, "test");
//testModel.find((error, result)=> {
//    console.log('find1', error, result);
//});