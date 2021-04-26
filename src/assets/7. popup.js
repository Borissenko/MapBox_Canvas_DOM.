// попапы ( всплывающая пояснялка ) при загрузке карты.
//https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup

import mapboxgl from "mapbox-gl";

//1. ГЕРЕРАЦИЯ попапа.
//1a. Прикрепить попап можно к точке на карте:
let popup = new mapboxgl.Popup({
  closeButton: true,   //кестик на попапе для его удаления
  closeOnClick: true,  // закрыть попап при клике аутсайд
  offset: 25
})
.setLngLat([37.618425, 55.751247])   //СМЕЩАТЬ попап относительно координаты МАРКЕРА надо by  transform: translate(0, 40px); (!) [37.618425, 55.751247]- координата маркера, к которому мы привязываем попап.
.setHTML(`
                <div id="popup1">
                  <div>GO!</div>
                  <button data-action-name="add">add</button>
                  <button data-action-name="delete">delete</button>
                </div>
         `)
//.setText('Go!') - вместо .setHTML() можно использовать. Более простой вариант.
.addTo(map)

// ## СМЕЩАТЬ попап относительно координаты МАРКЕРА
// СМЕЩАТЬ попап надо by  transform: translate(0, 40px); (!)



//1b. Прикрепить попап можно непосредственно к МАРКЕРУ:
//В этом случае обработчик ДЛЯ ВЫЗОВА попапа и локализацию для него - вешать на попап не требуется.
let my_popup = new mapboxgl.Popup({offset: 25})
.setHTML('<h3>' + feature.properties.title + '</h3>')

const my_marker_1 = new mapboxgl.Marker()
.setPopup(my_popup)              // attach popup to marker
.setLngLat([37.65, 55.75])
.addTo(map)




//2 ВЫЗОВ ПОПАПА
//Генерацию попапа прописываем в обрабртчик, например, полигона.
//https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
map.on('click', 'polygonLayerId', function (e) {    //e - дает индивидуальность ответа на клик по одному из полигонов полигон-слоя.
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setHTML(e.features[0].properties.name)
  .addTo(map);
})
// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'polygonLayerId', function () {
  map.getCanvas().style.cursor = 'pointer';
})
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'polygonLayerId', function () {
  map.getCanvas().style.cursor = '';
})


//2. ДЕКЛАРАЦИЯ попапа более КРУТО.
//Вызываем ОДИН и тот же папап, но в разных местах, а не гененируем каждым кликом новый.
this.map.addSource(symbolSourse,{
  'type': 'geojson',
  'data': {
    'type': 'FeatureCollection',
    'features': featureCollection
  }
});

var popup = new mapboxgl.Popup({      //1. заявляем
  closeButton: false,
  closeOnClick: false,
  className: 'map-popup'
});

var _this = this   //<== ACHTUNG(!)
this.map.on('mousemove', symbollayerId, function(e) {
  // Change the cursor style as a UI indicator.
  _this.map.getCanvas().style.cursor = 'pointer'
  
  var coordinates = e.features[0].geometry.coordinates.slice()
  var description = e.features[0].properties.description
  
  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
  }
  

  popup                       //2. СОБСТВЕННО ВЫВЕДЕНИЕ ПОПАПА
  .setLngLat(coordinates)
  .setHTML(description)
  .addTo(_this.map)
  
  if (e.features.length > 0) {
    if (_this.hoveredPointId) {
      _this.map.setFeatureState({ source: symbolSourse, id: _this.hoveredPointId },{ hover: false })
    }
    _this.hoveredPointId = e.features[0].id
    _this.map.setFeatureState({ source: symbolSourse, id: _this.hoveredPointId },{ hover: true })
  }
})

this.map.on('mouseleave', symbollayerId, function() {
  if (_this.hoveredPointId) {
    _this.map.setFeatureState({ source: symbolSourse, id: _this.hoveredPointId },{ hover: false })
  }
  _this.hoveredPointId = null
  
  _this.map.getCanvas().style.cursor = ''
  popup.remove()
})



//3. ОБРАБОТЧИК события В САМОМ попапе.
//Здесь мы вешаем обработчик на ЭКЗЕМПЛЯР new mapboxgl.Popup(), а не на html потапа.
let popUpNode = popup.getElement()

function setNewPassPopUpEventHandler(node) {
  node.onmouseover = (e) => {
    console.log('onmouseover ====')
  }
  
  node.onclick = (e) => {
    //click срабатывает при клике по любому месту попапа,
    //а долее фильтруем, какую функцию запустить, по какому мету мы типо кликнули, за счет e.target.dataset.actionName.
    //"Запускаемая" обработчиком функция обозначена через значение, указанное в data-action-name="delete".
    const actionName = e.target.dataset.actionName     //it is from <button data-action-name="delete">
    if (actionName)
      console.log('actionName ====', actionName)
    
    actionName && console.log('actionName ====', actionName) //the same with "if (actionName){}".
    
    //Полезные ПОЛЯ у event обработчика:
    e.features
    e.lngLat.lng
    e.target.dataset
  }
  
  //ДОПОЛНИТЕЛЬНО, при клике outside от потапа - он исчезает, т.к. мы прописали "closeOnClick: true".
  
}
setNewPassPopUpEventHandler(popUpNode)






//4. ДОСТУП К HTML всех отрисованных попапов напрямую(!).
//4а. УДАЛЕНИЕ ВСЕХ попапов total БЕЗ клика по нему.                                    //https://docs.mapbox.com/help/tutorials/building-a-store-locator/#add-event-listeners
//Любой попап имеет класс 'mapboxgl-popup'(!). Поэтому:

if (!('remove' in Element.prototype)) {  // This will let you use the .remove() function later on
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  }
}

let popUps = document.getElementsByClassName('mapboxgl-popup')  //<<=== (!)
if (popUps[0])    //удалим только первый попап из всех существующих.
  popUps[0].remove();




//5. Пример. Появление попапа при наведении на фичу.
//https://docs.mapbox.com/help/tutorials/analysis-with-turf/
var popup = new mapboxgl.Popup();

map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['hospitals', 'libraries'] });
  if (!features.length) {
    popup.remove();
    return;
  }
  var feature = features[0];
  
  popup.setLngLat(feature.geometry.coordinates)
  .setHTML(feature.properties.Name)
  .addTo(map);
  
  map.getCanvas().style.cursor = features.length ? 'pointer' : '';
});





