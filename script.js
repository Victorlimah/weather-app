function pegarLocalizacao() {
  ativaDesativaCarregando();
  console.log("Entrei em pegarLocalizacao");
  if (navigator.geolocation) {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(pegarInformacoesClima, pegarErro);
  } else {
    alert("Seu navegador não suporta a API de geolocalização.");
  }
}

function pegarInformacoesClima(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log("Entrou pegar info Clima");
  const promisse = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f25110b0f83adb9f7c080ee182cd1d00`
  );
  promisse.then(pegarDetalhesClima); //LINKAR COM A FUNCAO pegarDetalhesClima(resposta)
  promisse.catch(pegarErro);
}

function pegarErro() {
  console.log("Deu Erro!!!");
}

function buscarCidade() {
  ativaDesativaCarregando();
  let cidade = document.querySelector(".nome-cidade").value;
  if (cidade != "") {
    pegarInformacoesClimaPorCidade(cidade);
  }
}

function pegarInformacoesClimaPorCidade(city) {
  const promisse = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f25110b0f83adb9f7c080ee182cd1d00`
  );
  promisse.then(pegarDetalhesClima);
  promisse.catch(pegarErro);
}

function pegarDetalhesClima(info) {
  console.log("Entrei em pegarDetalhesClima");
  console.log(info.data);
  if (info.cod == "404") {
    console.log("O nome da cidade não é válido.");
  } else {
    const cidade = info.data.name;
    const pais = info.data.sys.country;
    const clima = info.data.weather[0].main;
    const id = info.data.weather[0].id;
    const temperatura = info.data.main.temp;
    const temperaturaMin = info.data.main.temp_min;
    const temperaturaMax = info.data.main.temp_max;
    const sensacaoTermica = info.data.main.feels_like;
    const umidade = info.data.main.humidity;
    const pressao = info.data.main.pressure;
    const visibilidade = info.data.visibility;
    const velocidadeVento = info.data.wind.speed;

    const iconeClima = document.querySelector(".imagem-icone-clima");

    if (id == 800) {
      iconeClima.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      iconeClima.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
      iconeClima.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      iconeClima.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      iconeClima.src = "icons/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      iconeClima.src = "icons/rain.svg";
    }

    renderizaInfos(
      cidade,
      pais,
      clima,
      id,
      temperatura,
      temperaturaMin,
      temperaturaMax,
      sensacaoTermica,
      umidade,
      pressao,
      visibilidade,
      velocidadeVento
    );

    const primeiraTela = document.querySelector(".container");
    primeiraTela.classList.add("hidden");
    const ultimaTela = document.querySelector(".mostrando-info-clima");
    ultimaTela.classList.remove("hidden");
  }
}

function ativaDesativaCarregando() {
  const telaDeBusca = document.querySelector(".tela-de-busca");
  const telaCarregando = document.querySelector(".tela-carregando");
  telaDeBusca.classList.toggle("hidden");
  telaCarregando.classList.toggle("hidden");
}

function renderizaInfos(
  cidade,
  pais,
  clima,
  id,
  temperatura,
  temperaturaMin,
  temperaturaMax,
  sensacaoTermica,
  umidade,
  pressao,
  visibilidade,
  velocidadeVento
) {
  const cidadeTela = (document.querySelector(
    ".cidade"
  ).innerText = `${cidade}`);
  const climaTela = (document.querySelector(".clima").innerText = ` ${clima}`);
  const tempAtualTela = (document.querySelector(
    ".temperatura-atual"
  ).innerText = `${temperatura}°C`);
  const tempMinTela = (document.querySelector(
    ".temperatura-minima"
  ).innerText = `${temperaturaMin}°C`);
  const tempMaxTela = (document.querySelector(
    ".temperatura-maxima"
  ).innerText = `${temperaturaMax}°C`);
  const sensTerm = (document.querySelector(
    ".sensacao-termica"
  ).innerText = `${sensacaoTermica}`);
  const humidadeTela = (document.querySelector(
    ".humidade"
  ).innerText = `${umidade}`);
  const ventoTela = (document.querySelector(
    ".vento"
  ).innerText = ` ${velocidadeVento}`);
  ativaDesativaCarregando();
}

function kelvinParaCelsius(kelvin) {
  console.log(`esse é kelvin: ${kelvin}`);
  let celsius = parseInt(kelvin) - 273;

  console.log(celsius);
  return celsius;
}

function recarregarPagina() {
  window.location.reload();
}
