const addToCart_btns = document.querySelectorAll(
  "button[data-btn='add-to-cart']"
);

const totalQty = document.querySelector("#total-qty");
const totalPrice = document.querySelector(".total-price");

addToCart_btns.forEach((item) => {
  item.addEventListener("click", (e) => {
    AddToCartHandler(e);
    document.querySelector(".cart-box").style.display = "block";
  });
});

const AddToCartHandler = (e) => {
  const product = e.target.closest(".card");
  const id = product.id;
  const itemCart = document.querySelector(`div[data-cart='${id}']`);

  qtyManage(product); 

  const productInfo = getInfoProduct(product);
  totalPrice.innerText =
    Number(totalPrice.innerText) + Number(productInfo.priceProduct);

  if (itemCart) {
    ++itemCart.querySelector(".qty-item").innerText;
  } else {
    createItemCart(productInfo);
  }
};

// calculateTotalPrice();
const increaseQtyCart = (event) => {
  const product = event.target.closest(".card");
  const id = product.id;
  const itemCart = document.querySelector(`div[data-cart='${id}']`);

  const priceItem = itemCart.querySelector(".price-item").innerText;

  totalPrice.innerText = Number(totalPrice.innerText) + Number(priceItem);

  ++itemCart.querySelector(".qty-item").innerText;
};

const decreseQtyCart = (event) => {
  const product = event.target.closest(".card");
  const id = product.id;
  const itemCart = document.querySelector(`div[data-cart='${id}']`);

  const priceItem = itemCart.querySelector(".price-item").innerText;
  totalPrice.innerText = Number(totalPrice.innerText) - Number(priceItem);

  const currentQty = itemCart.querySelector(".qty-item");
  --currentQty.innerText;
  if (currentQty.innerText == 0) {
    itemCart.closest(".cart-items").removeChild(itemCart);
  }
};

const increaseQty = (event) => {
  ++event.target.previousElementSibling.innerText;
  ++totalQty.innerText;
  increaseQtyCart(event);
};
const decreaseQty = (event) => {
  const currentQty = event.target.nextElementSibling;
  --currentQty.innerText;
  decreseQtyCart(event);
  if (currentQty.innerText == 0) {
    setTimeout(() => {
      const btnAddToCart = ` <button class="btn bg-transparent" data-btn="add-to-cart" onclick={AddToCartHandler(event)}>
                               <i class="bi bi-cart-fill text-white rounded-circle px-2 py-1 bg-warning"></i>
                             </button>`;

      event.target.closest(".add-to-cart-box").innerHTML = btnAddToCart;
    }, 500);
  }
  --totalQty.innerText;
};

const qtyManage = (product) => {
  const qtyBox = `<div class="shadow text-warning bg-white p-2 rounded qty-manager">
                    <span class="p-2"  onclick={decreaseQty(event)}>-</span>
                    <span class="p-2 qty-product">1</span>
                    <span class="p-2"  onclick={increaseQty(event)}>+</span>
                  </div>`;
  ++totalQty.innerText;
  product.querySelector(".add-to-cart-box").innerHTML = qtyBox;
};

const getInfoProduct = (product) => {
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
                                                    <i class="bi bi-trash3-fill text-danger" class="trash-icon" onclick={deleteItems(event)}></i>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="card-text mb-0">
                                                        <span class="text-body-secondary price-item">${productInfo.priceProduct}</span>$
                                                    </p>
                                                    <p class="card-text"> qty: <span class="qty-item">1</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
  document.querySelector(".cart-items").innerHTML += itemCart;
};

// Remove Items test

const deleteItems = (event) => {
  const itemCart = event.target.closest(".item-cart");
  const priceItem = Number(itemCart.querySelector(".price-item").innerText);
  const qtyItem = Number(itemCart.querySelector(".qty-item").innerText);

  totalPrice.innerText = Number(totalPrice.innerText) - priceItem * qtyItem;
  totalQty.innerText = Number(totalQty.innerText) - qtyItem;

  itemCart.remove();

  if (!document.querySelector(".item-cart")) {
    document.querySelector(".cart-box").style.display = "none";
  }
};
