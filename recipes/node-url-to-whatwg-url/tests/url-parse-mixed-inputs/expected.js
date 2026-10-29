const url = require('node:url');

const relative = url.parse('/path?query=string#hash');
const absolute = new URL('https://example.com/path');
console.log(relative.path, relative.auth, relative.hostname);
console.log(`${absolute.pathname}${absolute.search}`);
