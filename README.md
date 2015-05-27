# pits-to-geojson

Convert NDJSON files containing Histograph PITs to GeoJSON.

## Installation

    npm install -g histograph/pits-to-geojson

## Usage

    pits-to-geojson <path to NDJSON file>

Convert only PITs of a certain type:

    pits-to-geojson --types=<comma separated list of PIT types> <path to NDJSON file>

Example:

    pits-to-geojson --types=hg:Building <path to NDJSON file>
