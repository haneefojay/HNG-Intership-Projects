function updateUTCTime() {
  const now = new Date();
  const utcTime = now.toUTCString().slice(17, 25); 
  document.getElementById("utc-time").innerText = `${utcTime}`;
}

setInterval(updateUTCTime, 1000);



function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();

      document.getElementById("location").innerHTML = ` ${data.address.city || data.address.town || data.address.state}, ${data.address.country}`;
    }, function(error) {
      document.getElementById("location").innerHTML = "Location access denied.";
    });
  } else {
    document.getElementById("location").innerHTML = "Geolocation not supported.";
  }
}


getLocation();
updateUTCTime();





