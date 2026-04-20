<template>
  <NavBar :products="products" @deleteEmit="deleteProduct" />
  <router-view
    @addToCart="addProduct"
    @emptyProduct="cleanProducts"
    :products="products"
    :subtotal="subtotal"
  />
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import { onMounted, ref, computed } from "vue";
import { useToast } from "vue-toastification";
const products = ref([]);
const toast = useToast();

// Local Storage Functions
function saveInLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products.value));
}

function updateLocalStorage() {
  const productsSaved = JSON.parse(localStorage.getItem("products"));
  if (productsSaved) {
    products.value = productsSaved;
  }
}
// Local Storage Functions

onMounted(() => {
  updateLocalStorage();
});

// Add New Product
function addProduct(productDetails) {
  const exitingProduct = products.value.find((p) => p.thumb === productDetails.thumb);
  if (exitingProduct) {
    exitingProduct.quantity += productDetails.quantity;
    exitingProduct.totalPrice = exitingProduct.realPrice * exitingProduct.quantity;
  } else {
    products.value.push(productDetails);
  }
  toast.success("Product added to cart!");
  saveInLocalStorage();
}

// Delete Selected Product
function deleteProduct(i) {
  products.value.splice(i, 1);
  toast.error("Product removed from cart  ");
  saveInLocalStorage();
}

// Function To Clean Cart
function cleanProducts() {
  products.value = [];
  saveInLocalStorage();
}

// Computed To Compute Subtotal
const subtotal = computed(() => {
  return products.value.reduce((acc, product) => acc + product.totalPrice, 0);
});
</script>

<style lang="scss">
* {
  box-shadow: none !important;
  outline: none !important;
}
</style>
