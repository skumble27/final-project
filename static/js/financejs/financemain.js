// Creating a link to the geojson file
var link = 'static/countries.geojson'

// Creating a map Object and zoomed out to show the world
var myMap = L.map("financemapid", {
    center: [-5.067383325760818, 77.08252432997061],
    zoom: 3
});

// Adding a base map tile layer
var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Creating a function that will highlight the colours of the continent for which country it belongs to
function chooseColor(continent) {
    switch (continent) {
        case "Asia":
            return "#dbdbdb";
        case "South Asia":
            return "#b0b0b0";
        case "Central Asia":
            return "grey";
        case "West Asia":
            return "#878787";
        case "North America":
            return "#595959";
        case "South America":
            return "#2e2e2";
        case "Oceania":
            return "#ffffff";
        case "Africa":
            return "#413f5";
        case "Europe":
            return "black";
        default:
            return "black";
    }
}

var geoJson;

// Loading the GeoJson Data
d3.json(link).then(function (data) {

    // Testing to see if the Geojson data loads
    console.log(data);

    // Creating a GeoJson layer with the dataset
    geoJson = L.geoJson(data, {

        // Adding style to the layer
        style: function (feature) {
            return {
                color: 'white',

                // Calling the choose color function to add to the continents
                fillColor: chooseColor(feature.properties.Continent),
                fillOpacity: 0.5,
                weight: 1.5,
            };
        },

        onEachFeature: function (feature, layer) {

            layer.on({
                // The opacity will change when the mouse hovers over a specific polygon
                mouseover: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.9
                    });
                },

                // The opacity will return to default values when the mouse is removed from the polygon
                mouseout: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.5
                    });
                },
                // This event will zoom into the polygon when clicked
                click: function (event) {
                    myMap.fitBounds(event.target.getBounds());
                }
            });
            layer.bindPopup("<p>" + feature.properties.ADMIN + "</p> <hr> <p>" + feature.properties.Continent + "</p>");


        }


    }).addTo(myMap);
    // This code will return the selected country in which to filter the data and display information that is related to that particular country.
    geoJson.on('click', function (e) {
        let chosenCountry = e.layer.feature.properties.ADMIN;

        d3.selectAll('#financedataplotly').html('');
        d3.selectAll('#financepredict').html('');

        d3.selectAll('#broadmoney').html('');
        d3.selectAll('#domesticcompanies').html('');
        d3.selectAll('#gdp').html('');
        d3.selectAll('#foreigninvestment').html('');
        d3.selectAll('#inflation').html('');
        d3.selectAll('#stockstraded').html('');
        d3.selectAll('#totalreserves').html('');

        d3.selectAll('#predbroadmoney').html('');
        d3.selectAll('#preddomesticcompanies').html('');
        d3.selectAll('#predgdp').html('');
        d3.selectAll('#predforeigninvestment').html('');
        d3.selectAll('#predinflation').html('');
        d3.selectAll('#predstockstraded').html('');
        d3.selectAll('#predtotalreserves').html('');

        d3.selectAll('#broadmoneytag').html('');
        d3.selectAll('#domesticcomptag').html('');
        d3.selectAll('#gdptag').html('');
        d3.selectAll('#foreigntag').html('');
        d3.selectAll('#inflationtag').html('');
        d3.selectAll('#stockstag').html('');
        d3.selectAll('#cashreservetag').html('');


        d3.selectAll('#financedataplotly').append('h1').text(`${chosenCountry}'s 60 Years of Historical Finance Sector Data`);
        d3.selectAll('#financepredict').append('h1').text(`10 Year Forecasts for ${chosenCountry}`);

        console.log(chosenCountry);

        financeUnPackData(chosenCountry);
        financePredict(chosenCountry);


    })

})















