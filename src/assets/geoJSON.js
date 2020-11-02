export const points = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "gg",
        "marker-color": "#f22121",
        "marker-size": "medium",
        "icon": "star",
        "title": "Привет!"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [37.618423, 55.751244]
      }
    },
  ]
}

export const polygons = {   //polygon may be several(!)
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [37.65, 55.75], [37.66, 55.75], [37.65, 55.77], [37.65, 55.75]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [37.66, 55.75], [37.66, 55.8], [37.65, 55.6], [37.66, 55.75]
          ]
        ]
      }
    },
  ]
}


export const lines = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",   //"Polygon" for zone.
        "coordinates": [    //only for one item(!)
          [37.61, 55.75], [37.7, 55.79], [37.618423, 55.9]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",   //"Polygon" for zone.
        "coordinates": [    //only for one item(!)
          [37.61, 55.7], [37.7, 55.73], [37.618423, 55.9]
        ]
      }
    }
  ]
}

export const line = {   //ТОЖЕ будет работать(!)
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "LineString",   //"Polygon" for zone.
    "coordinates": [    //only for one item(!)
      [37.61, 55.75], [37.7, 55.79], [37.618423, 55.9]
    ]
  }
}
