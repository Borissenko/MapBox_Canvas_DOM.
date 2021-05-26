//плагин для конвертирования https://geocode.xyz/api,  https://geocode.xyz/

//функция для конвертирования
const axios = require('axios');

async function search(str) {
  const geocoderUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(str) +
    '.json?access_token=' +
    'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g';
  
  const res = await axios.get(geocoderUrl).then(res => res.data);
  const point = res.features[0].geometry;
  
  return 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/' +
    'pin-l-1+333(' + point.coordinates[0] + ',' + point.coordinates[1] + ')/' +
    point.coordinates[0] + ',' + point.coordinates[1] +
    ',14.25,0,0/600x600/' +
    '?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g';
}

search('429 Lenox Ave, Miami Beach').then(res => console.log(res));


//Наоборот: Какому району (его адресное выражение) принадлежит данная точка.
//Используется встроенная в mongoDB функция
const mongoose = require('mongoose');

run().catch(err => console.log(err));

async function run() {
  await mongoose.connect('mongodb://localhost:27017/geotest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await mongoose.connection.dropDatabase();
  
  const State = mongoose.model('State', mongoose.Schema({
    name: String,
    location: mongoose.Schema({
      type: String,
      coordinates: [[[Number]]]
    })
  }));
  
  const colorado = await State.create({
    name: 'Colorado',
    location: {
      "type": "Polygon",
      "coordinates": [[
        [-109, 41],
        [-102, 41],
        [-102, 37],
        [-109, 37],
        [-109, 41]
      ]]
    }
  });
  
  const denver = {
    "type": "Point",
    "coordinates": [-104.9951943, 39.7645187]
  };
  
  const sanFrancisco = {
    "type": "Point",
    "coordinates": [-122.4726194, 37.7577627]
  };
  
  // В каком штате находится Денвер?
  let res = await State.findOne({
    location: {
      $geoIntersects: { $geometry: denver }
    }
  });
  res.name; // Колорадо
  
  // В каком штате находится Сан-Франциско?
  res = await State.findOne({
    location: {
      $geoIntersects: { $geometry: sanFrancisco }
    }
  });
  res; // null
}



//(источник всей этой информации - https://habr.com/ru/company/ruvds/blog/489828/)