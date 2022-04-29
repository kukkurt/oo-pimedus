import 'ol/ol.css';
import {Circle, Fill, Icon, Style} from 'ol/style';
import {Feature, Map, Overlay, View} from 'ol/index';
import {OSM, Vector as VectorSource, Stamen, TileJSON} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {useGeographic} from 'ol/proj';
import {Modify, Select} from 'ol/interaction';

const place = [-110, 45];

const point = new Point(place);


const vectorSource = new VectorSource({
  features: [new Feature(point)],
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
  target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
});
const overlaySource = modify.getOverlay().getSource();
overlaySource.on(['addfeature', 'removefeature'], function (evt) {
  target.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
});

map.addInteraction(modify);


// useGeographic();



// const place = [26.79, 58.38];
// const point = new Point(place);
// const myFeature =new Feature(point);


// const map = new Map({
//   target: 'map',
//   view: new View({
//     center: place,
//     zoom: 6,
//   }),
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//     new VectorLayer({
//       source: new VectorSource({
//         features: [myFeature],
//       }),
//       style: new Style({
//         image: new Circle({
//           radius: 9,
//           fill: new Fill({color: 'blue'}),
//         }),
//       }),
//     }),
//   ],
// });

// const element = document.getElementById('popup');



// const popup = new Overlay({
//   element: element,
//   positioning: 'bottom-center',
//   stopEvent: false,
//   offset: [0, -10],
// });
// map.addOverlay(popup);

// function formatCoordinate(coordinate) {
//   return `
//     <table>
//       <tbody>
//         <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
//         <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
//       </tbody>
//     </table>`;
// }

// const info = document.getElementById('info');
// map.on('moveend', function () {
//   const view = map.getView();
//   const center = view.getCenter();
//   info.innerHTML = formatCoordinate(center);
// });

// map.on('click', function (event) {
//   $(element).popover('dispose');
//   //  myFeature.setGeometry(event.coordinate);
  

//   const feature = map.getFeaturesAtPixel(event.pixel)[0];
//   if (feature) {
//     const coordinate = feature.getGeometry().getCoordinates();
//     popup.setPosition([
//       coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
//       coordinate[1],
//     ]);
//     $(element).popover({
//       container: element.parentElement,
//       html: true,
//       sanitize: false,
//       content: formatCoordinate(coordinate),
//       placement: 'top',
//     });
//     $(element).popover('show');
//   }
// });
// // muudab hiire kursorit
// // map.on('pointermove', function (event) {
// //   if (map.hasFeatureAtPixel(event.pixel)) {
// //     map.getViewport().style.cursor = 'pointer';
// //   } else {
// //     map.getViewport().style.cursor = 'inherit';
// //   }
// // });
