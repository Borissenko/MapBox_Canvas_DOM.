//Плавная по времени прорисовка линии.

//СПОСОБ №1 - переЗагрузка ресурса.

//https://docs.mapbox.com/mapbox-gl-js/example/animate-a-line/ - пример с удлинняющейся линией.
//https://learn.javascript.ru/js-animation - теория по requestAnimationFrame().

//В ресурсе заявляем только начальную точку.
//Через 10 мс, которые обеспечивает нам requestAnimationFrame(), добавляем в ресурс новую точку.
var geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [[0, 0]]
      }
    }
  ]
}
map.addSource('line', {
  'type': 'geojson',
  'data': geojson
})

startTime = performance.now()  // время, когда начнется анимация
animateLine()    //первый запуск.
// Далее она будет перезапускать сама себя. Отсрочивание перезапуска на 10мс обеспечивает requestAnimationFrame().


function animateLine(timestamp) {     //timestamp - текущее performance.now()
  progress = timestamp - startTime
  
  //Если мы ушли слишком далеко, то начинаем все с начала(Обновляем startTime до текущего) или не продолжаем.
  if (progress > 30000) {
    // A) начинаем все с начала
    startTime = timestamp      //обновляем время начала анимации
    geojson.features[0].geometry.coordinates = []
    animation = requestAnimationFrame(animateLine)    //запланирование следующего перезапуска animateLine() через 10мс.
    
    // B) Не продолжаем. Просто не перезапускаем requestAnimationFrame(animateLine).
    
  } else {
    var x = progress / 30
    var y = 20
    geojson.features[0].geometry.coordinates.push([x, y])
    map.getSource('line').setData(geojson)      //обновляем ресурс для слоя.
    animation = requestAnimationFrame(animateLine)    //запланирование следующего перезапуска animateLine() через 10мс.
  }
  
  //requestAnimationFrame - запускает animateLine, но только 1 раз.
  //Функция callback имеет один аргумент – время прошедшее с момента начала загрузки страницы в миллисекундах.
  //Это значение может быть также получено с помощью вызова performance.now().
}


//Разорвать цикл самозапусков можно из-вне, например, через @clik,
//с помощью вызова
cancelAnimationFrame(animation)

//..................................
//ВАРИАНТ 2
//https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-line/

var radius = 20;

function pointOnCircle(angle) {
  return {
    'type': 'Point',
    'coordinates': [Math.cos(angle) * radius, Math.sin(angle) * radius]
  };
}

map.on('load', function () {
// Add a source and layer displaying a point which will be animated in a circle.
  map.addSource('point', {
    'type': 'geojson',
    'data': pointOnCircle(0)   //стартовое положение точки
  });
  
  map.addLayer({
    'id': 'point',
    'source': 'point',
    'type': 'circle',
    'paint': {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  });
  
  function animateMarker(timestamp) {
    map.getSource('point').setData(pointOnCircle(timestamp / 1000))  //последующие положения точки
    requestAnimationFrame(animateMarker)    //заявка на перезагруз ресурса через 10мс
  }

  animateMarker(0)   //инициация замкнутого цикла
})





//СПОСОБ №2 - для CANVAS.
//https://docs.mapbox.com/mapbox-gl-js/example/canvas-source/ - пример.
//https://javascript.tutorials24x7.com/blog/how-to-draw-animated-circles-in-html5-canvas - как анимировать canvas.

// - 1 раз загружаем ресурс, далее его не перезагружаем, и свое место он - не меняет.
//Но сам ресурс с течением времени меняет свою графику.















