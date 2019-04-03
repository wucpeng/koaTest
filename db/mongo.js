'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise; //global.Promise;
const testDbLink = "mongodb://wucpeng:123456@127.0.0.1:27017/testDb";
//exports.testDb = null;
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

exports.getTestDb = async ()=> {
    let testDb = await mongoose.connect(testDbLink, dbOptions);
    return testDb;
};

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