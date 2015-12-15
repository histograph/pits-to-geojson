var H = require('highland');

var geojson = {
  open: '{"type":"FeatureCollection","features":[',
  close: ']}\n'
};

function hasType(types, pit) {
  if (types && types.length > 0) {
    return types.indexOf(pit.type) > -1;
  } else {
    return true;
  }
}

function hasGeometry(pit) {
  return pit.geometry;
}

function pitToFeature(data, pit) {
  var geometry = pit.geometry;
  delete pit.geometry;

  if (data && pit.data) {
    if (data.length === 0) {
      delete pit.data;
    } else {
      Object.keys(pit.data).forEach(function(key) {
        if (data.indexOf(key) === -1) {
          delete pit.data[key];
        }
      });
    }
  }

  return {
    type: 'Feature',
    properties: pit,
    geometry: geometry
  };
}

var first = true;
function open(pit) {
  if (first) {
    pit = geojson.open + pit;
  }

  first = false;
  return pit;
}

module.exports = function(config) {
  if (!config) {
    config = {};
  }

  return H.pipeline(
    H.split(),
    H.compact(),
    H.map(JSON.parse),
    H.filter(H.curry(hasType, config.types)),
    H.filter(hasGeometry),
    H.map(H.curry(pitToFeature, config.data)),
    H.map(JSON.stringify),
    H.intersperse(','),
    H.append(''),
    H.map(open),
    H.append(geojson.close)
  );
};
