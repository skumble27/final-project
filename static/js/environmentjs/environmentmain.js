// Creating a link to the geojson file
var link = 'static/countries.geojson'


// Creating a map Object and zoomed out to show the world
var myMap = L.map("environmentmapid", {
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
      return "#d7ffe8";
    case "South Asia":
      return "#66ffa7";
    case "Central Asia":
      return "#00ff6c";
    case "West Asia":
      return "green";
    case "North America":
      return "#5c7d14";
    case "South America":
      return "#00b04b";
    case "Oceania":
      return "#006e2f";
    case "Africa":
      return "#004f22";
    case "Europe":
      return "#147d6b";
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

    onEachFeature: function(feature, layer) {

      layer.on({
        // The opacity will change when the mouse hovers over a specific polygon
        mouseover: function(event){
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },

        // The opacity will return to default values when the mouse is removed from the polygon
        mouseout: function(event){
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // This event will zoom into the polygon when clicked
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      layer.bindPopup("<p>" + feature.properties.ADMIN + "</p> <hr> <p>" + feature.properties.Continent + "</p>");


    }


  }).addTo(myMap);
  // This code will return the selected country in which to filter the data and display information that is related to that particular country.
  geoJson.on('click', function (e) {
    let chosenCountry = e.layer.feature.properties.ADMIN;

    d3.selectAll('#environmentplotly').html('');
    d3.selectAll('#environmentpredict').html('');

    d3.selectAll('#p25airpoll').html('');
    d3.selectAll('#population').html('');
    d3.selectAll('#electricity').html('');
    d3.selectAll('#renewable').html('');
    d3.selectAll('#urbanpopulation').html('');
    d3.selectAll('#electricityconsumption').html('');

    d3.selectAll('#predp25airpoll').html('');
    d3.selectAll('#predpopulation').html('');
    d3.selectAll('#predelectricity').html('');
    d3.selectAll('#predrenewable').html('');
    d3.selectAll('#predurbanpopulation').html('');
    d3.selectAll('#predelectricityconsumption').html('');



    d3.selectAll('#environmentplotly').append('h1').text(`${chosenCountry}'s 60 Years of Historical Environmental Data`);
    d3.selectAll('#environmentpredict').append('h1').text(`10 Year Forecasts for ${chosenCountry}`);


    console.log(chosenCountry);
    environmentDataUnpack(chosenCountry);
    environmentPredict(chosenCountry);


  })

})















