//https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/


//генерируем
import MapboxDraw from "@mapbox/mapbox-gl-draw";

let mapboxDraw_1 = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    }
})

map.addControl(mapboxDraw_1, 'top-left') //полный набор кнопок для генерации point, line, polygon




//запустить режим рисования командой из функции
drawPolygon() {
    let mode = mapboxDraw_1.getMode()
    if (mode != 'draw_polygon') {
        mapboxDraw_1.changeMode('draw_polygon') //инициирует режим рисования полигона
    } else {
        mapboxDraw_1.changeMode('simple_select')  //остановить режим рисования
    }
}

showPolyBtns(isShow = true) {
    if (isShow) {
        this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon").classList.remove('none');
        this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash").classList.remove('none');
        this.$el.querySelector(".mapbox-gl-draw_trash_all").classList.remove('none');
    } else {
        this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon").classList.add('none');
        this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash").classList.add('none');
        this.$el.querySelector(".mapbox-gl-draw_trash_all").classList.add('none');
    }
},



/** Убираем редактируемые полигоны с карты */
removePolygonSet() {
    mapboxDraw_1.deleteAll();
    this.polygons = {};
},




