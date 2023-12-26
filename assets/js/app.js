const addToCart_btns = document.querySelectorAll(
  "button[data-btn='add-to-cart']"
);

const totalQty = document.querySelector("#total-qty");

// let cart = [
//   { id: 1, image: "", title: "", qty: 3 },
//   { id: 2, image: "", title: "", qty: 5 },
// ];

const btnAddToCart = ` <button class="btn bg-transparent" data-btn="add-to-cart"> <i
                                                    class="bi bi-cart-fill text-white rounded-circle px-2 py-1 bg-warning"></i></button>`;

addToCart_btns.forEach((item) => {
  item.addEventListener("click", (e) => {
    ++totalQty.innerText;

    const product = e.target.closest(".card");
    qtyManage(product);
    const productInfo = getInfoProduct(product);
    const id = productInfo.idProduct;
    const itemCart = document.querySelector(`div[data-cart='${id}']`);

    if (itemCart) {
      ++itemCart.querySelector(".qty-item").innerText;
    } else {
      createItemCart(productInfo);
    }
  });
});
const qtyManage = (product) => {
  const qtyBox = `<div class="shadow text-warning bg-white p-2 rounded">
  <span class="p-2">-</span>
  <span class="p-2">1</span>
  <span class="p-2">+</span>
</div>`;

  product.querySelector(".add-to-cart-box").innerHTML = qtyBox;
};

const getInfoProduct = (product) => {
  // const product =
  // target.parentElement.parentElement.parentElement.parentElement.parentElement;

  const idProduct = product.id;
  const titleProduct = product.querySelector(".card-title").innerText;
  const imgProduct = product.querySelector("img").src;
  const priceProduct = product.querySelector(".price-product").innerText;

  return { idProduct, titleProduct, imgProduct, priceProduct };
};

const createItemCart = (productInfo) => {
  const itemCart = `<div class="card mb-3 item-cart" style="max-width: 430px;" data-cart="${productInfo.idProduct}">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src=${productInfo.imgProduct} class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <div  class="d-flex justify-content-between align-items-center">
                                                    <h5 class="card-title">${productInfo.titleProduct}</h5>
                                                    <i class="bi bi-trash3-fill text-danger" id="deleteItem"></i>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="card-text mb-0">
                                                        <span class="text-body-secondary price-item">${productInfo.priceProduct}</span>
                                                    </p>
                                                    <p class="card-text"> qty: <span class="qty-item">1</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
  document.querySelector(".cart-items").innerHTML += itemCart;
};

const cartItems = document.querySelector(".cart-items");

cartItems.addEventListener("click", (e) => {
  if (e.target.id === "deleteItem") {
    const itemCart = e.target.closest(".item-cart");
    const qtyItem = itemCart.querySelector(".qty-item");
    // const qty = parseInt(qtyItem.innerText);

    if (qtyItem.innerText > 0) {
      --totalQty.innerText;
      --qtyItem.innerText;

      if (qtyItem.innerText < 1) {
        itemCart.remove();
      }
    }
  }
});
