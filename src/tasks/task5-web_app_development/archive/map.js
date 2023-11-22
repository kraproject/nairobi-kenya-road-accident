/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {  
	if(document.getElementById("map")) {
        // If in analysis page (map container exists), initiate map
        initMap();
    }

});



/**
 * 	Define a custom marker icon:
 *
 *	iconUrl: path to custom icon/image,
 *  iconSize:    size of the icon
 *  iconAnchor:  icon point relative to marker's location
 *  popupAnchor: popup point relative to the iconAnchor
 */
let customIcon = L.icon({
    iconUrl: 'static/images/marker2.png',
    iconSize:     [32, 32],
    iconAnchor:   [16, 32],
    popupAnchor:  [0, -32]
});


/**
 *  Map features event(click) handler
 */
const onEachFeature = (feature, layer) => {
	 // console.log(feature.properties.county)
	 
    // Does this feature have properties?
    if (feature.properties) {
		let { county, date, time, total_victims } = feature.properties
		
		// Create popup message HTML 
		popupContent = `
			<p><strong> County: </strong> ${ county } </p>
			<p><strong> Date: </strong> ${ date } </p>
			<p><strong> Time: </strong> ${ time } </p>
			<p><strong> Victims: </strong> 
				<span class="casualty"> ${ total_victims } </span>
			</p>
		`
        
		// Add popup content to feature
		layer.bindPopup(popupContent);
    }
}

/**
 *  Customize map features
 */
const pointToLayer = function (feature, latlng) {
	return L.marker(latlng, {
		icon: customIcon
	});
}


/**
 *  Leaflet map initialization
 */
const initMap = () => {
// Create a Leaflet map centered on Kenya ([Latitude, Longitude], Zoom Level)
let map = L.map('map').setView([1.2921, 36.8219], 6); // 

// Add a base map layer (from OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let mapOptions = {
	pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
}

// Fetch GeoJSON data from API
fetch('/accident.geojson')
    .then(response => response.json())
    .then(data => {
		// Create and add the features to the map
        L.geoJSON(data, mapOptions).addTo(map);
    });
}  


