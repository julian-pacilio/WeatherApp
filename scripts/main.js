const API_KEY = '';
const LANG = 'es';

const body = document.querySelector('body');
const inputSearch = document.getElementById('citySearch');
const buttonSearch = document.getElementById('btnSearch');
const result = document.getElementById('result');

let error = document.createElement('p');
    error.classList = "error";

buttonSearch.addEventListener('click', e => {
    e.preventDefault();

    Validate(inputSearch.value);

    if (flag === false) {
        Errors();
    }

    if (flag === false && result != "") {
        result.innerHTML="";
        Errors();
    }

    if (flag === true) { 

        result.innerHTML="";

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=${API_KEY}&units=metric&lang=${LANG}`)

        .then( resp => resp.json() )
        .then( data => {
            console.log(data);

            result.innerHTML = 
            `
            <h2>${data.name}</h2>
            <ul>
                <li>Temperatura Máxima: ${Math.round(data.main.temp_max)} ºC</li>
                <li>Temperatura Mínima: ${Math.round(data.main.temp_min)} ºC</li>
                <li>Humedad: ${data.main.humidity}%</li>
                <li>Sensación Térmica: ${Math.round(data.main.feels_like)} ºC</li>
                <li>Presión Atmosférica: ${data.main.pressure} mbar</li>
                <li>Velocidad de viento: ${Math.round(data.wind.speed * 3,6 )}</li>
            </ul>
            `
        })

        inputSearch.value="";

        console.log('Fetch Complete')
    }
})

// Validations & Erorr generation

const Validate = (string) => {

    const regExp = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;

    if(string.match(regExp)) {

        flag = true;

        return console.log('success')

    } else {

        flag = false;

        return console.log('error')
    }
};

const Errors = () => {
    error.innerHTML = 'You must introduce a city';
    inputSearch.before(error);
    setTimeout( () => { error.remove() }, 1500);
};