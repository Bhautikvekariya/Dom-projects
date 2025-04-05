document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 },
    ];
  
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve saved cart data
  
    const productlist = document.getElementById("product-list");
    const cartitems = document.getElementById("cart-items");
    const emptycartmessage = document.getElementById("empty-cart");
    const carttotalmessage = document.getElementById("cart-total");
    const totalpricedisplay = document.getElementById("total-price");
    const checkoutbtn = document.getElementById("checkout-btn");
  
    // Populate products in the UI
    products.forEach((product) => {
        const productdiv = document.createElement("div");
        productdiv.classList.add("product");
        productdiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span> 
            <button data-id="${product.id}" class="add-to-cart">Add to cart</button>
        `;
        productlist.appendChild(productdiv);
    });
  
    // Load cart from localStorage on page load
    rendercart();
  
    // Add event listener to product list
    productlist.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            addtocart(product);
        }
    });
  
    function addtocart(product) {
        cart.push(product);
        saveCartToLocalStorage();
        rendercart();
    }
  
    function rendercart() {
        cartitems.innerHTML = "";
        let totalprice = 0;
  
        if (cart.length > 0) {
            emptycartmessage.classList.add("hidden");
            carttotalmessage.classList.remove("hidden");
  
            cart.forEach((item, index) => {
                totalprice += item.price;
                const cartitem = document.createElement("div");
                cartitem.classList.add("cart-item");
                cartitem.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)}
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartitems.appendChild(cartitem);
            });
  
            totalpricedisplay.textContent = `$${totalprice.toFixed(2)}`;
        } else {
            emptycartmessage.classList.remove("hidden");
            carttotalmessage.classList.add("hidden");
            totalpricedisplay.textContent = "$0.00";
        }
    }
  
    // Event listener to remove items from the cart
    cartitems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            cart.splice(index, 1); // Remove the item at the specified index
            saveCartToLocalStorage();
            rendercart(); // Refresh the cart
        }
    });
  
    // Checkout button functionality
    checkoutbtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add an item before checkout!");
        } else {
            cart.length = 0; // Clear cart
            saveCartToLocalStorage();
            rendercart(); // Refresh UI
            alert("Checkout successful!");
        }
    });
  
    function saveCartToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
  });