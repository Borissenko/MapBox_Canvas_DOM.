//https://docs.mapbox.com/mapbox-gl-js/api/sources/#canvassource - Наложение канваса.
//https://docs.mapbox.com/mapbox-gl-js/example/canvas-source/ - пример.
//https://javascript.tutorials24x7.com/blog/how-to-draw-animated-circles-in-html5-canvas - как анимировать canvas.

//A. Первый способ, без привязки к координатам карты.
//Инициация ВИРТУАЛЬНОГО тега <canvas>, БЕЗ его добавления в DOM.
//Используем изъятый из канваса образ рисунка.

const el = document.createElement('canvas')
el.setAttribute('id', 'outsideImgId')
el.style.width = '100px'
el.style.height = '100px'
let ctx = el.getContext('2d')


//удаляем из mapBox предыдущий, трансформированный анимацией, экземпляр канвас-иконки.
if (map.hasImage('myImg')) {
  map.removeImage('myImg')
}

//рисуем иконку
//

//создаем ресурс для карты
let img = ctx.getImageData(0, 0, sw, sh)
map.addImage('myImg', img)


//используем ресурс
import {points} from "@/assets/geoJSON"

map.on('load', () => {
  map.addSource('myPoints', {
    'type': 'geojson',
    'data': points
  })
  
  map.addLayer({
    'id': 'pointsId',
    'type': 'symbol',
    "source": "myPoints",
    'layout': {
      'icon-image': 'myImg',   // <= использование canvas-img.
      "text-field": 'Привет',
      "text-font": ['Open Sans Regular']
    },
    paint: {
      "text-color": "#6863f5"
    }
  })
})




//B. Второй способ добавления канвас в карту.
//Сразу накладываем ТЕГ <canvas> на определенную область карты.
//хорошо, когда картинка канваса анимированна, а не статичная.

//1. (! НУЖЕН!) <canvas id="canvasID" width="200" height="200">Canvas not supported</canvas>
// <div id="map"></div>
//или можно(?, надо Ут) создать виртуальный тег и пометить его в DOM
const el_2 = document.createElement('canvas')
el.setAttribute('id', 'canvasID')
el.style.width = '1px'  //часто не срабатывает(!), надо прописывать непосредственно в ЯВНОМ теге <canvas>.
el.style.height = '1px'
document.body.appendChild(el)

//2.
var canvas = document.getElementById('canvasID')
var ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.arc(20, 20, 6, 0, Math.PI * 2, false)
ctx.strokeStyle = '#e82434'
ctx.stroke()

//3.
map.on('load', function () {
  //добавление canvas-ресурса в уже четко заданную точку карты
  map.addSource('canvas-source', {
    type: 'canvas',
    canvas: 'canvasID',   //захват ТЕГА <canvas> (!).
    coordinates: [        //размер кружков масштабируется вместе с картой. За счет привязки пантографа к координатному квадрату карты.
      [91.4461, 21.5006],
      [100.3541, 21.5006],
      [100.3541, 13.9706],
      [91.4461, 13.9706]
    ],
    animate: false   // Set to true if the canvas source is animated. If the canvas is static, animate should be set to false to improve performance.
  })
  
  map.addLayer({
    id: 'canvas-layer',
    type: 'raster',
    source: 'canvas-source'
    //coordinates, где в карте будет вставлен элемент ресурса, прописаны при создании ресурса.
  })
})


//4. update ресурс
var mySource = map.getSource('canvas-source')
mySource.setCoordinates([
  [-76.54335737228394, 39.18579907229748],
  [-76.52803659439087, 39.1838364847587],
  [-76.5295386314392, 39.17683392507606],
  [-76.54520273208618, 39.17876344106642]
])

//5. remove ресурс
map.removeSource('canvas-source')


//6. МЕТОДЫ для манипуляции <canvas>'ом, встроенным в ресурс карты.
mySource.getCanvas()       //=> Returns the HTML canvas element back.
mySource.play()
mySource.pause()


//
// Сохраняем текущую матрицу трансформации
ctx.save();
// Используем идентичную матрицу трансформации на время очистки
ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.clearRect(0, 0, canvas.width, canvas.height);
// Возобновляем матрицу трансформации
ctx.restore();












