var fs = require('fs');
var util = require('util');
var _ = require('highland');
var argv = require('minimist')(process.argv.slice(2));

var geojson = {
  open: '{"type":"FeatureCollection","features":[',
  close: ']}'
};

if (argv._.length != 1) {
  console.error('Please supply one Histograph NDJSON PIT file as command line argument');
  process.exit(1);
}

var types = null;
if (argv.types) {
  types = argv.types.split(',');
}

var filename = argv._[0];

fs.exists(filename, function(exists) {
  if (exists) {
    pitsToGeoJSON(filename, types);
  } else {
    console.error(util.format('File does not exist: %s', filename));
    process.exit(1);
  }
});

function hasType(types, pit) {
  if (pit.length > 0 && types && types.length > 0) {
    var type = JSON.parse(pit).type;
    return types.indexOf(type) > -1;
  } else {
    return true;
  }
}

function hasLength(pit) {
  return pit.length > 0;
}

function pitsToGeoJSON(filename, types) {
  var through = _.pipeline(
    _.split(),
    _.filter(_.curry(hasType, types)),
    _.filter(hasLength),
    _.intersperse(',')
  );

  var streams = _([
    _([geojson.open]),
    fs.createReadStream(filename, {encoding: 'utf8'})
      .pipe(through),
    _([geojson.close])
  ]);

  streams.sequence()
    .pipe(process.stdout);
}
