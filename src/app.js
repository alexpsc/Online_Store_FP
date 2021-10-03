import { http } from "./http.js";
import { ui } from "./ui.js";

const spinner = document.getElementById("spinner");

//add products to UI
document.addEventListener("DOMContentLoaded", addProductsToUi);

function addProductsToUi() {
  //get all products
  const url = "https://61439425c5b553001717d012.mockapi.io/articles";

  http.getProducts(url).then((products) => {
    spinner.setAttribute("hidden", "");
    ui.displayProducts(products);
  });
  ui.updateCartIcon();
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("details-btn")) {
    const id = e.target.getAttribute("data-id");
    const url = `https://61439425c5b553001717d012.mockapi.io/articles/${id}`;
    http.getProducts(url).then((products) => {
      window.location.href = `./details.html?id=${products.id}`;
    });
  }
});
