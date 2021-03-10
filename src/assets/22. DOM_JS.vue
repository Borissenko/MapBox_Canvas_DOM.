<script>
//РАБОТА с DOM
<<<<<<< HEAD:src/assets/22. DOM_JS.vue

//надо заботать:
//https://monsterlessons.com/project/series/rabota-s-dom-derevom-v-javascript
=======
>>>>>>> 7b2f82e7344cd19b52fc766a74dfd7c0661b1c42:src/assets/22. DOM_JS.vue

//создать или акцептировать.
let el = document.createElement('canvas')
let canvasEl = document.getElementById('canvasID')
let ch1 = el.firstChild

document.body.appendChild(el)     //добавить el в корень html.
<<<<<<< HEAD:src/assets/22. DOM_JS.vue

el.parentNode.removeChild(el)    //удалить el, отталкиваясь от самого себя   )).
=======
>>>>>>> 7b2f82e7344cd19b52fc766a74dfd7c0661b1c42:src/assets/22. DOM_JS.vue

el.parentNode.removeChild(el)    //удалить el, отталкиваясь от самого себя   )).

<<<<<<< HEAD:src/assets/22. DOM_JS.vue
=======

>>>>>>> 7b2f82e7344cd19b52fc766a74dfd7c0661b1c42:src/assets/22. DOM_JS.vue
//атрибуты
el.id = "marker-" + feature.properties.id      //add id=""
el.setAttribute('id', 'gg')  //add id="" too.
el.setAttribute('tabindex', '-1')  //add attribute "tabindex='-1".
el.innerHTML = `<div  id="${feature.properties.id}" data-action-name="${feature.properties.title}">GO</div>`
el.title = 'Привет!'

//CSS
el.className = 'my_marker'
el.style.width = feature.properties.iconSize[0] + 'px';
el.style.height = feature.properties.iconSize[1] + 'px'
el.style.backgroundImage = 'url(https://placekitten.com/img5)'

el.classList.contains('класс')        //содержит ли элемент данный класс
el.classList.toggle('класс')     //добавление-удаление класса
//Если класс у элемента есть, метод classList.toggle ведёт себя как classList.remove и класс у элемента убирает.
//А если указанного класса у элемента нет, то classList.toggle, как и classList.add, добавляет элементу этот класс.




//.......................
//ОБРАБОТЧИКИ
//A-вариант обработчика - el.addEventListener()
//1.
el.addEventListener('click', function (e) {
  window.alert(feature.properties.message)
  createPopUp(marker)
})


//2. Событие - возникновение видимости у элемента.
el.addEventListener('visibilitychange', function () {   //when the content of its tab have become visible or have been hidden.
   resetTime = true
})

//аналогично можно использовать document.visibilityState
if (el.visibilityState === 'visible') {
    //включаем что-то
} else {
    //выключаем что-либо
}
// НО(!) в разных броузерах это событие и св-во видимости называется по-разному!


//B-вариант обработчика.
let wrapperEl = document.createElement('div')

//wrapperEl.getElementsByClassName('wrapper_child1')[0].onclick(f)   //срабатывает.
//wrapperEl.getElementById('childId').onclick(f)              //НЕ срабатывает почему-то.
wrapperEl.querySelector("#childId")                 // а так, с использованием id, - срабатывает.
  .onclick ( e => {
  console.log('gg')                               // сразу можем что-то сделать, т.к. уже прицелены.
  const actionName = e.target.dataset.actionName  //дополнительно отбираем по [data-action-name="55"].
  if (feature.properties.id) {                    //дополнительно отбираем по feature.properties.id.
    console.log('doIt()')
  }
})

</script>


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

//.......................

















