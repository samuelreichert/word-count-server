var url = require('url');

/**
 * Parse a client url creating the http.request options
 * @return {object} options
 */
function client_parse(address) {
  var options = url.parse(address);

  options.method  = 'POST';
  options.headers = options.headers || {};

  options.headers['Content-Type'] = 'application/json';

  return options;
}

module.exports = client_parse;
