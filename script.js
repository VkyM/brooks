const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();


let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  dots.forEach(dot => {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

/* Automatically change image every 4 seconds */
setInterval(nextSlide, 4000);

/* Products */
let products = [];
let currentProduct = 0;

const overlay = document.getElementById("productOverlay");
const viewProducts = document.getElementById("viewProducts");
const productClose = document.getElementById("productClose");

const productImageGrid =
  document.getElementById("productImageGrid");

const productImage =
  document.getElementById("productImage");

const productName =
  document.getElementById("productName");

const productSubtitle =
  document.getElementById("productSubtitle");

const productTitle =
  document.getElementById("productTitle");

const productDescription =
  document.getElementById("productDescription");

const ingredientGrid =
  document.getElementById("ingredientGrid");

const productNote =
  document.getElementById("productNote");


/* Load JSON */

async function loadProducts() {

  try {

    const response = await fetch("products.json");

    products = await response.json();

    createProductSelector();

    showProduct(0);

  } catch (error) {

    console.error(
      "Unable to load products.json:",
      error
    );

  }

}


/* Create image selector */

function createProductSelector() {

  productImageGrid.innerHTML = "";

  products.forEach((product, index) => {

    const card = document.createElement("div");

    card.className = "product-option";

    card.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div class="product-option-name">
        ${product.name}
      </div>
    `;

    card.addEventListener("click", () => {

      showProduct(index);

      closeProductSelector();

    });

    productImageGrid.appendChild(card);

  });

}


/* Show selected product */

function showProduct(index) {

  const product = products[index];

  if (!product) return;

  currentProduct = index;


  /* Image */

  productImage.classList.add("change");

  setTimeout(() => {

    productImage.src = product.image;
    productImage.alt = product.name;

    productImage.classList.remove("change");

  }, 200);


  /* Product name */

  productName.textContent =
    product.name;

  productSubtitle.textContent =
    product.subtitle;


  /* Content */

  productTitle.textContent =
    product.title;

  productDescription.textContent =
    product.description;


  /* Ingredients */

  ingredientGrid.innerHTML = "";

  product.ingredients.forEach(
    ingredient => {

      const article =
        document.createElement("article");

      article.innerHTML = `
        <h4>${ingredient}</h4>
      `;

      ingredientGrid.appendChild(article);

    }
  );


  /* Note */

  productNote.textContent =
    product.note;

}


/* Open selector */

viewProducts.addEventListener(
  "click",
  () => {

    overlay.classList.add("active");

  }
);


/* Close selector */

productClose.addEventListener(
  "click",
  closeProductSelector
);


function closeProductSelector() {

  overlay.classList.remove("active");

}


/* Close when clicking outside card */

overlay.addEventListener(
  "click",
  event => {

    if (event.target === overlay) {

      closeProductSelector();

    }

  }
);


/* Load products */

loadProducts();