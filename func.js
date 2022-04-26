var map, basemap, markers;
$(document).ready(function () {
    init_map();
    $("#btn_addmarker").on("click", function () {
        var lat = $("#latitude").val();
        var lon = $("#longitude").val();
        add_marker(lat, lon);
    });
});

function init_map() {
    map = new OpenLayers.Map('map');
    basemap = new OpenLayers.Layer.OSM("Simple OSM Map");
    map.addLayer(basemap);
    markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    map.setCenter(
        new OpenLayers.LonLat(-71.147, 42.472).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ), 12
    );
}

function add_marker(latitude, longitude) {
    var lonLat = new OpenLayers.LonLat(longitude, latitude)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
    );
    var point = new OpenLayers.Marker(lonLat);
    markers.addMarker(point);
    map.setCenter(lonLat, 8);
    //console.log(latitude + ", " + longitude);
}
