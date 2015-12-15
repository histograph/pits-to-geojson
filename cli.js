#!/usr/bin/env node

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var pitsToGeoJSON = require('./');

if (process.stdin.isTTY && !argv._[0]) {
  console.error('Usage: pits-to-geojson [-t t1,t2,...] [-d d1,d2,...] [-o file] FILE\n' +
    '  -t    types - only outputs PITs in given set of types\n' +
    '  -d    data - only copies given fields from PIT\'s data field \n' +
    '  -o    output file - if not present, pits-to-geojson uses stdout');

  process.exit(1);
}

var stream = ((argv._.length ? fs.createReadStream(argv._[0], 'utf8') : process.stdin));

var types = null;
if (argv.t) {
  types = argv.t.split(',');
}

var data = null;
if (argv.d) {
  data = argv.d.split(',');
}

stream
  .pipe(pitsToGeoJSON({
    types: types,
    data: data
  }))
  .pipe(argv.o ? fs.createWriteStream(argv.o, 'utf8') : process.stdout);
