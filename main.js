// load sites geojson file
d3.json('data/sites.geojson').then(function(sites) {
    console.log(sites);
    d3.dsv(',','data/imgCat.csv').then(function(data) {
        console.log(data);

        // add the jQuery slider
        $(function() {
            let minDate = new Date('2017-07-02');
            let maxDate = new Date('2017-11-1');

            $( "#slider" ).slider({
                min: minDate.getTime(),
                max: maxDate.getTime(),
                slide: function(event, ui) {
                    let currentDate = new Date(ui.value);
                    $('#date').text(currentDate.toDateString());
                }
            });
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
            // display name of site
            let popup = feature.properties.Station_Name;
            layer.bindPopup("<h3>"+ popup + "</h3>");

            /*function siteJoinCategory(feature, data) {
                for(let i=0; i < sites.length; i++) {
                    for(let i=0; i < data.length; i++) {
                        if(feature.properties.STA_SEQ == data[i].STA_SEQ) {
                            feature.properties.STA_SEQ = data[i].STA_SEQ;
                        }
                    }
                }
            }
            console.log(siteJoinCategory());*/

            /*let myIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png';
            }
            L.marker({icon: myIcon}).addTo(map);*/
        }

        geojson = L.geoJson(sites, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    });
});