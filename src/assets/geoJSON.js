export const points = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": 22,
        "marker-color": "#f22121",
        "marker-size": "medium",
        "icon": "star",
        "title": "Привет!"
      },
      "geometry": {
        "type": "Point",
        "coordinates":
          [37.65, 55.75]
      }
    }
  ]
}

export const polygon = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [37.65, 55.75],[37.66, 55.75],[37.65, 55.77],[37.65, 55.75]
          ]
        ]
      }
    }
  ]
}


// export const cameraFeature = {
//   'type': 'Feature',
// 'geometry'
// :
// {
//   'type'
// :
//   'Point',
//     'coordinates'
// :
//   [camera_data.X, camera_data.Y]
// }
// ,
//   'properties': {
//     'id': camera_data.CAMERA,
//     // 'groupId': camera_data.GROUP_ID,
//     // 'territoryId': camera_data.TERRITORY_ID,
//     'camera': camera_data.CAMERA,    // id камеры (как в БД)
//     'cameraType': type?type:'stationary',
//     'name': camera_data.CAMERA,
//     'icon': icon?icon:'iconCamera',
//     'azimut': camera_data.AZIMUT || 0,
//     'place': camera_data.CAMERA_PLACE,
//     // 'territoryName': camera_data.CAMERA_TERRITORY_NAME,
//     // 'groupName': camera_data.CAMERA_GROUP_NAME,
//   }
// }


export const line = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "LineString",   //"Polygon" for zone.
    "coordinates": [
      [
        -1402.3840141296387,
        55.76488919564486
      ],
      [
        -1402.3675346374512,
        55.75880449639896
      ],
      [
        -1402.3658180236816,
        55.761991838227885
      ],
      [
        -1402.3707962036133,
        55.76324738620863
      ]
    ]
  }
}
