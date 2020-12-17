const Clocation = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const body = document.querySelector('body');

const updateUI = (data)=>{
    const cityData = data.cityData;
    const weather = data.weather;
    
    details.innerHTML = `
    <h5 class = "my-3">${cityData.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
    `
    if(card.classList.contains('d-none'))
    {
        card.classList.remove('d-none');
    }

    let timesrc = null;
    if(weather.IsDayTime){
        timesrc = 'img/day.svg';
        body.classList.remove('night');
        body.classList.add('day');
    }else{
        timesrc = 'img/night.svg'
        body.classList.remove('day');
        body.classList.add('night');
    }
    time.setAttribute('src',timesrc);

    const iconsrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconsrc);
    



};





const updateCity = async (city)=>{
    const cityData = await getCity(city);
    const weather = await getWeather(cityData.Key);

    return{
        cityData: cityData,
        weather: weather
    }
};;





Clocation.addEventListener('submit',e=>{
    e.preventDefault();
    const city = Clocation.city.value.trim();
    Clocation.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err =>console.log(err));

});


