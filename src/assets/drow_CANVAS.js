//Наложение канваса - https://docs.mapbox.com/mapbox-gl-js/api/sources/#canvassource

//Рисуем канвасную картиночку - кружок с ободком.
function addCircleImage(color, hasArrow, arrowColor = color) {
  let imgName = `currentCircle${hasArrow ? '_arr' : ''}_${color}`;
  if (!this.map.hasImage(imgName)) {
    let context = document.createElement('canvas').getContext('2d');
    let centerX = 26, centerY = 26, radius = 13;
    
    // нарисуем круг в цвет линии с черной и белой обводкой
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();
    
    context.beginPath();
    context.arc(centerX, centerY, radius - 1, 0, 2 * Math.PI, false);
    context.strokeStyle = "white";
    context.stroke();
    context.closePath();
    
    let width = 28, height = 28, startX = 12, startY = 12;
    if (hasArrow) {
      // рисуем стрелочки
      context.beginPath();
      context.moveTo(26, 40);
      context.lineTo(20, 52);
      
      context.moveTo(26, 40);
      context.lineTo(32, 52);
      
      context.lineWidth = 3;
      context.strokeStyle = arrowColor;
      context.stroke();
      context.closePath();
      
      width = 52;
      height = 52;
      startX = 0;
      startY = 0;
    }
    // для нормального показа цифры внутри, делаем симметрично
    
    let imgData = context.getImageData(startX, startY, width, height);
    
    map.addImage(imgName, imgData);
  }
}


//
//https://docs.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/

map.on('load', function () {
// Disable default box zooming.
  map.boxZoom.disable();
  
  
  var canvas = map.getCanvasContainer();

// Set `true` to dispatch the event before other functions
// call it. This is necessary for disabling the default map
// dragging behaviour.
  canvas.addEventListener('mousedown', mouseDown, true);
  
})









