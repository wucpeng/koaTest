'use strict';
const app = require('./app.js');
const {log} = require('./utils/log4js.js');
const {title, port} = require('./config/config.js');
const cluster = require('cluster');
const server = require('http').createServer(app.callback());
const schedule = require("./utils/schedule.js");
const workers = {};
let stopping = false;

const isProduction = process.env.NODE_ENV == 'production'? true : false;
const WORKER_COUNT = isProduction? 3 : 1;

let addWorker = ()=> {
    let w = cluster.fork();
    workers[w.process.pid] = w;
    console.log('addWorker pid', w.process.pid);
    log.info('addWorker pid', w.process.pid);
};

let killChildren = (ws)=> {
    for(let w of ws) {
        console.log('try to kill', w.process.pid);
        log.info('try to kill', w.process.pid);
        w.process.kill('SIGTERM');
    }
};

let reload = ()=> {
    log.info('reload');
    let cpyWorkers = [];
    for (let pid in workers) {
        let w = workers[pid];
        cpyWorkers.push(w);
    }
    setTimeout(killChildren, 3000, cpyWorkers);
};

if (cluster.isMaster) {
    process.title = title + ' master';
    console.log('server ', process.pid, ' start on ', port, ' work process count ', WORKER_COUNT);
    log.info('server ', process.pid, ' start on ', port, ' work process count ', WORKER_COUNT);
    schedule.doSomethingInMasterProcess();
    for(let i = 0; i < WORKER_COUNT; ++i) {
        addWorker();
    }
    process.on('SIGHUP', reload);

    process.on('SIGTERM', ()=> {
        console.log('shutting down');
        stopping = true;
        let cpyWorkers = [];
        for(let pid in workers) {
            let w = workers[pid];
            cpyWorkers.push(w);
        }
        killChildren(cpyWorkers);
        process.exit();
    });
    cluster.on('exit', (worker)=> {
        console.log('Worker ' + worker.process.pid + ' die');
        delete workers[worker.process.pid];
        if (!stopping && Object.keys(workers).length < WORKER_COUNT) {
            console.log('unexpected death, fork a new worker');
            addWorker();
        }
    });
} else {
    process.title = title + ' worker';
    schedule.doSomethingInWorkerProcess();
    process.on('SIGTERM', ()=> {
        console.log('worker receive signal SIGTERM');
        try {
            server.close(()=> {
                console.log('work closed');
                process.exit(0);
            });
            setTimeout(()=> {
                process.exit(0)
            }, 30000);
        } catch (e) {
            process.exit(0);
        };
    });
    server.listen(4000);
    console.log(`listen port : ${port} ...................`);
    console.log(`isProduction = ${isProduction}    env = ${process.env.NODE_ENV}`);
    log.info(`listen port : ${port} ...................`);
    log.info(`isProduction = ${isProduction}    env = ${process.env.NODE_ENV}`);
}