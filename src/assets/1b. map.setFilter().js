//https://docs.mapbox.com/help/tutorials/show-changes-over-time/

//Конкретная Feature из ресурса будет отображена только при выполнении условия, прописанного в фильтре.

// Only features that match the filter are displayed.
// Zoom expressions in filters are only evaluated at integer zoom levels.
// The feature-state expression is not supported in filter expressions.

//Декларация фильтра
//а)
map.setFilter('collisions', filterProperty) // можно перетирать во внешнем обработчике.


//б)
map.addLayer({
  id: 'collisions',
  type: 'symbol',
  source: {
    type: 'geojson',
    data: data,
  },
  filter: filterProperty //значение можно динамически изменять во внешнем обработчике.
})



//filterProperty:
filter: ['==', ['number', ['get', 'age']], 15]    //выведутся только Feature, у которых properties.age == 15.




//Применение 2 фильтров одновременно.
//https://docs.mapbox.com/help/tutorials/show-changes-over-time/#combining-filters
var filterHour = ['==', ['number', ['get', 'Hour']], 12]
var filterDay = ['!=', ['string', ['get', 'Day']], 'placeholder']  //это для All, т.к. для аргументов 'collisions' не д.б. null.
map.setFilter('collisions', ['all', filterHour, filterDay])







const data = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "Injured": 1,
        "Killed": 0,
        "Factor1": "Unspecified",
        "Hour": 18,
        "Day": "Fri",
        "Casualty": 1
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-73.9066122, 40.7453924]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Injured": 0,
        "Killed": 0,
        "Factor1": "Unspecified",
        "Hour": 19,
        "Day": "Fri",
        "Casualty": 0
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-73.8427393, 40.8794247]
      }
    },
  ]
}










