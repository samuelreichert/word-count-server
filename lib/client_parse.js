var url = require('url');

/**
 * Parse a client url creating the http.request options
 * @return {object} options
 */
function client_parse(address) {
  var options = url.parse(address);
  return options;
}

module.exports = client_parse;
