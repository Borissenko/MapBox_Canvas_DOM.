//кнопки навигации
let navigationControl_1 = new mapboxgl.NavigationControl()
let navigationControl_2 = new mapboxgl.NavigationControl({
  showCompass: true,
  showZoom: true
})

map.addControl(navigationControl_2, 'top-left')



//кнопка для перехода в точку, где ты сейчас находишься
//This locates the user on the map based on the browser's geolocation API.

const geolocateControl_1 = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
})

map.addControl(geolocateControl_1, "top-left")



// Включение навигации по карте при помощи КЛАВИАТУРЫ.
map.keyboard.enable()


//ПЕРЕЛЕТ
// https://docs.mapbox.com/mapbox-gl-js/example/flyto/
map.flyTo({
  center: [37.618423, 55.751244],
  essential: true // this animation is considered essential with respect to prefers-reduced-motion
})