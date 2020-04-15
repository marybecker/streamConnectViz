d3.dsv(',','data/imgCat.csv', function(d) {
    return {
        seq: d.STA_SEQ,
        date: d.Date,
        cat: +d.Obs
    };
}).then(function(data) {
    // load sites geojson file
    d3.json('data/sites.geojson').then(function(sites) {
        console.log(data);
        console.log(sites);

        /*for(let j = 0; j < sites.features.length; j++) {
            sites.features[j].properties.dates = {};
        }
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < sites.features.length; j++) {
                // ----- join here -----
                if(data[i].seq == sites.features[j].properties.STA_SEQ) {
                    sites.features[j].properties.dates[data[i].date] = data[i].cat;
                }
            }
        }*/

        // add the jQuery slider
        $(function() {
            let minDate = new Date('2017-07-02');
            let maxDate = new Date('2017-11-1');
            $("#slider").slider({
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

            // combine csv dates and category data with each site
            for(let j = 0; j < sites.features.length; j++) {
                sites.features[j].properties.dates = {};
            }
            for(let i = 0; i < data.length; i++) {
                for(let j = 0; j < sites.features.length; j++) {
                    // ----- join here -----
                    if(data[i].seq == sites.features[j].properties.STA_SEQ) {
                        sites.features[j].properties.dates[data[i].date] = data[i].cat;
                    }
                }
            }

            // attempt to match date from csv with current date on slider
            for(let i = 0; i < data.length; i++) {
                let getDate = new Date(data[i].date);
                let newDate = getDate.toDateString();

                // get current date of slider
                $("#slider").bind("slidechange",function(event, ui) {
                    let sliderDate = new Date(ui.value);
                    //console.log(sliderDate.toDateString());

                    if(sliderDate.toDateString() == newDate) {
                        console.log('Date is ' + newDate);
                    }
                });
            }
        }

        geojson = L.geoJson(sites, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    });
});