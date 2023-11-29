// Réalisation (API)
document.addEventListener("DOMContentLoaded", function () {
  
  const portfolioContainer = document.getElementById("portfolio-container");
  const filterButtons = document.querySelectorAll(".filtre");

  // Fetch data from the provided API
  fetch("https://pierre-delaunay.fr/wp-json/wp/v2/portfolio/?per_page=36&_embed")
      .then(response => response.json())
      .then(data => {
          // Create buttons for each project type
        //   const projectTypes = ["all", "Design", "Web", "Mobile", "Formation"];
        //   projectTypes.forEach(type => {
        //       const button = document.createElement("button");
        //       button.textContent = type;
        //       button.setAttribute("data-filter", type);
        //       filterButtons.forEach(button => button.addEventListener("click", function () {
        //           filterItems(this.getAttribute("data-filter"));
        //       }));
        //   });

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
