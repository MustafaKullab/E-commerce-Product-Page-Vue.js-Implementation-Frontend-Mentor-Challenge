<template>
  <div class="HomePage">
    <div class="container-lg my-5">
      <div class="row justify-content-evenly">
        <div class="col-lg-5 mb-5">
          <div class="bigImage position-relative">
            <transition name="fade" mode="out-in">
              <div :key="changeTitle" class="mainImage">
                <img
                  :src="changeImg"
                  class="img-fluid rounded-3 cursor-pointer"
                  :alt="changeImg"
                  @click="isImageCliked"
                />
              </div>
            </transition>
            <i
              class="bi bi-arrow-left-circle-fill left position-absolute text-primary cursor-pointer"
              @click="backImage"
            ></i>
            <i
              class="bi bi-arrow-right-circle-fill right position-absolute text-primary cursor-pointer"
              @click="nextImage"
            ></i>
          </div>
          <div class="sliderImages row mt-5">
            <div class="thumbImage col-3" v-for="(image, i) in images" :key="i">
              <img
                :src="resolveImagePath(image.thumb)"
                class="img-fluid rounded-3 cursor-pointer"
                :alt="image.title"
                @click="selectedIndex(i)"
                :class="{ active: image.title === changeTitle }"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="content">
            <div class="header-content">
              <h6 class="text-uppercase text-muted">sneakers company</h6>
              <h1 class="display-5 title fw-bold text-black">{{ changeTitle }}</h1>
            </div>

            <div class="body-content">
              <p class="description my-5 lead fs-6">{{ changeDescription }}</p>
              <div class="discountPrice d-flex align-items-center gap-3">
                <div class="priceDiscounted fs-1 fw-bold">${{ priceDiscount }}</div>
                <div class="discount bg-dark text-light rounded-3 fw-bold">50%</div>
              </div>
              <div class="realPrice text-decoration-line-through">${{ realPrice }}</div>
            </div>

            <div class="quantity-control mt-3 d-flex align-items-center gap-3 rounded-3">
              <div class="control d-flex gap-2 align-items-center px-3 py-2 bg-light">
                <button
                  class="border-0 bg-transparent fs-5 text-primary fw-bold"
                  @click="decQuantity"
                >
                  -
                </button>
                <div class="quantity">{{ quantity }}</div>
                <button
                  class="border-0 bg-transparent fs-5 text-primary fw-bold"
                  @click="quantity++"
                >
                  +
                </button>
              </div>
              <div class="add flex-fill">
                <button class="btn btn-primary w-75" @click="sendSubmit">
                  <i class="bi bi-cart"></i> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="imageOverlay" class="overlay-img" v-if="openImage" @click="removePopup">
      <div class="image">
        <img :src="changeImg" class="rounded-2" alt="" />
        <button class="btn btn-danger close d-block mx-auto mt-3" @click="closeImage">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const images = ref([
  {
    big: "images/image-product-1.jpg",
    thumb: "images/image-product-1-thumbnail.jpg",
    price: 250,
    title: "Comfortable sneakers for everyday workouts.",
    description: "These low-profile sneakers are your perfect casual wear companion.",
  },
  {
    big: "images/image-product-2.jpg",
    thumb: "images/image-product-2-thumbnail.jpg",
    price: 650,
    title: "Elegant formal shoes for work and events.",
    description: "Step into comfort with these stylish running shoes.",
  },
  {
    big: "images/image-product-3.jpg",
    thumb: "images/image-product-3-thumbnail.jpg",
    price: 300,
    title: "Light casual shoes for walks and outings.",
    description: "Classic leather loafers that combine elegance and durability.",
  },
  {
    big: "images/image-product-4.jpg",
    thumb: "images/image-product-4-thumbnail.jpg",
    price: 400,
    title: "Warm winter boots to beat the cold and rain.",
    description: "Classic leather loafers that combine elegance and durability.",
  },
]);
const indexSelected = ref(0);
const quantity = ref(1);
const openImage = ref(false);
const imageOverlay = ref(null);
const emit = defineEmits(["addToCart"]);

// Functions ***
// function To Selected Index
function selectedIndex(i) {
  indexSelected.value = i;
  quantity.value = 1;
}

function backImage() {
  quantity.value = 1;
  return indexSelected.value > 0 ? indexSelected.value-- : (indexSelected.value = 3);
}

function nextImage() {
  quantity.value = 1;
  return indexSelected.value === images.value.length - 1
    ? (indexSelected.value = 0)
    : indexSelected.value++;
}

function sendSubmit() {
  const productDetails = {
    thumb: images.value[indexSelected.value].thumb,
    realPrice: images.value[indexSelected.value].price * 0.5,
    quantity: quantity.value,
    totalPrice: priceDiscount.value,
    title: images.value[indexSelected.value].title,
  };

  emit("addToCart", productDetails);
}

function decQuantity() {
  if (quantity.value > 1) {
    return quantity.value--;
  }
}

function isImageCliked() {
  openImage.value = !openImage.value;
  console.log(openImage.value);
}

function closeImage() {
  openImage.value = false;
}

const removePopup = (e) => {
  if (e.target.classList.contains("overlay-img")) {
    openImage.value = false;
  }
};

// Functions ***

// Computed ***
// computed to change Image
// دالة لتجهيز المسار بشكل صحيح
const resolveImagePath = (path) => {
  const base = import.meta.env.BASE_URL;
  return `${base}${path}`.replace(/\/+/g, "/");
};

// تعديل الـ computed الخاص بالصورة الكبيرة
const changeImg = computed(() => {
  return resolveImagePath(images.value[indexSelected.value].big);
});

// Computed Title Of Image
const changeTitle = computed(() => {
  return images.value[indexSelected.value].title;
});

const changeDescription = computed(() => {
  return images.value[indexSelected.value].description;
});

const priceDiscount = computed(() => {
  return images.value[indexSelected.value].price * 0.5 * quantity.value;
});

const realPrice = computed(() => {
  return images.value[indexSelected.value].price * quantity.value;
});

// Computed ***
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
.sliderImages {
  .thumbImage {
    img {
      opacity: 0.5;
      transition: 0.4s;
      border-color: transparent;
      outline: none !important;
      &:hover,
      &.active {
        opacity: 1;
        border: 3px solid rgb(255, 125, 27);
      }
    }
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
.fade-leave-active,
.fade-leave-active {
  transition: 0.3s ease;
}

.discountPrice {
  .discount {
    padding: 4px 8px;
    text-align: center;
  }
}

.left,
.right {
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
}
.left {
  left: -30px;
}
.right {
  right: -30px;
}
@media (max-width: 992px) {
  .left,
  .right {
    color: white !important;
  }
  .left {
    left: 10px;
  }
  .right {
    right: 10px;
  }
}
.overlay-img {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.44);
  .image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 450px;
    }
  }
}
</style>
