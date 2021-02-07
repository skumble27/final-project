// Creating a link to the geojson file
var link = 'static/countries.geojson'

// Creating a map Object and zoomed out to show the world
var myMap = L.map("agrimapid", {
  center: [-5.067383325760818, 77.08252432997061],
  zoom: 3
});

// Adding a base map tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// Creating a function that will highlight the colours of the continent for which country it belongs to
function chooseColor(continent) {
  switch (continent) {
    case "Asia":
      return "yellow";
    case "South Asia":
      return "#ffbf00";
    case "Central Asia":
      return "#ffe45c";
    case "West Asia":
      return "#fff2b3";
    case "North America":
      return "#fdffde";
    case "South America":
      return "#f5ff5c";
    case "Oceania":
      return "#efff00";
    case "Africa":
      return "#ffd470";
    case "Europe":
      return "#de7f2c";
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
    console.log(chosenCountry);

    d3.selectAll('#agridataplotly').html('');
    d3.selectAll('#agripredict').html('');

    d3.selectAll('#agriland').html('');
    d3.selectAll('#forestland').html('');
    d3.selectAll('#cereal').html('');
    d3.selectAll('#cashcrop').html('');
    d3.selectAll('#employmentag').html('');
    d3.selectAll('#livestock').html('');

    d3.selectAll('#predagri').html('');
    d3.selectAll('#predfor').html('');
    d3.selectAll('#predcereal').html('');
    d3.selectAll('#predcash').html('');
    d3.selectAll('#predemp').html('');
    d3.selectAll('#predlive').html('');

    d3.selectAll('#agritag').html('');
    d3.selectAll('#fortag').html('');
    d3.selectAll('#cerealtag').html('');
    d3.selectAll('#cashcroptag').html('');
    d3.selectAll('#emptag').html('');
    d3.selectAll('#livestocktag').html('');

    d3.selectAll('#agridataplotly').append('h1').text(`${chosenCountry}'s 60 Years of Historical Agricultural Sector Data`);
    d3.selectAll('#agripredict').append('h1').text(`10 Year Forecasts for ${chosenCountry}`)

    agriDataUnpack(chosenCountry);
    agriPredict(chosenCountry);

  })

})















