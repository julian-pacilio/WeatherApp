const API_KEY = '2b875b8bda30f38de424941737bb0589';
const LANG = 'es';
const UNITS = 'metric';

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

    if (flag === true) { 

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`)

        .then( resp => resp.json() )
    
        .then( data => {
            ShowResults(data);
        });  

        result.innerHTML="";

        inputSearch.value="";

        console.log('Fetch Complete')
    }
})

// Functions 

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
    setTimeout( () => { error.remove() }, 2000);
};

const ShowResults = data => {

    let h2 = document.createElement('h2');
        h2.textContent = data.name;
        result.append(h2);
        
    let temp = document.createElement('span');
        temp.classList = 'temp';
        temp.textContent = `${Math.round(data.main.temp)} ºC`;
        result.append(temp);

    let description = document.createElement('span');
        description.classList = 'description';
        description.textContent = data.weather[0].description;
        result.append(description);

    let img = document.createElement('img');
        img.classList = 'icon';
        img.alt = data.weather[0].description;
        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        result.append(img);

    let ul = document.createElement('ul');
        result.append(ul);

    let t_max = document.createElement('li');
        t_max.textContent = `Temperatura Máxima: ${Math.round(data.main.temp_max)} ºC`;
        ul.append(t_max);

    let t_min = document.createElement('li');
        t_min.textContent = `Temperatura Mínima: ${Math.round(data.main.temp_min)} ºC`;
        ul.append(t_min);
        
    let hum = document.createElement('li');
        hum.textContent = `Humedad: ${data.main.humidity} %`;
        ul.append(hum);

    let st = document.createElement('li');
        st.textContent = `Sensación Térmica: ${Math.round(data.main.feels_like)} ºC`;
        ul.append(st);

    let pa = document.createElement('li');
        pa.textContent = `Presión Atmosférica: ${data.main.pressure} mbar`;
        ul.append(pa);

    let vs = document.createElement('li');
        vs.textContent = `Velocidad de viento: ${Math.round(data.wind.speed * 3,6 )} km/h`;
        ul.append(vs);
};
