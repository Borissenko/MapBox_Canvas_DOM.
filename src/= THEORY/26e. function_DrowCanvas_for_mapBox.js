//удаление старой картинки из ресурсов карты, если мы ее деформировали анимацией при предыдущем применении
//запускаем функцию по созданию иконок
if (map.hasImage('goIcon')) {
  this.map.removeImage('goIcon')
  this.map.removeImage('goToIcon')
  drawCanvasIcons(map)
}

//рисуем иконки и грузим их в ресурс карты
function drawCanvasIcons(map) {
    let sw = 28
    let sh = 28
    let fillColor = "rgb(60,224,167)"
  
    let el = document.createElement('canvas')
    let ctx = el.getContext('2d')
  
    //1. goIcon
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.strokeStyle = fillColor
    ctx.moveTo(5, 15)
    ctx.lineTo(14, 8)
    ctx.lineTo(23, 15)
  
    ctx.moveTo(14, 8)
    ctx.lineTo(14, 22)
    ctx.stroke()
  
    let goIcon = ctx.getImageData(0, 0, sw, sh)
    map.addImage('goIcon', goIcon)
    ctx.clearRect(0, 0, sw, sh)
  
    //2. goToIcon
    ctx.arc(14,3.7,3.7,0,Math.PI*2,true)
    ctx.fillStyle = fillColor
    ctx.fill()
  
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.strokeStyle = fillColor
    ctx.moveTo(5, 19)
    ctx.lineTo(14, 12)
    ctx.lineTo(23, 19)
  
    ctx.moveTo(14, 12)
    ctx.lineTo(14, 26)
    ctx.stroke()
  
    let goToIcon = ctx.getImageData(0, 0, sw, sh)
    map.addImage('goToIcon', goToIcon)
    ctx.clearRect(0, 0, sw, sh)
}


//ОБРАБОТЧИК на canvas.
//https://docs.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/

map.on('load', function () {
  map.boxZoom.disable()     // Disable default box zooming.
  
  var canvas = map.getCanvasContainer()

// Set `true` to dispatch the event before other functions call it.
// This is necessary for disabling the default map dragging behaviour.
  canvas.addEventListener('mousedown', mouseDown, true)
})









