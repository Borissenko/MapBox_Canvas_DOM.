//Работа с DOM



el.classList.contains('класс')   //содержит ли элемент данный класс

el.classList.toggle('класс')     //добавление-удаление класса
//Если класс у элемента есть, метод classList.toggle ведёт себя как classList.remove и класс у элемента убирает.
//А если указанного класса у элемента нет, то classList.toggle, как и classList.add, добавляет элементу этот класс.



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


