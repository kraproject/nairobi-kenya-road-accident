/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {  
	if(document.getElementById("map")) {
        // If in analysis page (map container exists), initiate map
        initMap();
    }
	
	window.addEventListener ("scroll",  stickHeader);
	
	
	mobileNavBtn.addEventListener("click", toggleNav);

});



/**
 * 	Site Header Variable and Function Declarations
 *
 */
 
const header = document.querySelector("header");

const stickHeader = () => {
	return header.classList.toggle ("sticky", this.window.scrollY > 200)
}



/**
 * 	Mobile Navigation Variable and Function Declarations
 *
 */

const mobileNavBtn = document.querySelector(".mobile-navlist-btn");
const mobileNav = document.querySelector(".navlist");

// Mobile Navigation Toggle 
const toggleNav = () =>  {
	
    const isVisible = mobileNav.getAttribute("data-visible");
	
    if (isVisible === "false"){
		mobileNav.setAttribute("data-visible", true);
		document.body.style.overflowY = "hidden";
    }

    else{
        mobileNav.setAttribute("data-visible", false);
        document.body.style.overflowY = "auto"; 
    }
};



/**
 * 	Prediction-Form Variable and Function Declarations
 *
 */
 
 
/* select box function */

// const selectBtns = document.querySelectorAll(".select-btn");

// selectBtns.forEach(item => {
	// let itemParent = item.parentElement;
	// item.addEventListener("click", () => {
		// itemParent.classList.toggle("active");
	// });

    // let btnText = item.querySelector("span")
    // let selectOptions = itemParent.querySelector(".select-options")
    // let options = selectOptions.querySelectorAll("li")
    // let inputField = selectOptions.parentElement.querySelector(".text-input");

    // options.forEach(option => {
        // option.addEventListener("click", () => {
            // inputField.style.display = "block";
            // inputField.value = option.getAttribute("class");
            // btnText.innerText = option.innerText;
            // itemParent.classList.toggle("active");
        // })
    // })
// });



const resultContainer = document.querySelector(".result-container");
const predictResult = document.getElementById("pred-result");

let text1 = "Slight Injury";
let text2 = "Serious Injury";
let text3 = "Fatal injury";

// let color1 = "#db8b23";
// let color2 = "#06630c";
// let color3 = "#db2f23";

// Prediction has been made
if(predictResult) {
	let predictText = predictResult.innerHTML;
	
	console.log(predictText);
	
	if(predictText.includes(text1)){
		resultContainer.style.background = color1;
	}
	else if(predictText.includes(text2)){
		resultContainer.classList.add('orange');
	}
	else{
		resultContainer.style.background = color3;
	}
}


/**
 * 	Map Variable and Function Declarations
 *
 */


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



