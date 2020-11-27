//подсказочка, похожая на попап
ctx.beginPath();
ctx.moveTo(75,25);
ctx.quadraticCurveTo(25,25,25,62.5);
ctx.quadraticCurveTo(25,100,50,100);
ctx.quadraticCurveTo(50,120,30,125);
ctx.quadraticCurveTo(60,120,65,100);
ctx.quadraticCurveTo(125,100,125,62.5);
ctx.quadraticCurveTo(125,25,75,25);
ctx.stroke();




//.................................
//
let strokeColor = "#2C313A";
let innerSymbolColor = "#eeeeee";
let width = 28, height = 28, startX = 12, startY=12;



//три точки вряд
let centerX = 26, centerY = 26, radius = 13;

context.beginPath();
context.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
context.fillStyle = innerSymbolColor;
context.fill();
context.closePath();

context.beginPath();
context.arc(centerX-6, centerY, 2, 0, 2 * Math.PI, false);
context.fillStyle = innerSymbolColor;
context.fill();
context.closePath();

context.beginPath();
context.arc(centerX+6, centerY, 2, 0, 2 * Math.PI, false);
context.fillStyle = innerSymbolColor;
context.fill();
context.closePath();


// круг с черной и белой обводкой
context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
context.fillStyle = 'red'
context.fill();
context.lineWidth = 1;
context.strokeStyle = "black";
context.stroke();
context.closePath();



//белое кольцо в этом же месте.
context.beginPath();
context.arc(centerX, centerY, radius - 1, 0, 2 * Math.PI, false);
context.strokeStyle = "white";
context.stroke();
context.closePath();


// стрелочка "^".
context.beginPath();
context.moveTo(26, 40);   //левая часть стрелки
context.lineTo(20, 52);

context.moveTo(26, 40);   //правая часть стрелки
context.lineTo(32, 52);

context.lineWidth = 3;
context.strokeStyle = '#0bee22'
context.stroke();
context.closePath();


//стрелка в обе стороны

context.beginPath();
context.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
context.fillStyle = innerSymbolColor;
context.fill();
context.closePath();

context.beginPath();

context.moveTo(centerX+1,centerY-10);
context.lineTo(centerX-7,centerY-2);

context.moveTo(centerX-1,centerY-10);
context.lineTo(centerX+7,centerY-2);

context.moveTo(centerX,centerY-8);
context.lineTo(centerX,centerY-2);
//
context.moveTo(centerX+1,centerY+10);
context.lineTo(centerX-7,centerY+2);

context.moveTo(centerX-1,centerY+10);
context.lineTo(centerX+7,centerY+2);

context.moveTo(centerX,centerY+8);
context.lineTo(centerX,centerY+2);

context.lineWidth = 3;
context.strokeStyle = innerSymbolColor;
context.stroke();

context.closePath();


// стрелка "=>"
context.beginPath();

context.moveTo(centerX+1,centerY-7);
context.lineTo(centerX-6,centerY);

context.moveTo(centerX-1,centerY-7);
context.lineTo(centerX+6,centerY);

context.moveTo(centerX,centerY-6);
context.lineTo(centerX,centerY+6);

context.lineWidth = 3;
context.strokeStyle = innerSymbolColor;
context.stroke();

context.closePath();






















