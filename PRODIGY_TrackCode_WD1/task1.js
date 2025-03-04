function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
    }
}

// Update cart display whenever an item is added
function addToCart(pizzaName, price) {
    cart.push({ name: pizzaName, price: price });
    updateCartCount();
    updateCartDisplay();
}
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Thank you for your order! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
        cart = []; // Clear the cart
        updateCartCount();
        updateCartDisplay();
    }
});

// Category Filtering
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterPizzas(category);
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

function filterPizzas(category) {
    const pizzaItems = document.querySelectorAll('.pizza-item');
    pizzaItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});