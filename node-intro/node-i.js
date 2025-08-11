// import { writeFileSync, writeFile, readFile } from 'node:fs';
import { writeFile, readFile } from 'node:fs/promises';

import { add, myMagicNumber } from './utils.js';

// const myModule = require('./utils.js');

console.log('Vor dem write file');

// writeFileSync('test.txt', 'Hallo, Leute');

// writeFile('asyncTest.txt', 'async data', () => {
//   console.log('write File ist fertig ');

//   readFile('asyncTest.txt', 'utf-8', (error, data) => {
//     console.log('READ: ', data);
//   });
// });

try {
  await writeFile('promises.txt', 'Dies ist durch promises write File geschrieben');
} catch (error) {
  console.log(error);
}

console.log('Nach dem write file');

// console.log(add(myMagicNumber, 5));
