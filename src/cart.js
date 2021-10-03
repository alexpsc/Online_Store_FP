import { ui } from "./ui.js";
import {
  getCartFromLocalStorage,
  removeElementFromLocalStorage,
  updateQuantityInLocalStorage,
} from "./localstorage.js";

let storageItems = getCartFromLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
  //display product in cart page

  ui.showProductsCart(storageItems);
  ui.updateCartIcon();
  getCartTotal();
  //remove product from cart page
  const removeBtn = document.querySelectorAll(".btn-danger");

  removeBtn.forEach((elem) => {
    elem.addEventListener("click", removeItems);

    function removeItems(e) {
      e.target.classList.contains("btn-danger");

      const id = e.target.id;

      let row = elem.parentElement.parentElement;
      row.remove();
      removeElementFromLocalStorage(id);
      getCartTotal();
      ui.showConfirmation("Product has been removed from cart", "bg-warning");
    }
  });

  //update quantity in cart
  const inputQty = document.querySelectorAll(".quantity-input");

  inputQty.forEach((elem) => {
    elem.addEventListener("change", (e) => {
      var count = e.target.value;

      let id =
        e.target.parentElement.parentElement.lastElementChild.firstElementChild
          .id;

      if (!isNaN(count) && count > 0) {
        updateQuantityInLocalStorage(id, count);

        // return window.location.reload();
      } else {
        let storageElement = getElementFromLocalStorage(id);
        e.target.value = storageElement.count;
      }
      getCartTotal();
    });
  });
});

function getCartTotal() {
  const rows = document.querySelectorAll(".table-row-cart");
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const price = parseFloat(row.querySelector(".product-price").innerHTML);
    const qty = row.querySelector(".quantity-input").value;
    total += price * qty;
  }
  let totalPrice = document.querySelector("#total-price");
  totalPrice.innerText = total;
  return total;
}
