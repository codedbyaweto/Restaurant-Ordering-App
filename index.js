import menuArray from "./Resturant-Ordering-App/data.js";

const menu = document.getElementById("menu");
const payment = document.getElementById("payment-section");
const orders = document.getElementById("order");

let order = [];

// Render menu
function renderMenu() {
    let menuHtml = "";

    menuArray.forEach(item => {
        menuHtml += `
        <div class="menu-item">
            <div>
                <span class="emoji">${item.emoji}</span>
                <h3>${item.name}</h3>
                <p>${item.ingredients.join(", ")}</p>
                <p>$${item.price}</p>
            </div>
            <button data-add="${item.id}">+</button>
        </div>
        `;
    });

    menu.innerHTML = menuHtml;
}

renderMenu();

// Render Order
function renderOrder() {
    if (order.length === 0) {
        orders.innerHTML = "";
        return;
    }

    let orderHtml = `<h2>Your Order</h2>`;
    let total = 0;

    order.forEach(item => {
        orderHtml += `
            <div class="order-item">
                <p>${item.name} - $${item.price}</p>
                <button data-remove="${item.id}">remove</button>
            </div>
        `;
        total += item.price;
    });

    orderHtml += `
        <h3>Total: $${total}</h3>
        <button id="complete-order-btn">Complete Order</button>
    `;

    orders.innerHTML = orderHtml;
}

// Handle Payment
function handlePayment() {
    const name = document.getElementById("card-name").value.trim();

    if (!name) {
        alert("Please enter your name");
        return;
    }

    payment.classList.add("hidden");
    orders.innerHTML = "";
    order = [];

    document.getElementById("success").innerText =
        `Thanks, ${name}! Your order is on the way 🚀`;
}

// Event Listener
document.addEventListener("click", function (e) {
    // Add item
    if (e.target.dataset.add) {
        const itemId = Number(e.target.dataset.add);
        const item = menuArray.find(menuItem => menuItem.id === itemId);

        order.push(item);
        renderOrder();
    }

    // Remove item
    if (e.target.dataset.remove) {
        const removeId = Number(e.target.dataset.remove);

        order = order.filter(item => item.id !== removeId);
        renderOrder();
    }

    // Show payment section
    if (e.target.id === "complete-order-btn") {
        payment.classList.remove("hidden");
    }

    // Pay
    if (e.target.id === "pay-btn") {
        handlePayment();
    }
});
