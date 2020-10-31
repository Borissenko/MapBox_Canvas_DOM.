//Отрисовка ранее сохраненных полигонов

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "mapbox-gl";

let polygonsFeatures = [
  {
    geometry: {
      coordinates: Array,
      type: "Polygon"
    },
    id: "1261",
    properties: {},
    type: "Feature"
  },
]

let polygonsToAdd = {
  "type": "FeatureCollection",
  "features": polygonsFeatures
}

MapboxDraw.add(polygonsToAdd);
let polys = MapboxDraw.getAll().features;
polys.forEach(p => {
  polygonsFeatures[p.id] = p;
})

function selectedPolygons(polygons) {
  this.selectedPolygonsSet = Object.assign({},polygons);
}

selectedPolygons(polygonsFeatures);

/**
 * Fly map to array of coordinates
 * @param {Array} coordinates array of coordinates
 */
function flyToPoly (coordinates) {
  return new Promise((resolve, reject) => {
    if (coordinates.length) {
      var bounds = coordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      
      this.map.fitBounds(bounds, {
        padding: 80
      });
      resolve();
    }
  })
}
flyToPoly(polys.flatMap(f => f.geometry.coordinates[0]))


// ....................................................

let polygonsToAdd = {
  "type": "FeatureCollection",
  "features": [
    Object.values(polygons)
  ]
}
map.MapboxDraw.add(polygonsToAdd)