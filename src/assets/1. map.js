import mapboxgl from "mapbox-gl"
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'  //it is no work !
import 'mapbox-gl/dist/mapbox-gl.css'                    // it is necessary exactly!

export default {
  mounted() {  //exactly with mounted(!), not created.
    
    //прикрутили ТОКЕН, который генерируется в личном кабинете компании https://account.mapbox.com/
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g'  // my
    //En-lng map: mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZnNic20wMzlrMnFxa3didHFyYzFzIn0.RdgEdp7LaXIslsPrEGpwmA';  // чужой, АНГЛОЯЗЫЧНЫЕ названия, рабочий
  
    //ГЕНЕРАЦИЯ ЭКЗЕМПЛЯРА карты, map_instance.
    //https://docs.mapbox.com/mapbox-gl-js/api/map/
    //слоями базисной карты ТОЖЕ МОЖНО УПРАВЛЯТЬ(!). См. в 4а.addLayer.
    let map = new mapboxgl.Map({
      container: 'map',        //id того дива, в который будет загружаться карта.
      style: 'mapbox://styles/mapbox/streets-v8',  // темный стиль карты - 'mapbox://styles/mapbox/dark-v10'
      center: [37.618423, 55.751244],   //[lng, lat], Долгота идёт перед широтой.
      zoom: 12.5,
      minZoom: 4,
      hash: false,
      showCompass: true
    })
    
   
    map.on('style.load', () => {  //map.on('style.load' - нужен ли сдесь??
  
      //CLICK в ЛЮБОЙ ТОЧКЕ КАРТЫ.
      map.on('click', (e) => {
        console.log(e)    //в event есть ГЕОГРАФИЧЕСКИЕ и БРОУЗЕРНЫЕ координаты клика(!)
      })
      
      map.on('zoom', function() {})
      map.on('mousemove', function() {})
    })
  
    
    
    //МЕТОДЫ экземпляра карты.
    map.rotateTo(180, { duration: 10000 })  //плавное вращение карты
    map.resize()     //
    
    
  },
  methods: {
    getCoordinatesEtShowingMapScreen(map) { //координаты карты в области видимости экрана
      let coords2 = [];
      let canvas = map.getCanvas();
      let w = canvas.width;
      let h = canvas.height;
      coords2[0] = map.unproject([-50, -50]).toArray();  //unproject - returns a LngLat representing geographical coordinates that correspond to the specified pixel coordinates.
      coords2[1] = map.unproject([-50, h + 50]).toArray();
      coords2[2] = map.unproject([w + 50, h + 50]).toArray();
      coords2[3] = map.unproject([w + 50, -50]).toArray();
      let leftBottom = [coords2[0][0], coords2[0][1]];
      let topRight = [coords2[0][0], coords2[0][1]];
      coords2.forEach(item => {
        if (leftBottom[0] > item[0]) leftBottom[0] = item[0];
        if (leftBottom[1] > item[1]) leftBottom[1] = item[1];
        if (topRight[0] < item[0]) topRight[0] = item[0];
        if (topRight[1] < item[1]) topRight[1] = item[1];
      })
  
      return [leftBottom[0], leftBottom[1], topRight[0], topRight[1]]
    }
  }
}

//  # ТУТОРИАЛ
// https://www.mapbox.com/install/js/bundler-install/

//  # БАЗИСНАЯ ИСТИЛЛЯЦИЯ
// npm install @mapbox/mapbox-gl-draw"
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// +
// npm install mapbox-gl --save
// import 'mapbox-gl/dist/mapbox-gl.css'