import url from 'node:url';
import * as nodeUrl from 'url';
import { parse as parseURL } from 'node:url';

const relative = url.parse('/path');
const { path } = relative;
const credentials = relative.auth;
const hostname = relative.hostname;
nodeUrl.parse('../path').path;
parseURL(`?query=string`).hostname;
