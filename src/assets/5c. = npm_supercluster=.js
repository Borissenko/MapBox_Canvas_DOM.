//слияние маркеров в кружок при изменении zoom.
// используем плагин https://github.com/mapbox/supercluster

// npm install supercluster

import Supercluster from 'supercluster';

import {points} from '@/assets/geoJSON'

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g';  //my
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 9
    })
    
    let getVisiblePartOfMapCoordinates = this.getVisiblePartOfMapCoordinates  //this не поступает внутрь  map.on('load', ...).
    
    map.on('load', function () {
      //1. инициируем суперкластеры
      const index = new Supercluster({
        radius: 40,
        maxZoom: 16,   //увеличивая до какого зумма будут кластеры еще формироваться.
        //Кластерный feature состоит из
        //- поле geometry: {type: "Point", coordinates: Array(2)}, значения которого возьмутся из feature цетральной точки.
        //- поле properties.
        //
        //Поле properties содержит
        // - автоматически создаваемые поля:
        // cluster: true,
        // cluster_id: 15,
        // point_count: 5,
        // point_count_abbreviated: 5,
        // - нами декларируемые поля
        
        //initial описывает нами декларируемые поля (т.е. clusterFeature.properties)  и их начальное значение.
        //Далее кластерный feature поступит в reduce() как centralPoint.
        initial: function () {
          return {
            min: Infinity,
            max: -Infinity,
            cameraNames: []  //<<<  НЕ ПОЙДЕТ!!! Значения должны быть СТРОКАМИ(!).
          };
        },
        map: (props) => {
          //из каждой охватываемой в кластер точки формируется ПРОМЕЖУТОЧНЫЙ объект, который здесь и ретерниться.
          //props = features.properties каждой отдельной точки.
          //Далее данный промежуточный объект итеративно поступает в reduce() как его surroundingPoint.
          return {
            //1. имеет все поля features.properties у точки, которая покрывается кластером.
            //2. дополнительные поля, нами декларируемые.
            centralFeature: props,
            cameraName: props.name,
          }
        },
        reduce: (centralPoint, surroundingPoint) => {
          //merges properties of surrounding clusters into central one,
          //reduce - это циклическая функция, модифицируем отдельные поля кластерного объекта, отталкиваясь от features всех охватываемых кластером точек.
          //surroundingPoint - в него на каждой итерации попадают промежуточные объекты всех ВБИРАЕМЫХ точек.
          //centralPoint - это результат initial(), и далее centralPoint становиться фичей данного кластера.
          centralPoint.cameraNames.push(surroundingPoint.cameraName)   //<<<  НЕ ПОЙДЕТ!!! Значения должны быть СТРОКАМИ(!).
        }
      })
      
      
      //3. загружаем точки в SuperCluster
      index.load(points.features)  //НЕ points из geoJSON'a(!)
      
      
      //4. получаем [] созданных кластеров в заданной зоне карты.
      //Структура [] - как у features из geoJSON'a.
      //Поля type и geometry создаются автоматически,
      //а поле properties - соответствует КЛАСТЕРНОМУ ОБЪЕКТУ центральной точки, в который ассимилированы by reduce() кластерные обекты окружающих вбираемых точек.
      
      // let screenCoordinates = [37.59829584337527, 55.743169228074464, 37.650434175483525, 55.766800507651084]
      let screenCoordinates = getVisiblePartOfMapCoordinates(map)
      let clusters = index.getClusters(screenCoordinates, Math.floor(map.getZoom()))
      
      
      //5. для КАЖДОГО кластера генерируем Маркер для объективизации его на карте
      //Проходим по членам массива clusters:
      const cluster_1 = clusters[0]
      const cluster_1Coordinates = cluster_1.geometry.coordinates
      
      const el = document.createElement('div')
      el.innerHTML = `<b>${cluster_1.properties.point_count}</b>`
      el.onclick = () => {
        // при клике по кластерному маркеру увеличиваем zoom
        let currentZoom = map.getZoom();
        map.flyTo({
          center: cluster_1Coordinates,
          zoom: currentZoom + 1,
          bearing: 0,
          easing: function (t) {
            return t;
          }
        })
      }
      
      const markerObj = new mapboxgl.Marker(el)
      .setLngLat(cluster_1Coordinates)
      .addTo(map);
      
      //6. обновляем список созданных кластеров
      // this.camerasSuperClusterMarkers.push(markerObj)
      
      
    })
    
  },
  methods: {
    getVisiblePartOfMapCoordinates(map) {
      let coords2 = [];
      let canvas = map.getCanvas();
      let w = canvas.width;
      let h = canvas.height;
      coords2[0] = map.unproject([-50, -50]).toArray();
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




