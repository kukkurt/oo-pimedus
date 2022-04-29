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
  TileJSON
} from 'ol/source';
import DayNight from 'ol-ext/source/DayNight';
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
useGeographic();



var placemark = new Placemark({



  contentColor: '#000',
  onshow: function () {
    // console.log("You opened a placemark");
  },
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }

});
placemark.setBackgroundColor('transparent');
placemark.setColor('blue');

const baseLayer = new TileLayer({
  source: new OSM(),
});

var vectorSource = new DayNight({});

const dayNight = new VectorLayer({
  source: vectorSource,
  style: new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: 'red'
      })
    }),
    fill: new Fill({
      color: [0, 0, 50, .5]
    })
  })
});




const target = document.getElementById('map');
const map = new Map({
  layers: [baseLayer, dayNight],
  target: target,
  view: new View({
    center: [0, 0],
    zoom: 0,
    //projection:'EPSG:4326' //- vaja kasutada kui pole useGeographic();

  }),
  overlays: [placemark]
});

placemark.show([23, 58]);
map.on('click', function (e) {
  placemark.show(e.coordinate);
  document.querySelector("#latitude").value = e.coordinate[1];
  document.querySelector("#longitude").value = e.coordinate[0];
});

document.querySelector("#btn-get").addEventListener("click", function () {
  const lat = document.querySelector("#latitude").value;
  const long = document.querySelector("#longitude").value;
  placemark.show([long, lat]);

});
