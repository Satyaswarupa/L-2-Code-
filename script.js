document.getElementById('hamburger').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); 
  });
  
 
  document.getElementById('close-button').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('active'); 
  });
  

async function fetchCartData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889'); 
        const data = await response.json();
        displayCartItems(data.items); 
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}


function displayCartItems(cartItems) {
    const itemsContainer = document.querySelector('.buttom'); 
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    let subtotal = 0;
    itemsContainer.innerHTML = ''; 

    cartItems.forEach(item => {
        const price = item.presentment_price; 
        const quantity = item.quantity;
        const subtotalItem = price * quantity;
        subtotal += subtotalItem;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('buttom');
        itemDiv.setAttribute('data-id', item.id); 
        itemDiv.innerHTML = `
            <div class="sofa-name">
                <img class="sofa" src="${item.image}" alt="${item.product_title}">
                <p>${item.product_title}</p>
            </div>
            <p class="price">${price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <p class="subtotal-item">${subtotalItem.toFixed(2)}</p>
            <button class="delete-button" onclick="removeItem(${item.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" viewBox="0 0 24 24">
                    <path d="M9 3v-2h6v2h5v2h-1.2l-1.6 16H7.8L6.2 5H5V3h4zM9 5v-.5h6V5H9zm0 1.5h6l1.2 12H7.8L9 6.5zm3 8h-2v-2h2v2zm0-4h-2V8h2v2z"/>
                </svg>
            </button>
        `;
        itemsContainer.appendChild(itemDiv);
    });

    const total = subtotal; 
    subtotalElement.innerText = `Rs. ${subtotal.toFixed(2)}`;
    totalElement.innerText = `Rs. ${total.toFixed(2)}`;
}


function changeQuantity(itemId, change) {
    const itemDiv = document.querySelector(`.buttom[data-id="${itemId}"]`); // Correct targeting
    const quantityElement = itemDiv.querySelector('.quantity');
    const subtotalElement = itemDiv.querySelector('.subtotal-item');
    const price = parseFloat(itemDiv.querySelector('.price').innerText);

    
    let currentQuantity = parseInt(quantityElement.innerText);

   
    if (currentQuantity + change > 0) {
        currentQuantity += change;
        quantityElement.innerText = currentQuantity;

       
        const subtotalItem = price * currentQuantity;
        subtotalElement.innerText = subtotalItem.toFixed(2);

       
        recalculateTotals();
    }
}


function removeItem(itemId) {
    const itemDiv = document.querySelector(`.buttom[data-id="${itemId}"]`);
    if (itemDiv) {
        itemDiv.remove(); 
        recalculateTotals(); 
    }
}


function recalculateTotals() {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    let subtotal = 0;

  
    document.querySelectorAll('.buttom').forEach(itemDiv => {
        const subtotalItem = parseFloat(itemDiv.querySelector('.subtotal-item').innerText);
        subtotal = subtotalItem;
    });

    const total = subtotal; 
    subtotalElement.innerText = `Rs. ${subtotal.toFixed(2)}`;
    totalElement.innerText = `Rs. ${total.toFixed(2)}`;
}


window.onload = fetchCartData;
