<template>
  <div class="NavBar container-md">
    <nav class="navbar navbar-expand-md py-3 border-bottom border-2 border-muted">
      <a class="navbar-brand" href="#">
        <span class="fw-bold text-black text-uppercase">sneakers</span>
      </a>
      <button
        class="navbar-toggler me-auto"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasLinks"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- icons  -->

      <div class="icons d-flex align-items-center gap-3 order-2">
        <div class="cart position-relative">
          <i ref="cartButton" class="bi bi-cart cursor-pointer" @click="handleDropMenu"></i>

          <!-- Message Count  -->
          <p class="messageCount position-absolute" v-if="messageCount">{{ messageCount }}</p>
          <!-- Message Count  -->

          <!-- Dropdown Menu  -->
          <transition name="fade" mode="out-in">
            <div
              ref="cartMenuElement"
              class="cartMenu position-absolute rounded-3"
              v-if="dropdownMenu"
            >
              <div class="cart-header border-bottom border-2">
                <p class="fw-bold text-black m-0">Cart</p>
              </div>
              <div class="cart-body" v-if="products.length > 0" v-show="dropdownMenu">
                <div
                  class="cart-item d-flex align-items-center gap-2 border-bottom border-2"
                  v-for="(product, i) in products"
                  :key="i"
                >
                  <div class="product-img">
                    <img
                      :src="product.thumb"
                      class="img-fluid rounded-2"
                      style="width: 100px"
                      alt=""
                    />
                  </div>
                  <div class="product-describe">
                    {{ product.title }} ${{ product.realPrice }} X {{ product.quantity }} =
                    <strong>${{ product.totalPrice }}</strong>
                  </div>
                  <div class="deleteIcon" @click="sendDeleteEmit(i)">
                    <i class="bi bi-trash text-primary cursor-pointer"></i>
                  </div>
                </div>
                <div
                  class="checkoutBtn my-2 text-center"
                  @click="router.push({ name: 'checkout' })"
                >
                  <button class="btn btn-primary w-50">Checkout</button>
                </div>
              </div>
              <p v-else class="emptyMessage">No Cart To Show</p>
            </div>
          </transition>
          <!-- Dropdown Menu  -->
        </div>
        <div class="profile">
          <img
            src="/images/logo.jpg"
            class="cursor-pointer rounded-pill border border-2 border-primary"
            style="width: 35px"
            alt="logo"
            @click="router.push({ name: 'home' })"
          />
        </div>
      </div>

      <!-- icons  -->
      <!-- offcanvas Links  -->
      <div class="offcanvas offcanvas-start navbar-offcanvas" id="offcanvasLinks">
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div class="offcanvas-body">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item" @click="router.push('/')">
              <a
                class="nav-link"
                :class="{ active: linkActive === 'collections' }"
                @click="updateActive('collections')"
                aria-current="page"
                href="#collections"
                >Collections</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                @click="updateActive('men')"
                :class="{ active: linkActive === 'men' }"
                href="#men"
                >Men</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                @click="updateActive('women')"
                :class="{ active: linkActive === 'women' }"
                href="#women"
                >Women</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                @click="updateActive('about')"
                :class="{ active: linkActive === 'about' }"
                href="#about"
                >About</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                @click="updateActive('contact')"
                :class="{ active: linkActive === 'contact' }"
                href="#contact"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- offcanvas Links  -->
    </nav>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const linkActive = ref("collections");
const dropdownMenu = ref(false);
const cartMenuElement = ref(null);
const cartButton = ref(null);
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["deleteEmit"]);

// function to update active
function updateActive(activeNow) {
  linkActive.value = activeNow;
}

// function to handle with dropdownMenu
function handleDropMenu() {
  dropdownMenu.value = !dropdownMenu.value;
}

//عشان تسكر اذا ضغطنا على اي مكان في الصفحة غير الكارت نفسها
onMounted(() => {
  const handlerWithDropMenu = (e) => {
    if (
      dropdownMenu.value && //اذا كانت الكارت مفتوحة
      cartMenuElement.value && // اذا كانت موجودة
      !cartMenuElement.value.contains(e.target) && // اذا كانت الضغطة خارج الكارت
      !cartButton.value.contains(e.target) // اذا كانت الضغطة خارج زر الكارت
    ) {
      handleDropMenu();
    }
  };
  window.addEventListener("click", handlerWithDropMenu);
  onUnmounted(() => {
    window.removeEventListener("click", handlerWithDropMenu);
  });
});

// Delet Emit
function sendDeleteEmit(i) {
  emit("deleteEmit", i);
}

// Computed Messages
const messageCount = computed(() => {
  return props.products.length;
});
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  .offcanvas {
    --bs-offcanvas-width: 220px;
  }
}
.navbar-toggler {
  border: none !important;
}
.cursor-pointer {
  cursor: pointer;
}
.offcanvas-body {
  ul {
    li {
      a {
        position: relative;
        padding: 10px 0;
        margin-right: 5px;
        &::before,
        &.active::before {
          content: "";
          position: absolute;
          bottom: -18px;
          left: 0%;
          width: 0%;
          height: 4px;
          background-color: #ff7d1b;
          transition: 0.5s ease;
        }
        &:hover::before {
          width: 100%;
        }
        &.active::before {
          width: 100%;
        }
        @media (max-width: 768px) {
          &:before {
            display: none;
          }
        }
      }
    }
  }
}
.cartMenu {
  right: 0;
  top: 40px;
  min-width: 350px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.203) !important;
  z-index: 10000;
  background-color: white;
  .cart-header {
    padding: 10px 20px;
  }
  .emptyMessage {
    font-weight: bold;
    color: #ff7d1b;
    text-align: center;
    margin: 0;
    padding: 20px 0;
  }
  .cart-item {
    padding: 10px 20px;
    .product-describe {
      font-size: 14px;
    }
  }
}

.messageCount {
  top: -7px;
  left: 10px;
  background: #ff7d1b;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.4s ease;
}
</style>
