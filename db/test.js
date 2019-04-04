'use strict';
const testDaoModel = require('./models/testDao');
const testModel = require('./models/testModel');
let test = async ()=> {
    try {
        let testDao = new testDaoModel();
        // let testEntity = new testModel({title: '三国', author: '罗贯中'});
        // let testEntity1 = new testModel({title: '蓄势待发', author: '麻花', isbnNo: "111111111111111"});
        // let testEntity2 = new testModel({title: '蓄势待发2', author: '麻花'});
        // console.log('save dao --> ', await testDao.create({title: '三国', author: '罗贯中'}));
        // console.log('save dao --> ', await testDao.save({title: '三国', author: '罗贯中'}));
        // console.log('create dao --> ', await testDao.create(testEntity1));
        // console.log('update dao--> ', await testDao.update({title: '蓄势待发'}, {$set: {author1: '开心'}}));
        // console.log('findOne dao --> ', await testDao.findOne({title: '蓄势待发'}));
        // console.log('findAll dao --> ', await testDao.findAll({title: '蓄势待发'}));
        // console.log('remove dal --> ', await testDao.remove({title: '蓄势待发'}));
        // console.log('findAll dao --> ', await testDao.findAll({title: '蓄势待发'}));

        console.log('distinct dao', await testDao.distinct('title', {}));
        console.log('findById', await testDao.findById("5ca56a70c020166b111851c9"));
        console.log('updateById dao', await testDao.updateById("5ca56a70c020166b111851c9", {$set: {isbnNo: "1123243234"}}));
    } catch (e) {
        console.log('catch err', e);
    }
};
test();