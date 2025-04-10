let cart = [];

function updateCartCount() {
    const stickyCountEl = document.getElementById('sticky-count');
    const stickyTotalEl = document.getElementById('sticky-total');
    const cartTotalEl = document.getElementById('cart-total');

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    if (stickyCountEl) stickyCountEl.textContent = totalItems;
    if (stickyTotalEl) stickyTotalEl.textContent = totalPrice.toFixed(2);
    if (cartTotalEl) cartTotalEl.textContent = totalPrice.toFixed(2);
}



function addToCart(productName, price, sizeId) {
    const size = document.getElementById(sizeId)?.value || 'N/A';
    const parsedPrice = parseFloat(price);

    const existingIndex = cart.findIndex(item => item.name === productName && item.size === size);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: parsedPrice,
            size: size,
            quantity: 1
        });
    }
    console.log('Cart:', cart);

    updateCartCount();   // 🔥 This is critical!
    const stickyCountEl = document.getElementById('sticky-count');
    const cartCountEl = document.getElementById('cart-count'); // this is for top-left

...

if (cartCountEl) cartCountEl.textContent = totalItems;

    updateCartModal();   // 🔥 This refreshes the cart display
}

}

function updateCartModal() {
    const cartItemsDiv = document.getElementById('cart-items');
    const stickyTotal = document.getElementById('sticky-total');
    const cartTotal = document.getElementById('cart-total');

    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        stickyTotal.textContent = '0.00';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <strong>${item.name}</strong><br>
            Size: ${item.size}<br>
            Qty: ${item.quantity} × R${item.price.toFixed(2)}
            <div style="margin-top:5px;">
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    stickyTotal.textContent = total.toFixed(2);
    cartTotal.textContent = total.toFixed(2);

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<hr><p><strong>Total: R${total.toFixed(2)}</strong></p>`;
    cartItemsDiv.appendChild(totalDiv);
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartCount();
    updateCartModal();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartModal();
}

function clearCart() {
    cart = [];
    updateCartCount();
    updateCartModal();
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkout() {
    alert('Proceeding to checkout...');
    clearCart();
    closeCart();
    
}
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('show');
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}


function openLightbox(src) {
    let lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex; justify-content: center; align-items: center;
        z-index: 9999;
    `;
    lightbox.innerHTML = `<img src="${src}" style="max-width:90%; max-height:80%; border-radius:20px;">`;
    lightbox.onclick = () => document.body.removeChild(lightbox);
    document.body.appendChild(lightbox);
}
