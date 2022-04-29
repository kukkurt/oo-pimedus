import 'ol/ol.css';
import {Circle, Fill, Icon, Style} from 'ol/style';
import {Feature, Map, Overlay, View} from 'ol/index';
import {OSM, Vector as VectorSource, Stamen, TileJSON} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {useGeographic} from 'ol/proj';
import {Modify, Select} from 'ol/interaction';

useGeographic();

const place = [0, 0];

const point = new Point(place);

const feature= new Feature(point);


const vectorSource = new VectorSource({
  features: [feature],
})

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: new Style({
    image: new Circle({
      radius: 9,
      fill: new Fill({color: 'blue'}),
    }),
  }),
});


const baseLayer = new TileLayer({
   source: new OSM(),
});

const target = document.getElementById('map');
const map = new Map({
  layers: [baseLayer, vectorLayer],
  target: target,
  view: new View({
    center: [0, 0],
    zoom: 3,
  }),
});

const modify = new Modify({
  hitDetection: vectorLayer,
  source: vectorSource,
});
modify.on(['modifystart', 'modifyend'], function (evt) { 
const coordinate = feature.getGeometry().getCoordinates();
  console.log(coordinate);
  
  target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
});
const overlaySource = modify.getOverlay().getSource();
overlaySource.on(['addfeature', 'removefeature'], function (evt) {
  target.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
});

map.addInteraction(modify);

