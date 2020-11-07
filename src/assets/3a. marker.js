//произвольный маркер
//аналогичен point'у, но имеет html-дизайнерский вид.
//https://docs.mapbox.com/mapbox-gl-js/api/markers/   <<== см настройки(!).
//https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/

import mapboxgl from "mapbox-gl"
import {points} from '@/assets/geoJSON'


let feature = points.features[0]

//создаем внешний вид маркера, с помощью HTML и CSS.
let el = document.createElement('div')
el.className = 'my_marker'
el.id = "marker-" + feature.properties.id      //add id=""
el.setAttribute('id', 'gg')  //add id="" too.
el.setAttribute('tabindex', '-1')  //add attribute "tabindex='-1".
el.innerHTML = `<div  id="${feature.properties.id}" data-action-name="${feature.properties.title}">GO</div>`

//на html вешаем обработчик.
//camElement.getElementsByClassName('gg')[0]   //срабатывает.
//camElement.getElementById('gg')              //НЕ срабатывает почему-то.
el.querySelector("#gg").onclick = (e) => {
  console.log('gg')   // сразу можем что-то сделать, т.к. уже прицелены.
  const actionName = e.target.dataset.actionName  //дополнительно отбираем по [data-action-name="55"].
  if (feature.properties.id) {                    //дополнительно отбираем по feature.properties.id.
    console.log('doIt()')
  }
}

// описываем CSS для маркера и его попапа
// <style>
//   .my_marker {
//   width: 10px;
//   height: 20px;
//   background: red;
// }
// .mapboxgl-popup {
//   max-width: 200px;
// }
// .mapboxgl-popup-content {
//   text-align: center;
//   font-family: 'Open Sans', sans-serif;
// }
// </style>

//Для попапа.
//В features прописываем title и description. Они будут автоматически отображаться в попапе.
// properties: {
//   title: 'Mapbox',
//   description: 'Washington, D.C.'
// }
//CSS для попапа см. выше.
//обработчик для вызова попапа вешать не требуется.
let my_popup = new mapboxgl.Popup({ offset: 25 })


//ИНИЦИИРУЕМ маркер
map.on('load', () => {
  const my_marker_1 = new mapboxgl.Marker(el, {offset: [0, -23]})  // если el не задавать, то по-умолчанию - каплевидный значек.
  .setPopup(my_popup)              // attach popup to marker
  .setLngLat([37.65, 55.75])
  .addTo(map)
})

//МЕТОДЫ у маркера
//все методы - см. https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker#getlnglat.

//в парамерты маркера добавить поле "shouldBeDraggable: true"
my_marker_1.setDraggable(true)

// УДАЛЕНИЕ маркера
setTimeout(() => {
  my_marker_1.remove()
}, 5000)



//ДОБАВИТЬ class в html-болванке маркера.
setTimeout(() => {
  el.className = 'turn-off'
}, 0)


//ЗАПРОСИТЬ у el:
let class_ = el.className    //запрашиваем, "vesna red". Дополнительно с помощью el.className можно и присуждать.
let classes = el.classList   //он круче, чем el.className. ['vesna', 'red'].







