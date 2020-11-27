
//Получение куска из canvas-изображения в формате 'canvas'.
let canvasIcon = ctx.getImageData(0, 0, sw, sh)

//Получение canvas-изображения в формате DataURL.
var el = document.getElementById('canvas')
var dataURL = el.toDataURL(type, encoderOptions)
//type - Тип изображения, по-умолчанию "image/png". Можно задать "image/jpeg", "image/webp".
//encoderOptions - сжатие, 0-1. По умолчанию 0.95.
console.log(dataURL)
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"




el.width   //ширина полотна
el.height  //высота полотна


//Находиться ли точка в контуре.
ctx.rect(20,20,100,100)
if (ctx.isPointInPath(20,50)) {   //если точка (20,50) находиться внутри ТЕКУЩЕГО контура, возвратиться true.
  ctx.fillStyle = 'green'
} else {
  ctx.fillStyle = 'red'
}





