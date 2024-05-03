document.addEventListener('DOMContentLoaded', function() {
    // Show Men products by default
    showProducts('Men');
  });
  
  
  function showProducts(categoryName) {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const category = data.categories.find(cat => cat.category_name === categoryName);
        if (category) {
          displayProducts(category.category_products);
          setActiveButton(categoryName); // Set active button based on category
        } else {
          console.error(`Category "${categoryName}" not found.`);
        }
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  }
  
  function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;

        const titleRow = document.createElement('div');
        titleRow.classList.add('title-row');

        const title = document.createElement('h3');
        title.textContent = product.title;
        title.textContent = truncateText(product.title, 20);

        const vendor = document.createElement('li');
        vendor.classList.add('vendor');
        vendor.textContent = `${product.vendor}`;

        const priceRow = document.createElement('div');
        priceRow.classList.add('price-row');

        const price = document.createElement('p');
        price.textContent = `₹${product.price}`;

        const comparePrice = document.createElement('span');
        comparePrice.textContent = `₹${product.compare_at_price}`;

        const discountBadge = document.createElement('h4');
        discountBadge.classList.add('discount-badge');
        discountBadge.textContent = '50% OFF';
        discountBadge.style.color = 'red';

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('add-to-cart-button');

        productCard.appendChild(imageContainer);
        productCard.appendChild(titleRow);
        // productCard.appendChild(vendor);
        productCard.appendChild(priceRow);
        productCard.appendChild(addToCartButton);

        imageContainer.appendChild(image);

        titleRow.appendChild(title);
        titleRow.appendChild(vendor);

        priceRow.appendChild(price);
        priceRow.appendChild(comparePrice);
        priceRow.appendChild(discountBadge);

        productsContainer.appendChild(productCard);
    });
}
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength - 1) + '...' : text;
}


  
  function setActiveButton(categoryName) {
    const buttons = document.querySelectorAll('.tabs button');
    buttons.forEach(button => {
      if (button.textContent === categoryName) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  