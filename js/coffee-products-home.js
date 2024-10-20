document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/coffee-data-home.json")
    .then((response) => response.json())
    .then((data) => {
      let coffeeData = data.coffees;
      const coffeesList = document.getElementById("coffee-products");

      if (!coffeesList) {
        return;
      }

      function displayProducts() {
        coffeesList.innerHTML = "";
        coffeeData.forEach((product) => {
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

      displayProducts();

      i18next.on("languageChanged", function () {
        displayProducts();
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
