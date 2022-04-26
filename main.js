import 'ol/ol.css';
import {Circle, Fill, Style} from 'ol/style';
import {Feature, Map, Overlay, View} from 'ol/index';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {useGeographic} from 'ol/proj';

useGeographic();

const place = [-360, 45];

const point = new Point(place);

const map = new Map({
  target: 'map',
  view: new View({
    center: place,
    zoom: 10,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [new Feature(point)],
      }),
      style: new Style({
        image: new Circle({
          radius: 9,
          fill: new Fill({color: 'red'}),
        }),
      }),
    }),
  ],
});

const element = document.getElementById('popup');

const popup = new Overlay({
  element: element,
  positioning: 'center-right',
  stopEvent: false,
  offset: [0, -10],
});
map.addOverlay(popup);

function formatCoordinate(coordinate) {
  return `
    <table>
      <tbody>
        <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
        <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
      </tbody>
    </table>`;
}

const info = document.getElementById('info');
map.on('moveend', function () {
  const view = map.getView();
  const center = view.getCenter();
  info.innerHTML = formatCoordinate(center);
});

map.on('click', function (event) {
  $(element).popover('dispose');

  const feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (feature) {
    const coordinate = feature.getGeometry().getCoordinates();
    popup.setPosition([
      coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
      coordinate[1],
    ]);
    $(element).popover({
      container: element.parentElement,
      html: true,
      sanitize: false,
      content: formatCoordinate(coordinate),
      placement: 'top',
    });
    $(element).popover('show');
  }
});

map.on('pointermove', function (event) {
  if (map.hasFeatureAtPixel(event.pixel)) {
    map.getViewport().style.cursor = 'pointer';
  } else {
    map.getViewport().style.cursor = 'inherit';
  }
});
