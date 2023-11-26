const body = document.querySelector('body'),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");
const toggler = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".navlinks-container");

// SIDEBAR
const toggleNav = e => {
  // Animation du bouton
  toggler.classList.toggle("open");

  const ariaToggle =
    toggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
  toggler.setAttribute("aria-expanded", ariaToggle);

  // Slide de la navigation
  navLinksContainer.classList.toggle("open");
};

toggler.addEventListener("click", toggleNav);


new ResizeObserver(entries => {
  if (entries[0].contentRect.width <= 900){
    navLinksContainer.style.transition = "transform 0.4s ease-out";
  } else {
    navLinksContainer.style.transition = "none";
  }
}).observe(document.body)

// // Température
// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };
// const localisation = document.querySelector(".localisation");

// function success(pos) {
//   const crd = pos.coords;

//   localisation.textContent = `Votre position acttuelle est de Latitude : ${crd.latitude} Longitude: ${crd.longitude} More or less ${crd.accuracy} meters.`;
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// };

// let latitude = 0;
// let longitude = 0;
// const temperature = document.querySelector(".temperature");
// const button = document.querySelector("#position");
// button.addEventListener("click", () => {
// navigator.geolocation.getCurrentPosition(success, error, options)
// fetch(`https://weather.contrateumdev.com.br/api/weather?lat=${latitude}&lon=${longitude}`)
// .then((response) => {
//   return response.json();
// })
// .then((data) => temperature.textContent = data.main.temp + " °C");
// }
// );


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

// // Réalisation (API)
document.addEventListener("DOMContentLoaded", function () {
  const portfolioContainer = document.getElementById("portfolio-container");
  const filterButtons = document.querySelectorAll(".filtre");

  // Fetch data from the provided API
  fetch("https://pierre-delaunay.fr/wp-json/wp/v2/portfolio/?per_page=36&_embed")
      .then(response => response.json())
      .then(data => {
          // Create buttons for each project type
          // const projectTypes = ["all", "Design", "Web", "Mobile", "Formation"];
          // projectTypes.forEach(type => {
          //     const button = document.createElement("button");
          //     button.textContent = type;
          //     button.setAttribute("data-filter", type);
          //     filterButtons.forEach(button => button.addEventListener("click", function () {
          //         filterItems(this.getAttribute("data-filter"));
          //     }));
          // });

          // Function to filter items based on project type
          function filterItems(type) {
              portfolioContainer.innerHTML = ""; // Clear the container

              data.forEach(item => {
                  const itemType = item.acf && item.acf.project_type ? item.acf.project_type : null;

                  if (type === "all" || itemType === type) {
                      const portfolioItem = document.createElement("div");
                      portfolioItem.classList.add("portfolio-item");

                      const title = item.title.rendered;
                      const content = item.content.rendered;
                      const imageUrl = item._embedded && item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url : '';

                      portfolioItem.innerHTML = `
                          <h2>${title}</h2>
                          <img src="${imageUrl}" alt="${title}">
                          <div>${content}</div>
                      `;

                      portfolioContainer.appendChild(portfolioItem);
                  }
              });
          }

          // Initial load with "All" filter
          filterItems("all");
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
});
