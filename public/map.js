let map;

function loadMarkers() {
    let infos = [];
    const infosText = localStorage.getItem('infos');
    if (infosText) {
      infos = JSON.parse(infosText);
    }
  
  
    if (infos.length) {
      for (const [i, info] of infos.entries()) {
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(info.lat), lng: parseFloat(info.long) },
            map: map,
            title: info.location,
        });

    const contentString =
    `<div id="content">
    <h1 id="firstHeading" class="firstHeading">${info.location}</h1>
    <div id="bodyContent">
      <p>${info.features}</p>
      <p>${info.notes}</p>
      <p>Added by: ${info.user}</p>
      <p>Date: ${info.date}</p>
    </div>
  </div>`;


const infowindow = new google.maps.InfoWindow({
    content: contentString,
})


marker.addListener("click", () => {
    infowindow.open(map,marker);
})
      }
    }
}




function initialize_map() {
map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(40.2338, -111.6585),
        zoom:12
});

map.addListener('click', function(event){
    var clickedLatLng = event.latLng;

    var marker = new google.maps.Marker({
        position: clickedLatLng,
        map:map
    });

    localStorage.setItem('latitude', clickedLatLng.lat());
    localStorage.setItem('longitude', clickedLatLng.lng());

    let newloc = "marker.html"
    window.location.href = newloc;
});

loadMarkers();


}


window.initMap = initialize_map;


document.addEventListener("DOMContentLoaded", function() {  
    const playerNameEl = document.getElementById("user_name");
    const storedUserName = localStorage.getItem("userName");

    playerNameEl.textContent = storedUserName;
});


// chat box

document.getElementById("open-chat").addEventListener("click", function() {
    document.getElementById("chat-window").style.display = "block";
  });
  
  // To close the chat window
  document.getElementById("close-chat").addEventListener("click", function() {
    document.getElementById("chat-window").style.display = "none";
  });