//resource - https://habr.com/ru/company/ruvds/blog/489828/

//создает geoGSON для линии, которая соединяет 2 точки на карте ПО ГЕОГРАФИЧЕКИМ ДОРОГАМ

const axios = require('axios');

async function directions(fromPt, toPt) {
  const fromCoords = fromPt.coordinates.join(',');
  const toCoords = toPt.coordinates.join(',');
  const directionsUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/' +
    fromCoords + ';' + toCoords + '?' +
    'geometries=geojson&' +
    'access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g';
  
  const res = await axios.get(directionsUrl).then(res => res.data);
  return res.routes[0].geometry;
}

const wework = { type: 'Point', coordinates: [-80.139145,25.77409] };
const airport = { type: 'Point', coordinates: [-80.2752743,25.7938434] };

directions(wework, airport).then(res => {
  console.log(res);
});











