# pits-to-geojson

Convert NDJSON files containing Histograph PITs to GeoJSON.

__Please note:__ pits-to-geojson only processes PITs with a `geometry` field!

## Installation

    npm install -g histograph/pits-to-geojson

## Usage

    pits-to-geojson <path to NDJSON file>

Convert only PITs of a certain type:

    pits-to-geojson --types=<comma separated list of PIT types> <path to NDJSON file>

Example:

    pits-to-geojson --types=hg:Building <path to NDJSON file>

Only transfer a selection of fields to the GeoJSON `properties` object:

    pits-to-geojson --properties=<comma separated list of keys> <path to NDJSON file>

Example:

    pits-to-geojson --properties=uri,validSince <path to NDJSON file>
    
Copyright (C) 2015 [Waag Society](http://waag.org).
