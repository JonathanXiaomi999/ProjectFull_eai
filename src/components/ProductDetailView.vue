<template>
  <div class="detail-view">

    <!-- Header -->
    <div class="detail-header">
      <button class="btn-icon" @click="$emit('back')">
        <i class="bi bi-arrow-left"></i>
      </button>
      <span class="fw-bold">Details</span>
      <button class="btn-icon">
        <i class="bi bi-bell"></i>
      </button>
    </div>

    <!-- Hero Image -->
    <div class="detail-hero">
      <img :src="product.image" :alt="product.nama" @error="onImgError">
      <button class="btn-wishlist" @click="toggleWishlist">
        <i :class="isWishlisted ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
      </button>
    </div>

    <!-- Content -->
    <div class="detail-content">

      <h4 class="fw-bold mb-1">{{ product.nama }}</h4>

      <!-- Rating -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <span class="text-warning fw-bold">
          <i class="bi bi-star-fill"></i> {{ product.rating ?? '4.0' }}/5
        </span>
        <span class="text-muted" style="font-size:13px;">
          ({{ product.reviews ?? 45 }} reviews)
        </span>
      </div>

      <!-- Description -->
      <p class="text-muted" style="font-size:14px; line-height:1.6;">
        {{ product.description ?? defaultDescription }}
      </p>

      <!-- Extra Info -->
      <div class="detail-tags">
        <span class="detail-tag"><i class="bi bi-clock"></i> {{ product.cookTime ?? '15-20 menit' }}</span>
        <span class="detail-tag"><i class="bi bi-fire"></i> {{ product.calories ?? '320 kal' }}</span>
        <span class="detail-tag"><i class="bi bi-geo-alt"></i> {{ product.origin ?? 'Banten' }}</span>
      </div>

      <!-- Quantity -->
      <div class="d-flex align-items-center justify-content-between mt-4 mb-2">
        <span class="fw-bold">Jumlah</span>
        <div class="qty-control">
          <button @click="decreaseQty">-</button>
          <span>{{ qty }}</span>
          <button @click="increaseQty">+</button>
        </div>
      </div>

    </div>

    <!-- Bottom Bar -->
    <div class="detail-bottom">
      <div>
        <small class="text-muted d-block">Price</small>
        <span class="fw-bold fs-5">{{ formatPrice(product.harga * qty) }}</span>
      </div>
      <button class="btn-add-cart" @click="handleAddToCart">
        <i class="bi bi-cart-plus me-2"></i> Add to Cart
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const base = import.meta.env.BASE_URL

const props = defineProps({
  product: { type: Object, required: true }
})

const emit = defineEmits(['back', 'add-to-cart'])

const qty = ref(1)
const isWishlisted = ref(false)

const defaultDescription = 'Menu khas Banten dengan cita rasa autentik yang telah diwariskan turun-temurun. Dibuat dari bahan-bahan segar pilihan dengan bumbu rempah tradisional.'

const increaseQty = () => qty.value++
const decreaseQty = () => { if (qty.value > 1) qty.value-- }
const toggleWishlist = () => isWishlisted.value = !isWishlisted.value

const formatPrice = (price) =>
  'Rp' + price.toLocaleString('id-ID')

const onImgError = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80'
}

const handleAddToCart = () => {
  for (let i = 0; i < qty.value; i++) {
    emit('add-to-cart', props.product)
  }
  emit('back')
}
</script>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
  position: relative;
}

/* Header */
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
  border-bottom: 1px solid #f0f0f0;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 20px;
  padding: 4px 8px;
  cursor: pointer;
  color: #111;
}

/* Hero */
.detail-hero {
  position: relative;
  width: 100%;
  height: 260px;
}

.detail-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-wishlist {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  font-size: 16px;
}

/* Content */
.detail-content {
  padding: 20px 16px;
  flex: 1;
  padding-bottom: 100px;
}

/* Tags */
.detail-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.detail-tag {
  background: #f4f4f4;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Quantity */
.qty-control {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.qty-control button {
  background: #f4f4f4;
  border: none;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.15s;
}

.qty-control button:hover { background: #e0e0e0; }

.qty-control span {
  width: 40px;
  text-align: center;
  font-weight: bold;
}

/* Bottom bar */
.detail-bottom {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 414px;
  background: #fff;
  border-top: 1px solid #eee;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

.btn-add-cart {
  background: #111;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-add-cart:hover { background: #333; }

@media (min-width: 768px) {
  .detail-bottom { max-width: 600px; }
}
@media (min-width: 1024px) {
  .detail-bottom { max-width: 420px; }
}
</style>