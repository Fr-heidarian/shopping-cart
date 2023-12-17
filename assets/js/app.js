const addToCart_btns = document.querySelectorAll(
  "button[data-btn='add-to-cart']"
);

const totalQty = document.querySelector("#total-qty");

let cart = [ 
  { id: 1, image: "", title: "", qty: 3 },
  { id: 2, image: "", title: "", qty: 5 },
];



addToCart_btns.forEach((item) => {
  item.addEventListener("click", (e) => {
    ++totalQty.innerText;



    const product = e.target.parentElement.parentElement.parentElement.parentElement;
    const titleProduct = product.querySelector(".card-title").innerText;
    const imgProduct = product.querySelector("img").src;
    const priceProduct = product.querySelector(".price-product").innerText;

    const itemCart = ` <div class="card mb-3 item-cart" style="max-width: 430px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src=${imgProduct} class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <div  class="d-flex justify-content-between align-items-center">
                                                    <h5 class="card-title">${titleProduct}</h5>
                                                    <i class="bi bi-trash3-fill text-danger"></i>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="card-text mb-0">
                                                        <span class="text-body-secondary price-item">${priceProduct}</span>
                                                    </p>
                                                    <p class="card-text"> qty: <span class="qty-item">1</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
       document.querySelector(".cart-items").innerHTML += itemCart;                         



  });
});
