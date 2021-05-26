<template>

</template>

<script>
export default {
  methods: {
    animateOnRoute: function(id,timestart,timestop,options={duration:2,fps:60}) {
      // возможно метод для анимации точек по маршруту, хз, не получилось передать верный аргумент что бы отработало
      this.flyToLine(id);
      let coordinates = this.map.getSource(id)._data.features[0].geometry.coordinates;
      // let pointPairs = coordinates.reduce((acc,cur,i,arr)=>{
      //   let pair = [cur,arr[i+1]];
      //   if (i<(arr.length-1)) acc.push(pair);
      //   return acc;
      // },[]); // получили N-1 пар точек
      let getting = false;
      let pointPairs = coordinates.reduce((acc,cur,i,arr)=>{
        let pair;
        if (!getting && cur[2] == timestart) { getting = true; }
        if (getting) { pair = [cur,arr[i+1]]; }
        if (i<(arr.length-1) && getting) { acc.push(pair); }
        if ((arr[i+1]&&arr[i+1][2] == timestop) || cur[2] == timestop) { getting = false; }
        return acc;
      },[]); // получили N-1 пар точек от времени старта до времени финиша
    
      var el = document.createElement('div');
      el.className = 'car_marker';
      var marker = new mapboxgl.Marker(el);
      var _this = this;
    
      var cnt = 0;
      var fullCnt = 0;
    
      // let fps = 60; //frames per second будем отталкиваться от 60к/с
      // let duration = 2; //in seconds
      var frames = options.fps*options.duration;
      var track = [];
      var fullTrack = [];
      var fullDistance = 0;
    
      function animateMarker() {
      
        if (!fullTrack.length) return;
        let dLon = 0, dLat = 0, angle = 0;
        if (fullTrack[fullCnt].track[cnt+1]) {
          // dLon = fullTrack[fullCnt].track[cnt+1][0]-fullTrack[fullCnt].track[cnt][0];
          // dLat = fullTrack[fullCnt].track[cnt+1][1]-fullTrack[fullCnt].track[cnt][1];
          // angle = Math.atan2(dLon, dLat) * 180 / Math.PI;
          let point1 = turf.point([fullTrack[fullCnt].track[cnt][0], fullTrack[fullCnt].track[cnt][1]]);
          let point2 = turf.point([fullTrack[fullCnt].track[cnt+1][0], fullTrack[fullCnt].track[cnt+1][1]]);
          angle = turf.bearing(point1,point2);
        }
        marker
        .setLngLat([ fullTrack[fullCnt].track[cnt][0], fullTrack[fullCnt].track[cnt][1] ])
        .setRotation(angle);
      
        // Ensure it's added to the map. This is safe to call if it's already added.
        marker.addTo(_this.map);
      
        let pairFrames = fullTrack[fullCnt].track.length;
        if (cnt >= pairFrames-1 || pairFrames == 0) {
          fullCnt++;
          cnt = 0;
        } else {
          cnt++;
        }
      
        // Request the next frame of the animation.
        if (fullCnt <= fullTrack.length-1 && cnt <= fullTrack[fullCnt].track.length) {
          requestAnimationFrame(animateMarker);
        } else {
          setTimeout(() => { marker.remove(); }, 150);
        }
      
      }
    
      // First we need get full distance
      pointPairs.forEach(p=>{
        let distance = turf.distance(turf.point(p[0]), turf.point(p[1]), {units: 'kilometers'});
        fullDistance += distance;
      });
      pointPairs.forEach(p=>{
        let distance = turf.distance(turf.point(p[0]), turf.point(p[1]), {units: 'kilometers'});
        if (distance == 0) return;
        let pairFrames = Math.round(distance*frames/fullDistance); // part of full frames count
        track = [];
        let line = turf.lineString([p[0],p[1]]);
        for (let i = 0; i < distance; i+=distance/pairFrames) {
          var tracklet = turf.along(line,i,{units:'kilometers'});
          track.push(tracklet.geometry.coordinates);
        }
        fullTrack.push({track: track, dist: distance, time: p[2]});
      });
    
      // Start the animation.
      requestAnimationFrame(animateMarker);
    },
  
  }
}
</script>

<style scoped>

</style>