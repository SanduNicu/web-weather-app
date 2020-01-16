console.log('Js loaded');

const fetchData = () => {
  fetch('http://localhost:3000/weather?address=bucharest')
    .then((res) => res.json())
    .then((aa) => console.log(aa))
}

fetchData();
