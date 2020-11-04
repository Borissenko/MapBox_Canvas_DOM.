//произвольный маркер
//аналогичен point'у, но имеет html-дизайнерский вид.

import mapboxgl from "mapbox-gl"
import {points} from '@/assets/geoJSON'


let feature = points.features[0]

//создаем внешний вид маркера, с помощью HTML и CSS.
let el = document.createElement('div')
el.className = 'my_marker'
el.setAttribute('id', '55')  //add id=""
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

//описываем CSS
// <style>
//   .my_marker {
//   width: 10px;
//   height: 20px;
//   background: red;
// }
// </style>


//ИНИЦИИРУЕМ маркер
const my_marker_1 = new mapboxgl.Marker(el)  // если el не задавать, то по-умолчанию - каплевидный значек.
.setLngLat([37.65, 55.75])
.addTo(map)


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







