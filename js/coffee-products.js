document.addEventListener("DOMContentLoaded", () => {
  const productsPerPage = 6;
  let currentPage = 1;

  fetch("../data/coffee-data.json")
    .then((response) => response.json())
    .then((data) => {
      let coffeeData = data.coffees;
      const coffeesList = document.getElementById("coffee-products");
      const paginationContainer = document.getElementById("pagination");

      if (!coffeesList) {
        return;
      }

      function displayProducts(page) {
        coffeesList.innerHTML = "";
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const coffeeToDisplay = coffeeData.slice(start, end);

        coffeeToDisplay.forEach((product) => {
          const li = document.createElement("li");
          li.classList.add("coffee-item");

          const translateKeyTitle = `coffee.cardTitle${product.id}`;
          const translateKeyDesc = `coffee.cardDesc${product.id}`;

          li.innerHTML = `
            <a href="../coffee-card-page.html?id=${
              product.id
            }" class="coffee-link">
            <img src="${product.photo}" alt="${
            product.title
          }" class="coffee-item-img">
            <div class="coffee-item-thumb">
              <h3 class="coffee-item-title" data-translate="${translateKeyTitle}">
                ${i18next.t(translateKeyTitle)}
              </h3>
              <p class="coffee-item-desk" data-translate="${translateKeyDesc}">
                ${i18next.t(translateKeyDesc)}
              </p>
            </div>
            </a>
            <div class="coffee-item-wrapper">
              <p class="coffee-item-price">${product.price} PLN</p>
            </div>
          `;
          coffeesList.appendChild(li);
        });
      }

      function setupPagination() {
        if (!paginationContainer) {
          return;
        }
        paginationContainer.innerHTML = "";

        const pageCount = Math.ceil(coffeeData.length / productsPerPage);

        if (pageCount <= 1) {
          return;
        }

        for (let i = 1; i <= pageCount; i++) {
          const button = document.createElement("button");
          button.innerText = i;
          button.classList.add("pagination-button");
          if (i === currentPage) {
            button.classList.add("active");
          }

          button.addEventListener("click", () => {
            currentPage = i;
            displayProducts(currentPage);
            setupPagination();
          });

          paginationContainer.appendChild(button);
        }
      }

      // Ініціалізація
      displayProducts(currentPage);
      setupPagination();

      // Переклад при зміні мови
      i18next.on("languageChanged", function () {
        displayProducts(currentPage);
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
