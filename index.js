var yargs = require('yargs');
var fs    = require('fs');
var http  = require('http');

var argv = yargs
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

var
  clients = argv.client,
  search = argv.search,
  filename = argv.file,
  fileArray = [],
  countArray = 0,
  ocurrences = 0,
  postData = JSON.stringify({
    'content': fileArray[0],
    'search': search
  }),
  options = {
    protocol: 'http:',
    host: 'localhost',
    port: 8080,
    method: 'POST',
    path: '/',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  request = null;

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  fileArray = data.match(/([^\s]+\s\s*){1,200}/g);
  console.log(fileArray);
});

for (var i = 0; i < clients.length; i++) {
  var client = clients[i];
  getOcurrences(client);
};

function getOcurrences(client) {
  if(countArray < fileArray.length) {
    // enviar o texto para cliente
    // chamar o metodo novamente
  }
};

request = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    var
      searchReturned = chunk.body.search,
      ocurrencesReturned = chunk.body.ocurrences;

    if(searchReturned == search) {
      ocurrences += ocurrencesReturned;

      countArray++;
    }
  });
  res.on('end', function() {
    console.log('No more data in response.')
  });
});

request.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

request.write(postData);
request.end();
