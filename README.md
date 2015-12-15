# pits-to-geojson

Convert NDJSON files containing Histograph PITs to GeoJSON.

__Please note:__ pits-to-geojson only processes PITs with a `geometry` field!

## Installation

    npm install -g histograph/pits-to-geojson

## Usage

    pits-to-geojson <path to NDJSON file>

Or:

    cat file.ndjson | pits-to-geojson

Or, use pits-to-geojson as an NPM module:

```js
var fs = require('fs');
var pitsToGeoJSON = require('pits-to-geojson');

fs.createReadStream('file.ndjson', 'utf8')
    .pipe(pitsToGeoJSON({
      types: [
        'hg:Building'
      ],
      data: [
        'year'
      ]
    }))
    .pipe(process.stdout);
```    

## Options

Convert only PITs of a certain type:

    pits-to-geojson -t <comma separated list of PIT types> <path to NDJSON file>

Example:

    pits-to-geojson -t hg:Building <path to NDJSON file>

Only transfer a selection of the fields in the PIT's `data` object to the GeoJSON Feature:

    pits-to-geojson -d <comma separated list of keys> <path to NDJSON file>

Example:

    pits-to-geojson --properties=uri,validSince <path to NDJSON file>

Copyright (C) 2015 [Waag Society](http://waag.org).
