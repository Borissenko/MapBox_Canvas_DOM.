// попапы ( всплывающая пояснялка ).

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


//обработчик события в попапе
//Здесь мы вешаем обработчик на ЭКЗЕМПЛЯР new mapboxgl.Popup(), а не на html.
let popUpNode = popup.getElement()

function setNewPassPopUpEventHandler(node) {
  node.onmouseover = () => {
    console.log('onmouseover ====')
  }
  
  node.onclick = (e) => {
    const actionName = e.target.dataset.actionName     //it is from <button data-action-name="delete">
    if (actionName)
      console.log('actionName ====', actionName)
    //т.е. "запускаемая" обработчиком функция обозначена через значение, указанное в data-action-name="delete".
    
    actionName && console.log('actionName ====', actionName) //the same
  }
}

setNewPassPopUpEventHandler(popUpNode)