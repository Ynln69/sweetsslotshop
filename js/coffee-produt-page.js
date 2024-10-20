const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch("./data/coffee-data.json")
  .then((response) => response.json())
  .then((data) => {
    const product = data.coffees.find((p) => p.id == productId);

    if (product) {
      const productMarkup = `
          <div>
            <img src="${product.photo}" alt="${product.title}" class="product-image" />
          </div>
          <div class="product-info">
            <h2 class="product-info-title" data-translate="coffee.cardTitle${product.id}">${product.title}</h2>
            <p class="product-info-price">${product.price} PLN</p>
            <p class="product-info-description" data-translate="coffee.cardDesc${product.id}">${product.description}</p>
          </div>
      `;

      document.getElementById("product-container").innerHTML = productMarkup;

      updateTranslations();
    } else {
      console.error("Продукт не знайдено");
    }
  })
  .catch((error) => console.error("Помилка при завантаженні JSON:", error));

function updateTranslations() {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.textContent = i18next.t(key);
  });
}
