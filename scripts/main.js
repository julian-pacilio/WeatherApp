//WEATHER API
const API_KEY = '2b875b8bda30f38de424941737bb0589';
const LANG = 'en';
const UNITS = 'metric';

//TOM TOM MAP API
const API_KEY_TOM = 'AVD7wMbBHMFyutCl5hmZi71BUdNI1X4g';
const ZOOM = '10';
const WIDTH = '425';
const HEIGHT = '425';

const body = document.querySelector('body');
const inputSearch = document.getElementById('citySearch');
const buttonSearch = document.getElementById('btnSearch');
const result = document.getElementById('result');
const map_image = document.getElementById('map')

let error = document.createElement('p');
    error.classList = "error";

buttonSearch.addEventListener('click', e => {
    e.preventDefault();

    Validate(inputSearch.value);

    if (flag === false) {
        Errors();
    };

    if (flag === true) {
        error.remove() 
        storage = inputSearch.value;
        localStorage.setItem('city', JSON.stringify(storage));
        Search();
        result.innerHTML="";
    };
});

// Functions 

const Validate = (string) => {
    
    const regExp = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    if(string.match(regExp)) {
        return flag = true;
    } else {
        return flag = false;
    }
};

const Errors = () => {

    error.innerHTML = 'You must introduce a city';
    inputSearch.before(error);
};

const Search = () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`)
    
    .then( resp => resp.json() )
    
    .then( data => {
            lat = data.coord.lat;
            lon = data.coord.lon;
            MapSearch(lat,lon);
            ShowResults(data);
    });  

    inputSearch.value="";
};

const MapSearch = () => {

    fetch(`https://api.tomtom.com/map/1/staticimage?key=${API_KEY_TOM}&center=${`${lon},${lat}`}&zoom=${ZOOM}&width=${WIDTH}&height=${HEIGHT}&style=night`)

    .then( resp => { map.src = resp.url });
};

const ShowResults = data => {

    let h2 = document.createElement('h2');
        h2.innerHTML = data.name;
        result.append(h2);
        
    let temp = document.createElement('span');
        temp.classList = 'temp';
        temp.innerHTML = `${Math.round(data.main.temp)} ºC`;
        result.append(temp);

    let description = document.createElement('span');
        description.classList = 'description';
        description.innerHTML = data.weather[0].description;
        result.append(description);

    let img = document.createElement('img');
        img.classList = 'icon';
        img.alt = data.weather[0].description;
        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        result.append(img);

    let ul = document.createElement('ul');
        result.append(ul);

    let t_max = document.createElement('li');
        t_max.innerHTML = `<strong>Max Temperature</strong> ${Math.round(data.main.temp_max)}ºC`;
        ul.append(t_max);

    let t_min = document.createElement('li');
        t_min.innerHTML = `<strong>Min Temperature</strong> ${Math.round(data.main.temp_min)}ºC`;
        ul.append(t_min);
        
    let hum = document.createElement('li');
        hum.innerHTML = `<strong>Humidity</strong> ${data.main.humidity}%`;
        ul.append(hum);

    let st = document.createElement('li');
        st.innerHTML = `<strong>Feels Like</strong> ${Math.round(data.main.feels_like)}ºC`;
        ul.append(st);

    let pa = document.createElement('li');
        pa.innerHTML = `<strong>Atmospheric Pressure</strong> ${data.main.pressure}mbar`;
        ul.append(pa);

    let vs = document.createElement('li');
        vs.innerHTML = `<strong>Wind Speed</strong> ${Math.round(data.wind.speed * 3,6 )}km/h`;
        ul.append(vs);

    let map = document.createElement('img')
        map.id = 'map';
        result.append(map)
};

const CheckStorage = () => {

    if(!localStorage.getItem('city')) {
        let storage;
    } else {
        Search(inputSearch.value = JSON.parse(localStorage.city));
    }
};
CheckStorage();