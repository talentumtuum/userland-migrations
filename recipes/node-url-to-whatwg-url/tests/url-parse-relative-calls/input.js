const { parse: parseURL } = require('node:url');

parseURL('/path');
const auth = parseURL('../path').auth;
const path = parseURL('?query=string').path;
const hostname = parseURL('//example.com/path').hostname;
const { auth: credentials } = parseURL('#hash');
const { path: pathname } = parseURL('');
const { hostname: host } = parseURL(`./path`);
