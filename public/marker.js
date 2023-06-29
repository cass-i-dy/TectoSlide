// Collect data from User Input


// const playerNameEl = document.getElementById("user_name");
//         const storedUserName = localStorage.getItem("userName");

//             playerNameEl.textContent = storedUserName;

async function location_information() {
    const locationNameEl = document.querySelector("#location");
    const featureNameEl = document.querySelector("#features");
    const infoNameEl = document.querySelector("#notes");
    const userNameEl = localStorage.getItem("userName");
    const dateNameEl = document.querySelector("#date");
    const mapLatEl = localStorage.getItem("latitude");
    const mapLonEl = localStorage.getItem("longitude")

    localStorage.setItem("locationName", locationNameEl.value);
    localStorage.setItem("featureName", featureNameEl.value);
    localStorage.setItem("infoName", infoNameEl.value);
    localStorage.setItem("dateName", dateNameEl.value);

  
    // const response = await fetch("/api/data")
    // const temp = await response.json()
    // console.log(response)

    let infos = [];
    const infosText = localStorage.getItem('infos');
    if (infosText) {
      infos = JSON.parse(infosText);
    }

    const newInfo = {
        lat: mapLatEl,
        long: mapLonEl,
        location: locationNameEl.value,
        features: featureNameEl.value,
        notes: infoNameEl.value,
        user: userNameEl,
        date: dateNameEl.value,
        // map_location: mapLocationNameEl
    };

    const response = await fetch("/api/data", {
      headers: {"content-type" : "application/json"},
      body: JSON.stringify(newInfo),
      method:"post"
    })

    infos.push(newInfo);

    localStorage.setItem('infos', JSON.stringify(infos));

    window.location.href = "alldata.html";
  }