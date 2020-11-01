//произвольный маркер
//аналогичен point'у, но имеет html-дизайнерский вид.

import mapboxgl from "mapbox-gl";

//создаем внешний вид маркера, с помощью HTML и CSS.
let el = document.createElement('div')
el.className = 'my_marker'

//описываем CSS
// <style>
//   .my_marker {
//   width: 10px;
//   height: 20px;
//   background: red;
// }
// </style>


//инициируем маркер
const my_marker_1 = new mapboxgl.Marker(el)  // если el не задавать, то по-умолчанию - каплевидный значек.
.setLngLat([37.65, 55.75])
.addTo(map)


//МЕТОДЫ у маркера, все методы - см. https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker#getlnglat.
my_marker_1.setDraggable(true) //в парамерты маркера добавить поле "shouldBeDraggable: true"

setTimeout(() => {//удалить маркер
  my_marker_1.remove()
}, 5000)


//.....................................................
//CLICK по маркеру. Добавление ОБРАБОТЧИКА для Маркера.
mounted() {
  this.createMap()
}
createMap: function () {
  map.on('style.load', () => {
    this.drawVisibleCameras()
  })
}

//описываем маркер с навешенным обработчиком и инстиллируем его в карту.
function drawVisibleCameras() {    //720
  let features = this.cameraFeatures.filter()   //745
  
  features.forEach(feature => {    //752
    let camElement = this.addCameraElementToDOM(feature)  //генерация html для маркера, с присуждением ему id-атрибута.
    
    camElement.getElementsByClassName('camera_point')[0].getElementsByClassName('camera_marker')[0]   //вешаем на html ОБРАБОТЧИК. ОН - СРАБАТЫВАЕТ(!).
      .onclick = (e) => {
      console.log(e.target.id)   // (!)
      //Также можно что-то делать, чисто отталкиваясь от feature.properties.id.
    }
    
    let cameraMarker = new mapboxgl.Marker(camElement)    //на основе созданного html-маркера генерируем на карте МАРКЕР-ЭКЗЕМПЛЯР.
    .setLngLat(feature.geometry.coordinates)
    .addTo(this.map)
    
    setTimeout(() => {
      if (!this.selectedCamera || !Object.keys(this.selectedCamera).length) return;
      if (document.getElementById(this.mapId + '_camera_' + this.selectedCamera.CAMERA))
        this.addClassToElement(document.getElementById(this.mapId + '_camera_' + this.selectedCamera.CAMERA), 'hide_selected_camera')
    }, 0)
  })
},


// генерируем DOM-элемент для камеры.
addCameraElementToDOM: function (camera_feature) {
  let camElement = document.createElement('div')   // initialisation html-формы
  
  camElement.className = elClass  // add class
  camElement.setAttribute('id', '55')  //add id=""
  camElement.setAttribute('tabindex', '-1')  //add attribute "tabindex".
  
  let htmlForMarker = '';
  htmlForMarker +=`<div data-title="${camera_feature.properties.name}"></div>`   //draw children with data-title=""
  camElement.innerHTML = htmlForMarker //set htmlForMarker
  
  return camElement
},

// добавляем элементу класс, но перед добавлением проверяет, не указан ли он уже.
addClassToElement: function (el, className) {
  let classes = el.classList;
  let has = false;
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] == className) {
      has = true;
      break;
    }
  }
  if (!has) el.className += ' ' + className;
},


