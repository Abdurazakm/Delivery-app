window.onload = function () {
  const popup = document.getElementById('order-message');
  popup.classList.add('show'); // Show popup

  const closeButton = document.getElementById('close-popup');
  closeButton.addEventListener('click', () => {
    popup.classList.remove('show'); // Hide popup when close button is clicked
  });
};

// Redirect to the homepage when the back button is clicked
function goBack() {
  window.location.href = 'index.html';
}
