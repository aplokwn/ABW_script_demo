//Target bike container
const bikesEl = document.querySelector('.bikes')
const loaderEl = document.querySelector('.loader')

//set limit of bike feed we will load
let limit = 9
let page = 1

console.log("run")

//Fetch the bike data from api
async function getBikes () {
  //const API_URL = `https://my-json-server.typicode.com/aplokwn/AWS_JSON/bikes?_page=${page}&limit=${limit}`
  const response = await fetch(
    `https://my-json-server.typicode.com/aplokwn/AWS_JSON/bikes?_page=${page}&limit=${limit}`
  )
  //Turn responce into json
  const data = await response.json()
  console.log("reach")
  console.log(data)
  return data

}



/*
Json reference
{
  "id": 1,
  "bikeId": "ABS-001",
  "title": "json-server",
  "maker": "Argon18",
  "model": "Gallium Pro Disc",
  "price": 200,
  "photoPath": "https://raw.githubusercontent.com/aplokwn/AWS_JSON/main/bikes/bike001.jpg"
}
*/



// Render data into element
async function showBikes () {
  const bikes = await getBikes()

  //Create element for each bike
  bikes.forEach(bike => {
    const bikeEl = document.createElement('div')
    bikeEl.classList.add('content')
    bikeEl.innerHTML = `
            <div class="imagebox"><img src= "${bike.photoPath}" width="250" height="220" alt="bike"></div>
            <h3>Bike Information</h3>
            <p class="bikeInfo">Bike Make: ${bike.maker}</p>
            <p class="bikeInfo">Bike Model: ${bike.model}</p>
            <h6>$${bike.price}</h6>
            </div>
            <button class="buy">Bike id: ${bike.bikeId}</button>
            `
    bikesEl.appendChild(bikeEl)
  })
}

// Add loader animation and fetch more bikes
function showLoading () {
  loaderEl.classList.add('show')

  // after sometime the loader will remove
  setTimeout(() => {
    loaderEl.classList.remove('show')

    // Show more bikes after loader
    setTimeout(() => {
      page++
      showBikes()
    }, 300)
  }, 1000)
}



//Return all bikes to HTML
showBikes()


// Add an event listener on scroll to trigger loader
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading()
  }

})
