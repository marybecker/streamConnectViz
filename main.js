//create global variables
cached_sites= null;
cached_data= null;

// load csv category data
d3.dsv(',','data/imgCat.csv', function(d) {
    return {
        seq: d.STA_SEQ,
        date: new Date(d.Date), //new Date()
        cat: +d.Obs
    };
}).then(function(data) {
    // load sites from geojson file
    d3.json('data/sites.geojson').then(function(sites) {
        console.log(data);
        console.log(sites);

        cached_sites = sites;
        cached_data = data;

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

        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < sites.features.length; j++) {
                // ----- join here -----
                //create a key value pair in an array for each site
                if(data[i].seq == sites.features[j].properties.STA_SEQ) {
                    if('samples' in sites.features[j].properties){
                        var sample = {'date': data[i].date, 'category': data[i].cat};
                        sites.features[j].properties.samples.push(sample);
                    } else {
                        sites.features[j].properties.samples = [{'date': data[i].date, 'category': data[i].cat}];
                    }
                }
            }
        }



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

        //Get colors for categories on map
        function getColor(d) {
            if(d == 1) {
                return '#ffffcc';
            } else if(d == 2) {
                return '#c7e9b4';
            } else if(d == 3) {
                return '#7fcdbb';
            } else if (d==4){
                return '#41b6c4';
            } else if (d==5){
                return '#2c7fb8';
            } else if (d==6){
                return '#253494';
            } else {
                return '#d9d9d9'
            }
        }

        //samples[0]  just for testing
        function style(feature) {
            return {
                color: '#1f78b4',
                fillColor: getColor(feature.properties.samples[5].category),
                weight: 1,
                stroke: 1,
                fillOpacity: .8,
            };
        }

        /*L.geoJSON(sites,{
            pointTOLayer: function(feature,latlng){
                return L.circleMarker(latlng,style);
            }
        }).addTo(map);*/
        // add data from geojson to map
        //L.geoJSON(sites, {style: style}).addTo(map);

        //let geojson;

        // display information of each site
        function onEachFeature(feature, layer) {
            // display name of site
            let popup = feature.properties.Station_Name;
            let siteCat = feature.properties.samples[5].category;
            let siteDate = feature.properties.samples[5].date;
            layer.bindPopup("<h3>"+ popup + "</h3>" + "Date: "+siteDate+"<br>"+"Category: " + siteCat);

            // // combine csv dates and category data with each site
            // for(let j = 0; j < sites.features.length; j++) {
            //     sites.features[j].properties.categories = {};
            // }
            // for(let i = 0; i < data.length; i++) {
            //     for(let j = 0; j < sites.features.length; j++) {
            //         // ----- join here -----
            //         if(data[i].seq == sites.features[j].properties.STA_SEQ) {
            //             sites.features[j].properties.categories[data[i].date] = data[i].cat;
            //             //sites.features[j].properties.date = data[i].date;
            //         }
            //     }
            // }

            // attempt to match date from csv with current date on slider
            for(let j = 0; j < sites.features.length; j++) {
                let cats = sites.features[j].properties.samples[1].category;
                console.log(cats);

                // get current date of slider
                $("#slider").bind("slidechange", function (event, ui) {
                    let sliderDate = new Date(ui.value);
                    console.log(sliderDate.toDateString());
                });
            }
        }

        L.geoJSON (sites,{
            pointToLayer: function(feature,latlng){
                return L.circleMarker(latlng);
            },
            style:style,
            onEachFeature: onEachFeature
        }).addTo(map);



    });
});