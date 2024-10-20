document.addEventListener("DOMContentLoaded", () => {
  const productsPerPage = 6;
  let currentPage = 1;

  fetch("../../data/chocolate-card-en.json")
    .then((response) => response.json())
    .then((data) => {
      let coffeeData = data.coffees;
      const coffeesList = document.getElementById("products-list");
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
          li.classList.add("products-item");

          li.innerHTML = `
            <img src="../../${product.photo}" alt="${product.title}" class="coffee-item-img">
              <h3 class="products-subtitle">
              ${product.title}
              </h3>
              <p class="products-text">
              ${product.description}
              </p>
              <p lass="products-price">
              ${product.price}
              </p>
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
      displayProducts(currentPage);
      setupPagination();
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
