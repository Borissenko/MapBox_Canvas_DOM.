//Работа с DOM

let el = document.createElement('canvas')


el.id = "marker-" + feature.properties.id      //add id=""
el.setAttribute('id', 'gg')  //add id="" too.
el.setAttribute('tabindex', '-1')  //add attribute "tabindex='-1".
el.innerHTML = `<div  id="${feature.properties.id}" data-action-name="${feature.properties.title}">GO</div>`
el.title = 'Привет!'
//CSS
el.className = 'my_marker'
el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.iconSize.join('/') + '/)'
el.style.width = feature.properties.iconSize[0] + 'px';
el.style.height = feature.properties.iconSize[1] + 'px'



//манипуляции
let canvasEl = document.getElementById('canvasID')

canvasEl.classList.contains('класс')   //содержит ли элемент данный класс
canvasEl.classList.toggle('класс')     //добавление-удаление класса
//Если класс у элемента есть, метод classList.toggle ведёт себя как classList.remove и класс у элемента убирает.
//А если указанного класса у элемента нет, то classList.toggle, как и classList.add, добавляет элементу этот класс.




//.......................
//ОБРАБОТЧИКИ
1. Событие - возникновение видимости у элемента.
el.addEventListener('visibilitychange', function () {   //when the content of its tab have become visible or have been hidden.
   resetTime = true;
});

//аналогично можно использовать document.visibilityState
if (el.visibilityState === 'visible') {
    //включаем что-то
} else {
    //выключаем что-либо
}

НО(!) в разных броузерах это событие и св-во видимости называется по-разному!





//.......................
//КНОПКА включения-выключения чего-либо
<button id="pause"></button>  //текст на кнопке задается в CSS.

<script>
var pauseButton = document.getElementById('pause')

pauseButton.addEventListener('click', function () {
  pauseButton.classList.toggle('pause')   //присуждение-отмена класса для элемента. Меняем надпись на кнопке.
  
  if (pauseButton.classList.contains('pause')) {
     //включаем что-то
  } else {
     //выключаем что-либо
  }
})
</script>

<style>
button {
  position: absolute;
  margin: 20px;
}
#pause::after {
  content: 'Пауза';   //текст на кнопке
}
#pause.pause::after {
  content: 'Go';
}
</style>


