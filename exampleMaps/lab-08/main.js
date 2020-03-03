var map = L.map('map', {
    center: [39.7256, -104.9252],
    zoom: 11,
});

var tiles = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

var commonStyles = {
    weight: 1,
    stroke: false,
    fillOpacity: 1,
    radius: 10
};

var layerInfo = {
    programLayer: {
        source: programs,
        color: 'purple',
        tooltip: 'program'
    },
    stationLayer: {
        source: stations,
        color: 'red',
        tooltip: 'layer.feature.properties.STATION_NU'
    },
    storeLayer: {
        source: stores,
        color: 'blue',
        tooltip: 'layer.feature.properties.STORE_NAME'
    }
};

var geoJson = {};

for (var layer in layerInfo){
    geoJson[layer] = L.geoJson(layerInfo[layer]["source"],{
        pointToLayer:function(feature,latlng){
            return L.circleMarker(latlng,commonStyles);
        },
        style: function(feature) {
            return {
                color: layerInfo[layer]["color"],
                fillColor: layerInfo[layer]["color"]
            }
        }
    }).addTo(map);
}

var LocLabels = {
    "<b style='color: purple'>After School Programs</b>": geoJson.programLayer,
    "<b style='color: red'>Fire Stations</b>": geoJson.stationLayer,
    "<b style='color: blue'>Food Stores</b>": geoJson.storeLayer
};

L.control.layers(null, LocLabels,{
    collapsed: false
}).addTo(map);

var radCircle = L.circle([0,0],1000,{
    fillColor: 'white',
    fillOpacity: 0.1,
    color: 'yellow',
    opacity: 0.3,
    stroke: false,
    weight: 3,
    interactive: false
});


map.on('click',function(e){
    var cnt = {'stations':0,'stores':0,'programs':0};
    radCircle.setLatLng(e.latlng)
        .addTo(map);
    //console.log(e.latlng);
    //console.log(layerInfo);
    for (var gsLayer in layerInfo) {
        geoJson[gsLayer].eachLayer(function (layer) {
            var distance = e.latlng.distanceTo(layer.getLatLng()) / 1000;
            if (distance > 1) {
                layer.setStyle({
                    fillOpacity: .1
                });

            } else { //should be within the circle
                //console.log(gsLayer);
                layer.setStyle({
                    fillOpacity: 1
                });
                if(gsLayer=='storeLayer'){
                    cnt['stores'] += 1;
                };
                if(gsLayer=='stationLayer'){
                    cnt['stations']+=1;
                };
                if(gsLayer=='programLayer'){
                    cnt['programs']+=1;
                }
            }

            // Great work summarizing feature info and providing it to the user

            document.getElementById("counts").innerHTML =
                `<b>Number of Fire Stations: </b>${cnt.stations}<br>
                 <b>Number of Food Stores: </b>${cnt.stores}<br>
                 <b>Number of After School Programs: </b>${cnt.programs}`;

            var props = layer.feature.properties;
            if (gsLayer == 'stationLayer'){
                var content =   `Fire Station No.: ${props.STATION_NU} <br>Distance (km) from Click Point: ${distance.toFixed(2)}`;
            }if (gsLayer == 'storeLayer') {
                var content = `Store Name: ${props.STORE_NAME}<br>Distance (km) from Click Point: ${distance.toFixed(2)}`;
            }if(gsLayer == 'programLayer'){
                var content = `After School Program: ${props.ORGANIZATI}<br>Distance (km) from Click Point: ${distance.toFixed(2)}`;
            }
            layer.bindTooltip(content);
        });
    }
});