async function fetchAsync (address) {
  const formattedAddress = encodeURI(address);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}`);
  return await response.json();
}

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener( 'submit', (e) => {
  e.preventDefault();

  console.clear();

  const address = e.target.elements.address.value;
  e.target.elements.address.value = '';
  result.innerHTML = '<div class="loader">Loading...</div>';

  fetchAsync(address).then((data) => {
    console.log(data.results);
    const lat = data.results[0].geometry.location.lat;
    const long = data.results[0].geometry.location.lng;

    result.innerHTML = `Showing coordinates for: ` + address;
    result.innerHTML += `
      <p>
        <label for="lat">Latitude</label>
        <input id="lat" autofocus type="text" value="${lat}" readonly />
      </p>
      <p>
        <label for="lng">Longitude</label>
        <input id="lng" type="text" value="${long}" readonly />
      </p>`;
  })
} );