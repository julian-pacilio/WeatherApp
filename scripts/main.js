const API_KEY = '2b875b8bda30f38de424941737bb0589';
const LANG = 'es';

const inputSearch = document.getElementById('citySearch');
const buttonSearch = document.getElementById('btnSearch');
const result = document.getElementById('result');

buttonSearch.addEventListener('click', e => {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=${API_KEY}&units=metric&lang=${LANG}`)

        .then( resp => resp.json() )
        .then( data => {
            console.log(data);

            result.innerHTML = 
            `
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

})
