var argv = require('minimist')(process.argv.slice(2));
var clients = argv.c;
var search = argv.search;
var filename = argv.file;

console.log(clients);
console.log(search);
console.log(filename);
