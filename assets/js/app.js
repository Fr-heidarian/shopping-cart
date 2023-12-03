const addToCart_btns= document.querySelectorAll("button[data-btn='add-to-cart']")
const totalQty = document.querySelector("#total-qty");

addToCart_btns.forEach((item) => {
    item.addEventListener("click", ()=>{
        ++totalQty.innerText
    })
});