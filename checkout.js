// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutForm = document.getElementById('checkout-form');
const submitOrderButton = document.getElementById('submit-order');

// Render cart items on checkout page
function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    cartTotalElement.textContent = '$0.00';
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div>
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Submit order when user fills the form
checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const email = document.getElementById('email').value;

  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before proceeding.');
    return;
  }

  // Simulate order submission
  const orderDetails = {
    name,
    address,
    email,
    items: cart,
    totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };

  // Clear the cart after the order is placed
  localStorage.removeItem('cart');
  cart = [];
  renderCart();  // Re-render cart (now empty)

  // Simulate successful order placement
  alert('Order placed successfully!');
  console.log('Order Details:', orderDetails);

  // Redirect to a confirmation page (optional)
  window.location.href = 'order-confirmation.html';
});

// Initial cart render
renderCart();
