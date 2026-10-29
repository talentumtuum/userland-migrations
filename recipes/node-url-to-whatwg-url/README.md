---
authors: AugustinMauroy
---

# DEP0116: `url.parse()` / `url.format()` to `new URL()`

Migrates the deprecated `url.parse()` and `url.format()` functions to the WHATWG `URL` API. Also rewrites property accesses on the parsed URL object that differ between the legacy and WHATWG APIs.

## Usage

Run this codemod with:

```sh
npx codemod @nodejs/node-url-to-whatwg-url
```

## Examples

### Example 1

`url.parse()` to `new URL()`, with property access rewrites:

```diff
 const url = require('node:url');

-const myURL = url.parse('https://example.com/path?query=string#hash');
+const myURL = new URL('https://example.com/path?query=string#hash');

-const { auth } = myURL;
-const urlAuth = myURL.auth;
+const auth = `${myURL.username}:${myURL.password}`;
+const urlAuth = `${myURL.username}:${myURL.password}`;

-const { path } = myURL;
-const urlPath = myURL.path;
+const path = `${myURL.pathname}${myURL.search}`;
+const urlPath = `${myURL.pathname}${myURL.search}`;

-const { hostname } = myURL;
-const urlHostname = myURL.hostname;
+const hostname = myURL.hostname.replace(/^\[|\]$/, '');
+const urlHostname = myURL.hostname.replace(/^\[|\]$/, '');
```

### Example 2

`url.format()` with a static object to `new URL(...).toString()`:

```diff
 const url = require('node:url');

-const str = url.format({
-  protocol: 'https',
-  hostname: 'example.com',
-  pathname: '/some/path',
-  search: '?page=1'
-});
+const str = new URL('https://example.com/some/path?page=1').toString();
```

## Notes

- `.auth` on the legacy URL object becomes a template literal combining `.username` and `.password`: `` `${url.username}:${url.password}` ``
- `.path` becomes a template literal combining `.pathname` and `.search`: `` `${url.pathname}${url.search}` ``
- `.hostname` for IPv6 addresses has surrounding brackets stripped via `.replace(/^\[|\]$/, '')`

### Limitations

`url.parse()` calls are migrated only when their argument is an unescaped string
literal or a template literal without substitutions that is valid as an absolute
WHATWG URL. Relative URLs (including paths, query strings, fragments and
protocol-relative URLs), dynamic inputs and escaped literals are left unchanged,
with a warning identifying the call for manual review. Their legacy property
accesses and required imports are preserved. If the same result variable also
receives a legacy URL, its other parse assignments are preserved as well.

Adding an arbitrary base URL would change fields such as `href`, `hostname` and
`protocol`. Review these cases using the
[Node.js guidance for `url.parse()`](https://nodejs.org/api/url.html#urlparseurlstring-parsequerystring-slashesdenotehost).

`url.format()` reconstruction from an object argument relies on static analysis of the object's properties. Complex cases — such as objects with many computed or dynamic properties — may not be fully transformed and could require manual review.

<!-- sync_to_learn: false -->
