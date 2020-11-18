//Welcome to Turf.js

//https://docs.mapbox.com/help/tutorials/analysis-with-turf/
//http://turfjs.org/

//Растояние между 2 точками в метрах.
function getDistanceBetweenPoints([startCoords, endCoords]) {
  let from = turf.point(startCoords)
  let to = turf.point(endCoords)
  return turf.distance(from, to, {units: 'kilometers'});
}


//Азимут между 2 точками
let point1 = turf.point(startCoords)
let point2 = turf.point(endCoords)
angle = turf.bearing(point1,point2)



//
let line = turf.lineString([p[0],p[1]])

let tracklet = turf.along(line,i,{units:'kilometers'})









