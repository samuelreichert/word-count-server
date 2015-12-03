var yargs = require('yargs');
var fs    = require('fs');
var http  = require('http');
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
    // console.log(client);
    var options = client_parse(client);
    var postData = getPostData();
    countArray++;

    if (postData) {
      sendRequest(options, postData);
    } else {
      console.log("Ultimo pedaco do array ja foi enviado");
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
function sendRequest(options, postData) {
  if(countArray <= fileArray.length) {
    var request = http.request(options, process_client);


    request.on('error', function(e) {
      console.log('Problema com o request: ' + e.message);
    });

    request.write(postData);

    request.end();
  }
};

function process_client(res) {
  // console.log(res);
  console.log('STATUS: ' + res.statusCode);
  console.log(res.headers);
  // res.setEncoding('utf8');
  // res.on('data', function (chunk) {
  //   console.log(chunk);
  //   var searchReturned = chunk.search;
  //   var ocurrencesReturned = chunk.ocurrences;

  //   // infos client

  //   if(countArray < fileArray.length) {
  //     var options
  //     var postData

  //     countArray++;
  //   }

  // });

  // res.on('end', function() {
  //   console.log('No more data in response.')
  // });
};
