document.querySelector("#btn-get").addEventListener("click", function () {
  if (!document.querySelector("#day").value) {
    alert("Sisesta palun kuupäev");
    return;
  }

  const params = new URLSearchParams({
    lat: document.querySelector("#latitude").value,
    lng: document.querySelector("#longitude").value,
    date: document.querySelector("#day").value.split("T")[0]
  })
  // const url ="https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2022-04-16"
  const url = `https://api.sunrise-sunset.org/json?${params.toString()}`
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      document.querySelector("#sunrise").textContent = json.results.sunrise;
      document.querySelector("#sunset").textContent = json.results.sunset
      
      const time = json.results.day_length.split(":");
      const timeSec = time[2]*1 + time[1] * 60 + time[0] * 60 *60;
      console.log(timeSec);
      console.log(24*60*60);
      
      const nightHour =(((24 * 60 * 60) - timeSec)/3600);
      const hours= Math.floor(nightHour);
      const nightMinutes = (nightHour-hours)*60;
      const minutes =Math.floor(nightMinutes);
      const nightSeconds = (nightMinutes-minutes)*60;
      const seconds = Math.floor(nightSeconds);

        nightTime= [hours,minutes, seconds].join(":");

      
      
      
      document.querySelector("#nighttime").textContent = nightTime;
      // document.querySelector("#daytime").textContent = json.results.day_length;
    })

})
