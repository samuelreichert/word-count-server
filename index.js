var 
  fs = require('fs');
  argv = require('yargs')
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
  count = 0,
  postData = JSON.stringify({
    'content': fileArray[0],
    'search': search
  }),
  options = {
    protocol: 'http',
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

request = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
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
