//Добавление КНОПКИ и функции для РИСОВАНИЯ ПОЛИГОНА.
//Эту кнопку можно добавлять помимо кнопок масштаба, добавленных with map.addControl(new mapboxgl.NavigationControl().

//A-вариант)
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

var draw = mapboxgl.Draw({    // create polygon and trash control
  drawing: true,
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
})
map.addControl(draw) // add control to map
draw.remove()        // remove polygon and trash control from map


//B-вариант)
let mapboxDraw_1 = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
})
map.addControl(mapboxDraw_1, 'top-right')

this.$nextTick(() => {  // добавляем/удаляем дополнительные свойства и стили у выше созданных кнопок.
  this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon").title = "Полигон"
  this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon").classList.add('none')
  
  document.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash").title = "Удалить полигон"
  this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash").classList.add('none')
  
  // this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash").classList.remove('none');
})



// КНОПКА "УДАЛИТЬ все полигоны"
class mapboxDrawDeleteAll {
  constructor(_context, _component_context) {
    this._context = _context;
    this._component_context = _component_context;
  }
  
  onAdd(map) {
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'mapbox-gl-draw_trash_all mapboxgl-ctrl';
    this.container.title = 'Удалить все территории';
    
    this._setupUI();
    return this.container;
  }
  
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
  
  _setupUI() {
    this.container.addEventListener('click', () => this._deleteAllPoly())
  }
  
  _deleteAllPoly() {
    this._context.deleteAll();
    this._component_context.polygons = {};
  }
}

map.addControl(new mapboxDrawDeleteAll(mapboxDraw_1, this), 'top-right');



// ......................................................
//ОБРАБОТКА НАРИСОВАННОГО ПОЛИГОНА
// map.on('style.load', () => {
let polygons = []
var _this = this  //внутри колбеков у map.on НЕТ ДОСТУПА к this компонента! this надо пробрасывать!

// сохранение нарисованного полигона
map.on('draw.create', function (e) {  //срабатывает при нажатии Enter после нарисования полигона.
  let id = e.features[0].id;
  polygons[id] = e.features[0]
})

//обновление полигона
this.map.on('draw.update', function (e) {
  polygons[e.features[0].id] = e.features[0]
});

//УДАЛЕНИЕ ВЕДЕЛЕННОГО ПОЛИГОНА ПРИ КЛИКЕ НА контрол "trash".
map.on('draw.delete', function (e) {
  console.log('e.features ====', e.features[0])
  e.features.forEach(delPoly => {
    delete polygons[delPoly.id]
  })
})
// })


//ЗАМЕНА сохраненного в polygons полигона на обновленный когда у существующего полигона добавляешь/двигаешь точки.
map.on('draw.update', function (e) {
  console.log('draw.update =====', e.features)
  polygons[e.features[0].id] = e.features[0]
})


//Удаление всех
MapboxDraw.deleteAll()