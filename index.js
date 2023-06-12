$(document).ready(function () {
  $.get('https://diwserver.vps.webdock.cloud/products/category/Accessories - Watches?page=2&page_items=200', function (data) {
    var products = data.products;

    var productCards = $('.item-card');
    var reviewCards = $('.product-info');
    var reviewCardsImgs = $('.review-item');

    productCards.each(function (index) {
      var product = products[index];
      var meuitem = $(this);

      meuitem.find('.item-card-image').attr('src', product.image);
      meuitem.find('.card-title').text(product.title);

      var description = product.description;

      meuitem.find('.card-text').html(description);
      meuitem.find('.card-title').addClass('text-truncate');
      meuitem.find('.card-text').addClass('text-truncate');
      meuitem.find('.price').text('R$' + product.price.toFixed(2));
      meuitem.find('.review-rate').text(' + product.rating.rate.toFixed(1) + ');

      var productId = product.id;
      meuitem
        .find('.card-title')
        .wrap('<a href="detalhes.html?id=' + productId + '"></a>');
    });

    reviewCards.each(function (index) {
      var product = products[index];
      var card = $(this);

      card.find('.review-product-title').text(product.title);
      card.find('.price').text('R$' + product.price.toFixed(2));

      var productId = product.id;
      card
        .find('.review-product-title')
        .wrap('<a href="detalhes.html?id=' + productId + '"></a>');
    });

    reviewCardsImgs.each(function (index) {
      var product = products[index];
      var card = $(this);

      card.find('.review-item-img').attr('src', product.image);
    });
  });

  $(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    $.get(
      `https://diwserver.vps.webdock.cloud/products/${productId}`,
      function (product) {
        $('#product-title').text(product.title);
        $('#product-description').html(product.description);
        $('#product-price').text('Price: R$' + product.price.toFixed(2));
        $('#product-rating').text(
          'Rating: ' +
          product.rating.rate.toFixed(1) +
          ' (' +
          product.rating.count +
          ' ratings)'
        );
        $('#product-image').attr('src', product.image);
      }
    );
  });
});

$(document).ready(function () {
  $('.search').submit(function (event) {
    event.preventDefault();

    const query = $('.search-input').val();
    const url = `pesquisa.html?search=${query}`;

    window.open(url, '_blank');
  });
});

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  $.get('https://diwserver.vps.webdock.cloud/products/category/Accessories - Watches', function (data) {
    const searchResults = data.products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );

    const cardsContainer = $('#cards');

    if (searchResults.length === 0) {
      cardsContainer.html('<p>No products found.</p>');
    } else {
      const cardsHTML = searchResults.map(
        (product) => `
        <div class=" col-8 col-md-6 col-sm-6 mb-3 col-lg-3">
          <div class="product-card-search card">
            <img src="${product.image
          }" class="card-img-top product-card-search-image" alt="${product.title
          }" />
            <div class="card-body">
              <a href="detalhes.html?id=${product.id}">
                <h6 class="card-title">${product.title}</h6>
              </a>
              <div class="description-container">
                <p class="card-text">${product.description}</p>
              </div>
              <div class="price">R$ ${product.price.toFixed(2)}</div>
              <div class="review-rate">★★★★☆ (${product.rating.rate})</div>
            </div>
          </div>
        </div>
      `
      );

      cardsContainer.html(cardsHTML.join(''));
    }
  });
});

$(document).ready(function () {
  var categorySelect = $('.category-selector');

  $.ajax({
    url: 'https://diwserver.vps.webdock.cloud/products/categories',
    method: 'GET',
    success: function (response) {
      // Populate the select options with fetched categories
      response.forEach(function (category) {
        categorySelect.append(
          $('<option>', {
            value: category,
            text: category,
          })
        );
      });
    },
    error: function (xhr, status, error) {
      console.log('Error fetching categories:', error);
    },
  });
});
