// Cart Array to Store Products
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Selectors
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');

// Function to Render Cart
function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    cartTotalElement.textContent = '$0.00';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div>
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div>
            <button class="decrease-qty" data-index="${index}">-</button>
            <span class="cart-item-quantity">${item.quantity}</span>
            <button class="increase-qty" data-index="${index}">+</button>
          </div>
        </div>
      </div>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Add event listeners for the Remove buttons
  setupCartButtonListeners();
}

// Add Event Listeners for Cart Buttons
function setupCartButtonListeners() {
  const increaseQtyButtons = document.querySelectorAll('.increase-qty');
  const decreaseQtyButtons = document.querySelectorAll('.decrease-qty');
  const removeItemButtons = document.querySelectorAll('.remove-item');

  increaseQtyButtons.forEach(button =>
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      cart[index].quantity += 1;
      renderCart();
    })
  );

  decreaseQtyButtons.forEach(button =>
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1); // Remove item if quantity is 0
      }
      renderCart();
    })
  );

  removeItemButtons.forEach(button =>
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      cart.splice(index, 1); // Remove item from the cart
      renderCart();
    })
  );
}

// Clear Cart
clearCartButton.addEventListener('click', () => {
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
});

// Add Event Listeners for "Add to Cart"
addToCartButtons.forEach(button =>
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    const productImage = button.getAttribute('data-image');

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      // If the product is in the cart, increase its quantity
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the cart, add it
      cart.push({
        name: productName,
        price: productPrice,
        quantity: 1,
        image: productImage,
      });
    }
    // Update the cart display
    renderCart();
  })
);

// Initial Render to show cart contents
renderCart();

