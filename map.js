mapboxgl.accessToken = 'pk.eyJ1Ijoic3Jqb3VwcGkiLCJhIjoiY2t4OTd2YnNvMmExcDJucG14cHB6ajJhOCJ9.YFxNr_U53BASB7Eb3IIGAQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/srjouppi/cl4mrlq74000214o4xfls6yj3',
    zoom: 2.5,
    maxZoom:15,
    minZoom:0,
    center: [74.00, 25.86],
    // maxBounds: [
    //     [-180, 15],
    //     [-30, 72],
    //   ],
    projection: 'naturalEarth',
});

map.on("load", function () {
      map.addLayer(
          {
          id: "state_against_women",
          type: "circle",
          source: {
              type: "geojson",
              data: "data/govAgainstWomen.geojson",
          },
          
          paint: {
            'circle-color': 'grey',
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 0.5,
            // 'circle-radius':2
            'circle-radius': {
            'property': "fatalities",
            'stops': [
            [0, 8],
            [8, 20]
            ],
             },
             "circle-opacity":["step",["get", "age_of_event"],
             1,
             20, .9,
             50, .5,
             200, .25,
            
            ],
             "circle-color": [
                "match",
                ["get", "sub_event_type"],
                "Attack",
                "#FFCD38",
                "Sexual violence",
                "#FF4949",
                "Abduction/forced disappearance",
                "#A760FF",
                "#ffffff",
                ],
           },
        },
      "waterway-label"      
      );
    });


    map.on('click', 'state_against_women', function (e) {
        var eventType = e.features[0].properties['sub_event_type'];
        var deaths = e.features[0].properties['fatalities'].toLocaleString();
        var date = e.features[0].properties['event_date'];
        var eventDescription = e.features[0].properties['notes'];
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<h2><em>'+date+'</em> -- '+eventType+'</h2>' 
            + '<hr/>'
            + '<strong>Deaths: '+deaths+'</strong>'
            + '<p>'+eventDescription+'</p>')
            .addTo(map);
      });
      map.on('mouseenter', 'state_against_women', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'state_against_women', function () {
        map.getCanvas().style.cursor = '';
      });
      
    