document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/chocolate-data-home.json")
    .then((response) => response.json())
    .then((data) => {
      let chocolateData = data.chocolate;
      const chocolateList = document.getElementById("products-list");

      if (!chocolateList) {
        return;
      }

      function displayProducts() {
        chocolateList.innerHTML = "";
        chocolateData.forEach((product) => {
          const li = document.createElement("li");
          li.classList.add("products-item");

          const translateKeyTitle = `chocolate.cardTitle${product.id}`;
          const translateKeyDesc = `chocolate.cardDesc${product.id}`;

          li.innerHTML = `
            <img src="../${product.photo}" alt="${product.title}" class="products-item-img">
              <h3 class="products-subtitle" data-translate="${translateKeyTitle}">
              ${product.title}
              </h3>
              <p class="products-text" data-translate="${translateKeyDesc}">
              ${product.description}
              </p>
              <p class="products-price">
              ${product.price} PLN
              </p>
          `;
          chocolateList.appendChild(li);
        });
      }

      displayProducts();

      i18next.on("languageChanged", function () {
        displayProducts();
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
