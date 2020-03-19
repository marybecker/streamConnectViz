// load sites geojson file
d3.json('data/sites.geojson').then(function(sites) {
    console.log(sites);

    // add the jQuery slider
    $(function() {
        $("#slider").slider();
    });

    // load map and position
    let center = [41.5, -72.8];
    let map = L.map('mapid').setView(center, 8.5);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v9'
    }).addTo(map);

    function style(feature) {
        return {
            fillColor: 'blue',
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    }

    // add data from geojson to map
    L.geoJSON(sites, {style: style}).addTo(map);

    let geojson;

    // display information of each site
    function onEachFeature(feature, layer) {
        // load the category data for each site
        d3.dsv(',','data/imgCat.csv', function(d) {
            console.log(d);

            // display name of site
            let popup = feature.properties.Station_Name;
            layer.bindPopup(popup)
        });
    }

    geojson = L.geoJson(sites, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
});