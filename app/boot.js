'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise; //global.Promise;
const Schema = mongoose.Schema;
const testDbLink = "mongodb://wucpeng:123456@192.168.0.2:27017/testdb";

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
const testDb = mongoose.createConnection(testDbLink, dbOptions);
//console.log(testDb);

const testSchema = new Schema({
    name: {type: String},
    height: Number,
    weight: Number
});
testSchema.index({name: 1, weight: 1});

const testModel = testDb.model('Test', testSchema, "test");
testModel.find((error, result)=> {
    console.log('find1', error, result);
});


// (async ()=> {
//
//     const testModel = mongoose.model('Test', testSchema, "test");
//     testModel.find((error, result)=> {
//         console.log('find1', error, result);
//     });
//     setTimeout(()=> {
//         mongoose.connect(testDbLink, dbOptions);
//     }, 6000);
//
//     //
//     // testModel.find({height: 183}, (error, result)=> {
//     //     console.log('find2', error, result);
//     // });
//     //
//     // testModel.find({height: 183}, {name: 1, weight: 1}, (error, result)=> {
//     //     console.log('find3', error, result);
//     // });
//     //
//     // testModel.find({height: 183}, {name: 1, weight: 1}, {limit: 2, sort: {weight: -1}}, (error, result) => {
//     //     console.log('find4', error, result);
//     // });
//     //
//     // let query = testModel.find({height: 183}, {name: 1, weight: 1}, {limit: 2, sort: {weight: -1}});
//     // query.exec((err, result)=> {
//     //     console.log('find5 exec', err, result);
//     // });
//
//     // let promise = query.exec();
//     // promise.then((result)=> {
//     //     console.log('find6 promise', result);
//     // }).catch(err=> {
//     //     console.log('find6 promise', err);
//     // });
//
//     // let result7 = await query.exec();
//     // console.log('find6 await', result7);
//
//     let id = "5ca41d851da6e5de8f751742";
//
//     // testModel.findById(id, (err, result)=> {
//     //     console.log('findById1', err, result);
//     // });
//     // testModel.findById(id, {name: 1}, (err, result)=> {
//     //     console.log('findById1', err, result);
//     // });
//
//     // testModel.findOne({_id: id}, (err, result)=> {
//     //     console.log('findOne', err, result);
//     // });
//
//     // testModel.findByIdAndDelete();
//     // testModel.findByIdAndRemove();
//
//     // A.findByIdAndRemove(id, options, callback) // executes
//     // A.findByIdAndRemove(id, options)  // return Query
//     // A.findByIdAndRemove(id, callback) // executes
//     // A.findByIdAndRemove(id) // returns Query
//     // A.findByIdAndRemove()           // returns Query
//
//     // A.findByIdAndUpdate(id, update, options, callback) // executes
//     // A.findByIdAndUpdate(id, update, options)  // returns Query
//     // A.findByIdAndUpdate(id, update, callback) // executes
//     // A.findByIdAndUpdate(id, update)           // returns Query
//     // A.findByIdAndUpdate()                     // returns Query
//
//     // A.findOneAndDelete(conditions, options, callback) // executes
//     // A.findOneAndDelete(conditions, options)  // return Query
//     // A.findOneAndDelete(conditions, callback) // executes
//     // A.findOneAndDelete(conditions) // returns Query
//     // A.findOneAndDelete()           // returns Query
//
//     // A.findOneAndRemove(conditions, options, callback) // executes
//     // A.findOneAndRemove(conditions, options)  // return Query
//     // A.findOneAndRemove(conditions, callback) // executes
//     // A.findOneAndRemove(conditions) // returns Query
//     // A.findOneAndRemove()           // returns Query
//
//     // A.findOneAndReplace(conditions, options, callback) // executes
//     // A.findOneAndReplace(conditions, options)  // return Query
//     // A.findOneAndReplace(conditions, callback) // executes
//     // A.findOneAndReplace(conditions) // returns Query
//     // A.findOneAndReplace()           // returns Query
//
//     // A.findOneAndUpdate(conditions, update, options, callback) // executes
//     // A.findOneAndUpdate(conditions, update, options)  // returns Query
//     // A.findOneAndUpdate(conditions, update, callback) // executes
//     // A.findOneAndUpdate(conditions, update)           // returns Query
//     // A.findOneAndUpdate()                             // returns Query
//
//
//     // testModel.geoSearch({}, {near: [10, 10], maxDistance: 5}, (err, result)=> {
//     //     console.log('geoSearch', err, result);
//     // });
//
//
//     //testModel.insertMany(arr, function(error, docs) {});
//
//
//     // testModel.create({name: "create", height: 1000}, (err, small)=> {
//     //     console.log(err, small);
//     // });
//
//     // testModel.findOne({height: 183}, {name: 1}, (error, result)=> {
//     //     console.log('findOne', error, result);
//     // });
// })();

// var schema = new Schema({
//     name:    String,
//     binary:  Buffer,
//     living:  Boolean,
//     updated: { type: Date, default: Date.now },
//     age:     { type: Number, min: 18, max: 65 },
//     mixed:   Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     decimal: Schema.Types.Decimal128,
//     array: [],
//     ofString: [String],
//     ofNumber: [Number],
//     ofDates: [Date],
//     ofBuffer: [Buffer],
//     ofBoolean: [Boolean],
//     ofMixed: [Schema.Types.Mixed],
//     ofObjectId: [Schema.Types.ObjectId],
//     ofArrays: [[]],
//     ofArrayOfNumbers: [[Number]],
//     nested: {
//         stuff: { type: String, lowercase: true, trim: true }
//     },
//     map: Map,
//     mapOfString: {
//         type: Map,
//         of: String
//     }
// })
// const db = mongoose.createConnection("192.168.0.2:27017", 'testDb');
// Mongoose 5.x no longer supports `mongoose.connect(host, dbname, port)` or
// `mongoose.createConnection(host, dbname, port)`.
// See http://mongoosejs.com/docs/connections.html for supported connection syntax

