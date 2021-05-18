<template>
  <div>
    <canvas id="canvasID" width="200" height="200">Canvas not supported</canvas>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    //A) используем тег <canvas>, прописанный в html.
    //Это ОПРИМАЛЬНО, т.к. width="200" height="200", задекларированные не в теге напрямую, часто не срабатывают,
    //а по умолчанию их размер- 300x150px, и поэтому наш рисунок будет деформирован(!).
    let el = document.getElementById('canvasID')
    
    //B) или создаем тег <canvas> by JS.
    const el_2 = document.createElement('canvas')
    el.setAttribute('id', 'canvasID')
    el.style.width = '1px'  //часто не срабатывает(!), надо прописывать непосредственно в ЯВНОМ теге <canvas>.
    el.style.height = '1px'
    document.body.appendChild(el)
  
    
    //захватываем context
    let ctx = el.getContext('2d')
    
    //рисуем
    ctx.beginPath()
    ctx.arc(50, 50, 20, 0, 2 * Math.PI, false)
    ctx.fillStyle = 'red'
    ctx.fill()
  }
}
</script>

<style scoped>

</style>