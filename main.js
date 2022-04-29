import 'ol/ol.css';
import {
  Circle,
  Fill,
  Icon,
  Style
} from 'ol/style';
import {
  Feature,
  Map,
  Overlay,
  View
} from 'ol/index';
import {
  OSM,
  Vector as VectorSource,
  Stamen,
  TileJSON
} from 'ol/source';
import {
  Point
} from 'ol/geom';
import {
  Tile as TileLayer,
  Vector as VectorLayer
} from 'ol/layer';
import {
  useGeographic
} from 'ol/proj';
import {
  Modify,
  Select
} from 'ol/interaction';
import Placemark from 'ol-ext/overlay/Placemark';
// useGeographic();

const place = [0, 0];

const point = new Point(place);

const feature = new Feature(point);



var placemark = new Placemark ({

  contentColor: '#000',
  onshow: function(){ console.log("You opened a placemark"); },
  autoPan: true,
  autoPanAnimation: { duration: 250 }

});
placemark.setBackgroundColor('transparent');
placemark.setColor('blue');
 
const baseLayer = new TileLayer({
  source: new OSM(),
});

const target = document.getElementById('map');
const map = new Map({
  layers: [baseLayer],
  target: target,
  view: new View({
    center: [23, 58],
    zoom: 6,
    projection:'EPSG:4326'
  }),
  overlays: [placemark]
});
placemark.show([23,58]);
map.on('click', function(e) {
  placemark.show(e.coordinate); 
});


// const modify = new Modify({
//   hitDetection: vectorLayer,
//   source: vectorSource,
// });
// modify.on(['modifystart', 'modifyend'], function (evt) {
//   const coordinate = feature.getGeometry().getCoordinates();
//   document.querySelector("#latitude").value = coordinate[1];
//   document.querySelector("#longitude").value = coordinate[0];
 
//   target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
// });
// const overlaySource = modify.getOverlay().getSource();
// overlaySource.on(['addfeature', 'removefeature'], function (evt) {
//   target.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
// });

// map.addInteraction(modify);
