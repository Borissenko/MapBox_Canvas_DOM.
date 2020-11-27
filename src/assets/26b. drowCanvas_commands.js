//Общие команды
let ctx
ctx.beginPath()    //сбрасывает предыдущий
ctx.moveTo(5, 5)

ctx.save()
ctx.save() //сохранение в "подобно СТЕКУ":
// - все CSS свойства,
// - область отсечения by ctx.clip(),
// - статус трансформации пантографа,
// сами точки и фигуры - сохранением не захватываются.
ctx.restore()  //восстановление той точки сохранения, которая лежит на 1 шаг вниз, начиная от вершины стека.



//Общие параметры
ctx.lineWidth = 15
ctx.closePath()              //замыкание ломанной в замкнутый контур. Если используем заливку, то замыкать не обязательно.

ctx.globalAlpha = 0.5        //прозрачность, но для ВСЕХ цветов. Или надо использовать "rgba(60,224,167, 0.7)".
ctx.strokeStyle = "#ff0000"  //цвет линии
ctx.stroke()                 //делает нарисованные контуры видимыми.
//или
ctx.fillStyle = "rgba(60,224,167, 0.7)"
ctx.fill()    //заливка сектора, ограниченного ТОЧКАМИ. Т.е. замыкать контур - не требуется.



//ЛИНИЯ
ctx.lineTo(x,y)
ctx.lineCap = 'round' || 'round' || 'squre'  //butt (по-умолчанию), square. При использовании 'round' или 'squre', длина линии увеличивается на значение 2* lineWidth/2.
ctx.lineJoin = "bevel" || "round" || "miter" // наружный угол срезает плоско; срезает, закругляя; оставляет "квадратным".

ctx.stroke()    // замыкаем  2 крайние ТОЧКИ у данной линии.

  


//ДУГА
ctx.arc(x, y, radius, 0, (A /180) * Math.PI, false)  //A - угол в градусах,  false - по часовой стрелке, начиная от 3-00.
ctx.quadraticCurveTo(288, 0, 388, 150)
ctx.arcTo(x1, y1, x2, y2, r)    //ДУГА, закругляющая ВООБРАЖАЕМЫЙ угол, образованный ПРОДОЛЖЕНИЕМ 2 линий (линии - это касательные к данной дуге).




//ПРЯМОУГОЛЬНИК
ctx.rect(0,0,30,30); ctx.rect(10,10,30,30); ctx.stroke();  //4 ТОЧКИ по углам двух (здесь) прямоугольников, а далее прорисовка соединяющей их линии.
ctx.strokeRect(x, y, width, height)  //периметр
ctx.fillRect(x, y, width, height)    //площадь
ctx.clearRect(x, y, width, height)   //дырка, ничего не нарисовано.




//ТЕКСТ (вместо прямоугольника)
ctx.font = "20px serif"
ctx.textAlign = "left" || "right" || "center" || "start" || "end"    //если используем  etx.fillText()
ctx.textBaseline
ctx.fillStyle = 'цвет | градиент | шаблон'
ctx.strokeStyle= 'red'
ctx.fillText('text', x, y, 100)   // рисует с заливкой, т.е. классически. Здесь strokeStyle - цвет букв.
ctx.strokeText('text', x, y, 100) // рисует только обводку букв, без заливки самих букв. Здесь strokeStyle - цвет обводки у букв. Сами буквы - по цвету фона.




//ГРАДИЕНТ,вместо монолитного цвета.
let gradient = ctx.createLinearGradient(0,0, el.width,0)
gradient.addColorStop("0","magenta")
gradient.addColorStop("0.5","blue")
gradient.addColorStop("1.0","red")
//используем
ctx.strokeStyle = gradient




//Отображение нарисованного на холсте ТОЛЬКО В ПРЕДЕЛАХ очерченной зоны.
ctx.arc(100, 75, 50, 0, Math.PI * 2) ||
ctx.rect()  //not ctx.fillRect()
ctx.clip()  //прорисовываться будет только то, что внутри периметра той замкнутой фигуры, которая прописана перед ctx.clip().



//Перемещение пантографа
ctx.translate(20,200)  //перемещение пантографа
ctx.setTransform(a, b, c, d, e, f)     //перезапись положения пантографа
ctx.transform(a, b, c, d, e, f)   //смещение пантографа относительно его последнего положения на холсте.


//Сохранение параметров трансформации пантографа
//и применение их во втором канвасе.
let storedTransform = ctx.getTransform()
ctx2.setTransform(storedTransform)


//масштабирование
ctx.scale(x, y)  //масштаб вдоль x и y.


//Ротация пантографа
ctx.rect(0, 0, 60, 60)
ctx.rotate(0.25 * Math.PI)
ctx.rect(0, 0, 60, 60)
ctx.strokeStyle = "#109bfc"
ctx.stroke()














