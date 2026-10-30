
// ===================================
// ARIF RESTAURANT - FOOD DATA
// ===================================

const foods = [
    {
        id: 1,
        name: "Chicken Biryani",
        category: "biryani",
        price: 199,
        description: "Authentic spicy chicken dum biryani.",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=600"
    },
    {
        id: 2,
        name: "Mutton Biryani",
        category: "biryani",
        price: 299,
        description: "Delicious mutton biryani with rich flavors.",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600"
    },
    {
        id: 3,
        name: "Veg Biryani",
        category: "biryani",
        price: 159,
        description: "Fresh vegetables with aromatic rice.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600"
    },
    {
        id: 4,
        name: "Italian Pizza",
        category: "pizza",
        price: 249,
        description: "Delicious pizza loaded with cheese.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
    },
    {
        id: 5,
        name: "Veg Pizza",
        category: "pizza",
        price: 199,
        description: "Fresh vegetables and mozzarella cheese.",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600"
    },
    {
        id: 6,
        name: "Cheese Burger",
        category: "burger",
        price: 149,
        description: "Juicy burger with melted cheese.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
    },
    {
        id: 7,
        name: "Chicken Burger",
        category: "burger",
        price: 179,
        description: "Crispy chicken with fresh vegetables.",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600"
    },
    {
        id: 8,
        name: "Chicken 65",
        category: "starters",
        price: 189,
        description: "Spicy and crispy chicken starter.",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600"
    },
    {
        id: 9,
        name: "French Fries",
        category: "starters",
        price: 99,
        description: "Golden and crispy french fries.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600"
    },
    {
        id: 10,
        name: "Fresh Juice",
        category: "drinks",
        price: 79,
        description: "Refreshing fresh fruit juice.",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
    },
    {
        id: 11,
        name: "Cold Coffee",
        category: "drinks",
        price: 99,
        description: "Chilled creamy cold coffee.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
    }
];

// ===================================
// CART DATA
// ===================================

let cart = [];
let selectedCategory = "all";

// ===================================
// DISPLAY FOOD ITEMS
// ===================================

function displayFoods(items) {

    const foodGrid = document.getElementById("foodGrid");
    const noResults = document.getElementById("noResults");

    foodGrid.innerHTML = "";

    noResults.hidden = items.length !== 0;

    items.forEach(food => {

        const card = document.createElement("div");
        card.className = "food-card";

        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}"
                 loading="lazy">

            <div class="food-details">
                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="food-bottom">
                    <span class="food-price">
                        ₹${food.price}
                    </span>

                    <button class="add-btn"
                        onclick="addToCart(${food.id})">
                        + Add
                    </button>
                </div>
            </div>
        `;

        foodGrid.appendChild(card);
    });
}

// Show all foods when website loads
displayFoods(foods);

// ===================================
// FILTER FOOD BY CATEGORY
// ===================================

function filterFood(category, button) {

    selectedCategory = category;

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    searchFood();
}

// ===================================
// SEARCH FOOD
// ===================================

function searchFood() {

    const searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const filteredFoods = foods.filter(food => {

        const matchesCategory =
            selectedCategory === "all" ||
            food.category === selectedCategory;

        const matchesSearch =
            food.name.toLowerCase().includes(searchValue) ||
            food.description.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;
    });

    displayFoods(filteredFoods);
}

// ===================================
// ADD FOOD TO CART
// ===================================

function addToCart(id) {

    const food = foods.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();
}

// ===================================
// UPDATE CART
// ===================================

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty!</p>';
    }

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div>
                    <h4>${item.name}</h4>

                    <small>
                        ₹${item.price} × ${item.quantity}
                    </small>

                    <br>

                    <button class="remove-btn"
                        onclick="removeItem(${item.id})">
                        Remove
                    </button>
                </div>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = total;
}

// ===================================
// CHANGE QUANTITY
// ===================================

function changeQuantity(id, amount) {

    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    updateCart();
}

// ===================================
// REMOVE ITEM
// ===================================

function removeItem(id) {

    cart = cart.filter(food => food.id !== id);

    updateCart();
}

// ===================================
// OPEN AND CLOSE CART
// ===================================

function openCart() {

    document.getElementById("cartSidebar")
        .classList.add("open");

    document.getElementById("overlay")
        .classList.add("show");
}

function closeCart() {

    document.getElementById("cartSidebar")
        .classList.remove("open");

    document.getElementById("overlay")
        .classList.remove("show");
}

// ===================================
// CHECKOUT
// ===================================

function openCheckout() {

    if (cart.length === 0) {
        alert("Please add food items to your cart!");
        return;
    }

    closeCart();

    document.getElementById("checkoutOverlay")
        .classList.add("show");
}

function closeCheckout() {

    document.getElementById("checkoutOverlay")
        .classList.remove("show");
}

// ===================================
// SEND ORDER TO WHATSAPP
// ===================================

document.getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            closeCheckout();
            return;
        }

        const name = document.getElementById("customerName").value.trim();

        const phone = document.getElementById("customerPhone").value.trim();

        const address = document.getElementById("customerAddress").value.trim();

        const orderType = document.getElementById("orderType").value;

        if (!name || !phone || !address) {
            alert("Please fill all customer details.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Restaurant WhatsApp number
        // Replace with your actual number.
        // Include country code, without + or spaces.
        const restaurantWhatsApp = "919876543210";

        let total = 0;

        let message = `*ARIF RESTAURANT - NEW ORDER*%0A`;

        message += `----------------------------%0A`;
        message += `*Customer Name:* ${name}%0A`;
        message += `*Phone:* ${phone}%0A`;
        message += `*Address:* ${address}%0A`;
        message += `*Order Type:* ${orderType}%0A`;

        message += `----------------------------%0A`;
        message += `*ORDER DETAILS*%0A`;

        cart.forEach((item, index) => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;

            message += `${index + 1}. ${item.name}%0A`;
            message += `   ${item.quantity} x Rs.${item.price} = Rs.${itemTotal}%0A`;
        });

        message += `----------------------------%0A`;
        message += `*TOTAL: Rs.${total}*%0A`;
        message += `----------------------------%0A`;
        message += `Thank you for choosing ARIF RESTAURANT!`;

        const whatsappURL =
            `https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(
                message.replace(/%0A/g, "\n")
            )}`;

        window.open(whatsappURL, "_blank");

    });

// ===================================
// MOBILE NAVIGATION
// ===================================

function toggleMenu() {

    document.getElementById("navLinks")
        .classList.toggle("show");
}

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        document.getElementById("navLinks")
            .classList.remove("show");
    });
});

// Initial cart update
updateCart();
