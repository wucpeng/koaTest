'use strict';

process.stdin.on('data', chunk=> {
    console.log('new data availalble');
    console.log(`Chunk read: ${chunk.length}  ${chunk.toString()}`);
}).on('end', ()=> {
    process.stdout.write('end of stream');
});
