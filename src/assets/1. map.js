import mapboxgl from "mapbox-gl"
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'  //it is no work !
import 'mapbox-gl/dist/mapbox-gl.css'                    // it is necessary exactly!

export default {
  mounted() {  //exactly with mounted(!), not created.
    
    //прикрутили ТОКЕН, который генерируется в личном кабинете компании https://account.mapbox.com/
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g'  // my
    //En-lng map: mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZnNic20wMzlrMnFxa3didHFyYzFzIn0.RdgEdp7LaXIslsPrEGpwmA';  // чужой, АНГЛОЯЗЫЧНЫЕ названия, рабочий
  
    //ГЕНЕРАЦИЯ ЭКЗЕМПЛЯРА карты, map_instance.
    let map = new mapboxgl.Map({
      container: 'map',        //id того дива, в который будет загружаться карта.
      style: 'mapbox://styles/mapbox/streets-v8',  // темный стиль карты - 'mapbox://styles/mapbox/dark-v10'
      center: [37.618423, 55.751244],   //[lng, lat]
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
      
    })
    
    //МЕТОДЫ экземпляра карты.
    map.resize()     //
    
    
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