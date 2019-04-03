'use strict';

process.stdin.on('readable', ()=> {
    let chunk;
    console.log('new data availalble');

    while((chunk = process.stdin.read()) !== null) {

        console.log(`Chunk read: ${chunk.length}  ${chunk.toString()}`);
    }
}).on('end', ()=> {
    process.stdout.write('end of stream');
});
