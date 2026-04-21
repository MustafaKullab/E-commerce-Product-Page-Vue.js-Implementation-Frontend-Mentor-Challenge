<template>
  <div class="Checkout container-lg">
    <div class="row justify-content-between">
      <div class="col-md-6 my-5">
        <form action="">
          <div class="header">
            <h1 class="title text-black fw-bold mb-4">Shipping Details</h1>
          </div>
          <div class="row my-3">
            <div class="input-group mb-3 col">
              <span class="input-group-text" id="basic-addon1"
                ><i class="bi bi-person text-primary"></i
              ></span>
              <input
                type="text"
                class="form-control bg-light"
                placeholder="Full Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group mb-3 col">
              <span class="input-group-text" id="basic-addon2"
                ><i class="bi bi-envelope text-primary"></i
              ></span>
              <input
                type="email"
                class="form-control bg-light"
                placeholder="Email Address"
                aria-label="Email"
                aria-describedby="basic-addon2"
              />
            </div>
            <div class="input-group flex-nowrap mb-3">
              <span class="input-group-text" id="addon-wrapping"
                ><i class="bi bi-geo-alt text-primary"></i
              ></span>
              <input
                type="text"
                class="form-control bg-light"
                placeholder="Full Adress"
                aria-label="address"
                aria-describedby="addon-wrapping"
              />
            </div>
            <div class="input-group mb-3 col">
              <span class="input-group-text" id="basic-addon3"
                ><i class="bi bi-geo text-primary"></i
              ></span>
              <input
                type="text"
                class="form-control bg-light"
                placeholder="City"
                aria-label="city"
                aria-describedby="basic-addon3"
              />
            </div>
            <div class="input-group mb-3 col">
              <span class="input-group-text" id="basic-addon4"
                ><i class="bi bi-telephone text-primary"></i
              ></span>
              <input
                type="email"
                class="form-control bg-light"
                placeholder="Phone Number"
                aria-label="Phone"
                aria-describedby="basic-addon4"
              />
            </div>
          </div>
          <div class="header">
            <h1 class="title text-black fw-bold mb-4">Payment Method</h1>
          </div>
          <div class="row">
            <div
              :class="{ active: radioValue === 'option1' }"
              class="form-check form-check-inline col bg-light px-5 py-3 rounded-4 border border-secondary border-2"
            >
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                v-model="radioValue"
              />
              <label class="form-check-label" for="inlineRadio1">
                <div class="icone d-flex align-items-center gap-2 mb-2">
                  <i class="fa-brands fa-cc-visa text-primary fs-2"></i>
                  <i class="fa-brands fa-cc-mastercard text-primary fs-2"></i>
                </div>
                <div class="body">
                  <div class="buyMethod">
                    <h4 class="text-black">Credit Card</h4>
                  </div>
                  <div class="describe">
                    <p class="text-muted">
                      Visa / Mastercard with options payments and credit card.
                    </p>
                  </div>
                </div>
              </label>
            </div>
            <div
              :class="{ active: radioValue === 'option2' }"
              class="form-check form-check-inline col bg-light px-5 py-3 rounded-4 border border-secondary border-2"
            >
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
                v-model="radioValue"
              />
              <label class="form-check-label" for="inlineRadio2">
                <i class="bi bi-cash fs-2 text-primary d-flex align-otems-center"></i>
                <div class="body">
                  <div class="buyMethod">
                    <h4 class="text-black">Cash On Delivery</h4>
                  </div>
                  <div class="describe">
                    <p class="text-muted">Cash on delivery connect your cominate parcheard.</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-5 px-4 py-5 bg-light">
        <div class="header">
          <h1 class="title text-black fs-2 fw-bold mt-1 mb-4">Your Order</h1>
        </div>
        <ul class="listOrder list-unstyled">
          <li
            v-for="(product, i) in products"
            :key="i"
            class="d-flex align-items-center gap-2 mb-2"
          >
            <div class="image me-2">
              <img :src="product.thumb" class="img-fluid rounded-3" style="width: 100px" alt="" />
            </div>
            <div class="details flex-fill">
              <p class="name m-0 text-black">{{ product.title }}</p>
              <p class="quantity text-muted">X{{ product.quantity }}</p>
            </div>
            <div class="totalPrice">
              <strong>${{ product.totalPrice }}</strong>
            </div>
          </li>
        </ul>
        <div class="accounting">
          <div class="subtotal d-flex justify-content-between align-items-center">
            <p class="name text-black">Subtotal</p>
            <p class="fw-bold price">${{ subtotal }}</p>
          </div>
          <div class="shipping d-flex justify-content-between align-items-center">
            <p class="name text-black">Shipping</p>
            <p class="fw-bold price">${{ shipping }}</p>
          </div>
          <div class="total d-flex justify-content-between align-items-center">
            <p class="name fw-bold fs-4 text-black">Total</p>
            <p class="fw-bold price text-primary fs-2">${{ total }}</p>
          </div>
          <button @click="orderSuccessful" class="btn btn-lg btn-primary text-light w-100">
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});
const radioValue = ref("");
const emit = defineEmits(["emptyProduct"]);
const toast = useToast();

// Computed To Determine Shipping
const shipping = computed(() => {
  if (props.subtotal === 0) {
    return 0;
  }
  return props.subtotal > 500 ? 0 : 20;
});

// Computed To retrieve The Total
const total = computed(() => {
  return props.subtotal + shipping.value;
});

// Function Order Successfull
function orderSuccessful() {
  emit("emptyProduct");
  toast.success("Order Successfully!");
}
</script>

<style lang="scss">
.offcanvas-body {
  ul {
    li {
      a {
        &.active::before {
          display: none;
        }
      }
    }
  }
}
.form-check.active {
  border-color: #ff7d1b !important;
}
</style>
