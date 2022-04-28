document.querySelector("#btn-get").addEventListener("click", function () {
  const params = new URLSearchParams({
    lat: document.querySelector("#latitude").value,
    lng: document.querySelector("#longitude").value,
    date: document.querySelector("#day").valueAsDate.toISOString().split("T")[0]
  })
  // const url ="https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2022-04-16"
  const url = `https://api.sunrise-sunset.org/json?${params.toString()}`
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      document.querySelector("#sunrise").textContent = json.results.sunrise;
      document.querySelector("#sunset").textContent = json.results.sunset

    })

})
