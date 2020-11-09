//setFeatureState



// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
//https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
var hoveredStateId = null;

map.on('mousemove', 'state-fills', function (e) {
  if (e.features.length > 0) {
    if (hoveredStateId) {
      map.setFeatureState(
        { source: 'states', id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = e.features[0].id;
    map.setFeatureState(
      { source: 'states', id: hoveredStateId },
      { hover: true }
    );
  }
});

// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'state-fills', function () {
  if (hoveredStateId) {
    map.setFeatureState(
      { source: 'states', id: hoveredStateId },
      { hover: false }
    );
  }
  hoveredStateId = null;
});











