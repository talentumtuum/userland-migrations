const url = require('node:url');

let result = url.parse('https://example.com/');
result = url.parse('/path');
console.log(result.path, result.auth, result.hostname);
