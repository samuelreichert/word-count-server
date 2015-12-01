var argv = require('yargs')
  .option('c', {
    alias: 'client',
    type: 'array'
  })
  .option('s', {
    alias: 'search',
    type: 'string'
  })
  .option('f', {
    alias: 'file',
    type: 'string'
  })
  .argv;

var clients = argv.client;
var search = argv.search;
var filename = argv.file;

console.log(clients);
console.log(search);
console.log(filename);
