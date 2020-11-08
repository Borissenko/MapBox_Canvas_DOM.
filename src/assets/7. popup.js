// попапы ( всплывающая пояснялка ) при загрузке карты.
//https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup

import mapboxgl from "mapbox-gl";

//1. ГЕРЕРАЦИЯ попапа.
//1a. Прикрепить попап можно к точке на карте:
let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: true,  // закрыть при клике аутсайд
  offset: 25
})
.setLngLat([37.618425, 55.751247])
.setHTML(`
                <div>
                  <div>GO!</div>
                  <button data-action-name="add">add</button>
                  <button data-action-name="delete">delete</button>
                </div>
         `)
//.setText('Go!') - вместо .setHTML() можно использовать. Более простой вариант.
.addTo(map)



//1b. Прикрепить попап можно непосредственно к маркеру:
//В этом случае обработчик ДЛЯ ВЫЗОВА попапа и локализацию для него - вешать на попап не требуется.
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
map.on('mouseenter', 'states-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
})
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'states-layer', function () {
  map.getCanvas().style.cursor = '';
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

//КЛИК с двумя параметрами обработчика события
//https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/