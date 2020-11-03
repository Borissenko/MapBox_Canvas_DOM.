export const points = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "1",
        "icon": 'music',  //'bicycle', 'music', 'bar', 'art-gallery', 'rocket'  //"star"- NO working,
        "marker-color": "#f22121",   //NO working,
        "marker-size": "medium",     //переопраделяется в map.addLayer({}).
        "title": "Привет, Ola!",     //подпись под иконкой
        'description': '<strong>Make it </strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
        },
      "geometry": {
        "type": "Point",
        "coordinates": [37.618423, 55.751244]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        "id": "2",
        'icon': 'theatre',
        "marker-color": "#f22121",
        "marker-size": "medium",
        "title": "Привет, Kola!",
        'description': '<strong>Make it </strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
        },
      'geometry': {
        'type': 'Point',
        'coordinates': [37.63, 55.76]
      }
    },
  ]
}

export const polygons = {   //polygon may be several(!)
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Привет, Kola!",     //это выведем в всплывающем попапе.
        "description": `
<strong>Make it Mount Pleasant</strong>
<a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Go ahead!</a>
        `
      },
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
      "properties": {
        "name": "Привет, Ola!",
        "description": `<div>Привет!</div>`
      },
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
      "properties": {
        "color": "#d91c1c"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [    //only for one item(!)
          [37.61, 55.75], [37.7, 55.79], [37.618423, 55.9]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "color": "#1980ee"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
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
    "type": "LineString",
    "coordinates": [
      [37.61, 55.75], [37.7, 55.79], [37.618423, 55.9]
    ]
  }
}
