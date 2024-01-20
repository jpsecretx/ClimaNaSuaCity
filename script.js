document.querySelector('#busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nomeCidade = document.querySelector('#nome_cidade').value;

    if (!nomeCidade) {
        document.querySelector('#clima').classList.remove('show');
        mostrarAlerta('Você precisa digitar uma cidade...')
        return;
    }
    const apiKey = 'f1dba429f59aa20302e9d8dd3e145db6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod == 200) {
        mostrarInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        mostrarAlerta (`
        Não foi possível localizar...
        
        <img src="img/undraw_Warning_re_eoyh.png"/>
        `)
    }
});

function mostrarInfo(json){
    mostrarAlerta('');
    document.querySelector('#clima').classList.add('show');
    document.querySelector('#titulo').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#tempo_valor').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')} <sup>c°</sup>`;
    document.querySelector('#tempo_descricao').innerHTML = `${json.description}`;
    document.querySelector('#tempo_img').setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('#tempo_max').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')} <sup>c°</sup>`;
    document.querySelector('#tempo_min').innerHTML = `${json.temp.toFixed(1).toString().replace('.',',')} <sup>c°</sup>`;
    document.querySelector('#humidade').innerHTML = `${json.humidity}%`;
    document.querySelector('#vento').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function mostrarAlerta(msg) {
    document.querySelector('#alerta').innerHTML = msg;
}