// попапы ( всплывающая пояснялка ) при загрузке карты.
//https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup

import mapboxgl from "mapbox-gl";

let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: true  // закрыть при клике аутсайд
})
.setLngLat([37.618425, 55.751247])
.setHTML(`
                <div>
                  <div>GO!</div>
                  <button data-action-name="add">add</button>
                  <button data-action-name="delete">delete</button>
                </div>
         `)
.addTo(map)


//ОБРАБОТЧИК события В попапе.
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

//КЛИК с двумя параметрами обработчика события (!)
//https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/