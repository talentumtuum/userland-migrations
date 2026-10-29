const url = require('node:url');

const relative = url.parse('/path?query=string#hash');
const absolute = url.parse('https://example.com/path');
console.log(relative.path, relative.auth, relative.hostname);
console.log(absolute.path);
