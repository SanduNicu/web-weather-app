const fetchData = (location) => {
  return fetch(`/weather?address=${location}`)
    .then((res) => res.json())
}

const form = document.querySelector('.weather-form');
const search = document.querySelector('.weather-input')
const locationParagraph = document.querySelector('h2.location')
const resultsParagraph = document.querySelector('p.results')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  resultsParagraph.textContent = 'Loading...';
  location.textContent = '';
  fetchData(location)
    .then((data) => {
      if (data.error) {
        resultsParagraph.textContent = data.error;
        locationParagraph.textContent = '';
      } else {
        const { summary, temperature, precipProbability, location } = data;
        const message = `${summary} Temperature: ${Math.round(temperature)}C. Precipitation: ${Math.round(precipProbability)}%`
        locationParagraph.textContent = location;
        resultsParagraph.textContent = message;

      }

    })
  
})
