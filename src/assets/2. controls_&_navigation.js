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


//ПЕРЕЛЕТ в точку
// https://docs.mapbox.com/mapbox-gl-js/example/flyto/
map.flyTo({
  center: [37.618423, 55.751244],
  essential: true // this animation is considered essential with respect to prefers-reduced-motion
})





//ПЕРЕЛЕТ в квадрат карты
//а) Конвертация координат
let ll = new mapboxgl.LngLat(37.63, 55.75)        //перевод координат точки в спец.объект {lng: 37.63, lat: 55.75}
let bounds = new mapboxgl.LngLatBounds(ll_1, ll_2)   //перевод координат квадрата в спец.объект
// {
//   _ne: {lng: 37.63, lat: 55.75},
//   _sw: {lng: 37.59, lat: 55.72}
// }

bounds.isEmpty()  // Ут.


//б) Перелет
map.fitBounds(bounds, {padding: 80})

let bounds = [[32.958984, -5.353521], [43.50585, 5.615985]]  //коордитаты 2 противоположных по диагонали углов квадрата, [SouthWest, NorthEast].
let bounds = {
  _ne: {lng: 37.63974116967, lat: 55.750394234349},
  _sw: {lng: 37.5996961776984, lat: 55.724208264997}
}







