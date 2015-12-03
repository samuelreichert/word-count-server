var yargs = require('yargs');
var fs    = require('fs');
var http  = require('http');
var debug = require('debug')('word-counter:index');
var client_parse = require('./lib/client_parse.js');

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
  options = {
    host: 'localhost',
    port: 5050,
    method: 'POST',
    path: '/',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  request = null;

// Lê o arquivo
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  // Separa o arquivo em pedaços e guarda no array `fileArray`
  fileArray = data.match(/([^\s]+\s\s*){1,200}/g);

  mountOptions();
});

// Monta as opções de cada client para enviar
function mountOptions() {
  for (var i = 0; i < clients.length; i++) {
    var client = clients[i];
    var postData = getPostData();
    countArray++;

    if (postData) {
      sendRequest(client, postData);
    } else {
      debug('End of file reached');
    }
  }
};

function getPostData() {
  if(countArray < fileArray.length) {
    return JSON.stringify({
      'content': fileArray[countArray],
      'search': search
    });
  } else {
    return false;
  }
};

// Envia para o cliente um pedaço do texto e a palavra a ser buscada (Start dos requests)
function sendRequest(client, postData) {
  if(countArray <= fileArray.length) {
    var options = client_parse(client);
    var request = http.request(options, process_client.bind(null, client));

    request.on('error', function(e) {
      debug('Error processing request: ' + e.message);
    });

    request.write(postData);

    request.end();
  }
};

function process_client(client, res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    var chunk = JSON.parse(chunk);
    debug('Client "%s" responded with %o', client, chunk);
    var searchReturned = chunk.search;
    var ocurrencesReturned = chunk.ocurrences;

    ocurrences += ocurrencesReturned;

    if(countArray < fileArray.length) {
      var postData = getPostData();
      countArray++;

      if (postData) {
        sendRequest(client, postData);
      } else {
        debug('End of file reached');
      }
    } else {
      console.log('Found %d ocurrences of "%s" on file %s.', ocurrences, search, filename);
    }
  });
};
