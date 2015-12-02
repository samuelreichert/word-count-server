var fs = require('fs');
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
var fileArray = [];

console.log(clients);
console.log(search);

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  fileArray = data.match(/([^\s]+\s\s*){1,200}/g);
  console.log(fileArray);
});
