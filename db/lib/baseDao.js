'use strict';
const Promise = require('bluebird');
class BaseDao {
    /**
     * 子类构造传入对应的 Model 类
     * @param Model
     */
    constructor(Model) {
        this.Model = Model;
    }
    /**
     * 使用 Model 的 静态方法 create() 添加 doc
     * @param obj 构造实体的对象
     * @returns {Promise}
     */
    create(obj) {
        return new Promise((resolve, reject) => {
            let entity = new this.Model(obj);
            this.Model.create(entity, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result)
                }
            });
        });
    }
    /**
     * 使用 Model save() 添加 doc
     * @param obj 构造实体的对象
     * @returns {Promise}
     */
    save(obj) {
        return new Promise((resolve, reject) => {
            let entity = new this.Model(obj);
            entity.save((error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result)
                }
            });
        });
    }
    /**
     * 查询所有符合条件 docs
     * @param condition 查找条件
     * @param constraints
     * @returns {Promise}
     */
    findAll(condition, constraints) {
        return new Promise((resolve, reject) => {
            this.Model.find(condition, constraints ? constraints : null, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    /**
     * 查找符合条件的第一条 doc
     * @param condition
     * @param constraints
     * @returns {Promise}
     */
    findOne(condition, constraints) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(condition, constraints ? constraints : null, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    /**
     *
     * @param id
     * @param constraints
     */
    findById(id, constraints) {
        return new Promise((resolve, reject) => {
            this.Model.findById(id, constraints ? constraints : null, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    /**
     * 查找排序之后的第一条
     * @param condition
     * @param orderColumn
     * @param orderType
     * @returns {Promise}
     */
    findOneByOrder(condition, orderColumn, orderType) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(condition)
                .sort({[orderColumn]: orderType})
                .exec(function (err, record) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(record);
                    }
                });
        });
    }
    /**
     * 更新 docs 只更新第一条符合记录者
     * @param condition 查找条件
     * @param updater 更新操作
     * @returns {Promise}
     */
    update(condition, updater) {
        return new Promise((resolve, reject) => {
            this.Model.update(condition, updater, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    updateOne(condition, updater) {
        return new Promise((resolve, reject) => {
            this.Model.updateOne(condition, updater, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    updateById(id, updater) {
        return new Promise((resolve, reject) => {
            this.Model.updateOne({_id: id}, updater, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    updateMany(condition, updater) {
        return new Promise((resolve, reject) => {
            this.Model.updateMany(condition, updater, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    /**
     * 移除 doc 移除所有符合条件  set single
     * @param condition 查找条件
     * @returns {Promise}
     */
    remove(condition) {
        return new Promise((resolve, reject) => {
            this.Model.remove(condition, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * ignore set single
     * @param condition
     */
    deleteMany(condition) {
        return new Promise((resolve, reject) => {
            this.Model.deleteMany(condition, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    deleteOne(condition) {
        return new Promise((resolve, reject) => {
            this.Model.deleteOne(condition, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            this.Model.deleteOne({_id: id}, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    distinct(field, condition) {
        return new Promise((resolve, reject) => {
            this.Model.distinct(field, condition, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = BaseDao;