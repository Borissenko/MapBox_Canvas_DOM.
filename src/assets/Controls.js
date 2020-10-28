//кнопки навигации

//кнопочки навигации, вар 1, РАЗВЕРНУТЫЙ набор.
let Draw = new MapboxDraw()
map.addControl(Draw, 'top-right')

//кнопочки навигации, вар 2.
// map.addControl(new mapboxgl.NavigationControl(),'top-right')
import mapboxgl from "mapbox-gl";

map.addControl(new mapboxgl.NavigationControl({  // или
  showCompass: true,
  showZoom: true
}), 'top-right')





//кнопочки навигации, вар 3.
const nav = new mapboxgl.NavigationControl()
map.addControl(nav, "top-right")



//кнопка для перехода в точку, где ты сейчас находишься
const geolocate = new mapboxgl.GeolocateControl({  //This locates the user on the map based on the browser's geolocation API.
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
})

map.addControl(geolocate, "top-right")

