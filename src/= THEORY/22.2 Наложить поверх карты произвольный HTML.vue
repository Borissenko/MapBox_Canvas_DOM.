<template>
  <div>
    <div id="map" title="это собственно карта">
      <div class="componentMap">
        = Этот див будет размещаться ПОВЕРХ карты. =
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.componentMap {
  position: absolute;   //важно
  width: 200px;
  height: 70px;
  top: 100px;
  left: 100px;
}
</style>