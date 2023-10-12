const body = document.querySelector('body'),
// sidebar = body.querySelector('nav'),
// toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


// toggle.addEventListener("click" , () =>{
// sidebar.classList.toggle("close");
// })

// searchBtn.addEventListener("click" , () =>{
// sidebar.classList.remove("close");
// })

modeSwitch.addEventListener("click" , () =>{
body.classList.toggle("dark");

if(body.classList.contains("dark")){
modeText.innerText = "Light mode";
}else{
modeText.innerText = "Dark mode";

}
});

// Température
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const localisation = document.querySelector(".localisation");

function success(pos) {
  const crd = pos.coords;

  localisation.textContent = `Votre position acttuelle est de Latitude : ${crd.latitude} Longitude: ${crd.longitude} More or less ${crd.accuracy} meters.`;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

let latitude = 0;
let longitude = 0;
const temperature = document.querySelector(".temperature");
const button = document.querySelector("#position");
button.addEventListener("click", () => {
navigator.geolocation.getCurrentPosition(success, error, options)
fetch(`https://weather.contrateumdev.com.br/api/weather?lat=${latitude}&lon=${longitude}`)
.then((response) => {
  return response.json();
})
.then((data) => temperature.textContent = data.main.temp + " °C");
}
);


// Réalisation (Swipper)
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }
});