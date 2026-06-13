<template>
  <div class="view-section active">
    <!-- Search Bar -->
    <div class="input-group mb-3">
      <span class="input-group-text bg-light border-0 rounded-start-4">
        <i class="bi bi-search"></i>
      </span>
      <input
        v-model="searchQuery"
        type="text"
        class="form-control bg-light border-0 rounded-end-4"
        placeholder="Cari makanan..."
      >
    </div>

<!-- Banner Carousel -->
<div class="carousel-wrap mb-4" @touchstart="onTouchStart" @touchend="onTouchEnd">
  <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
    <div v-for="(banner, i) in banners" :key="i" class="carousel-slide">
      <img :src="banner.image" class="d-block w-100" style="height:160px; object-fit:cover;" :alt="banner.title">
      <div class="carousel-caption-custom">
        <h6 class="fw-bold text-white mb-0">{{ banner.title }}</h6>
        <small class="text-white-50">{{ banner.subtitle }}</small>
      </div>
    </div>
  </div>

  <!-- Arrows -->
  <button class="carousel-btn left" @click="prevSlide">&#8249;</button>
  <button class="carousel-btn right" @click="nextSlide">&#8250;</button>

  <!-- Dots -->
  <div class="carousel-dots">
    <span
      v-for="(_, i) in banners" :key="i"
      class="dot"
      :class="{ active: currentSlide === i }"
      @click="currentSlide = i"
    ></span>
  </div>
</div>

    <!-- Categories -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h6 class="fw-bold mb-0">Kategori</h6>
      <small class="text-muted" style="cursor:pointer">Lihat semua <i class="bi bi-chevron-right"></i></small>
    </div>
    <div class="d-flex gap-3 text-center mb-4 overflow-auto pb-1" style="-webkit-overflow-scrolling:touch; scrollbar-width:none;">
      <div
        v-for="category in categories"
        :key="category.id"
        @click="filterByCategory(category.id)"
        style="cursor:pointer; min-width:70px; flex-shrink:0;"
      >
        <img
          :src="category.image"
          class="category-icon mb-1"
          :class="{ 'border border-2 border-dark': selectedCategory === category.id }"
          :alt="category.name"
        >
        <div class="small" :class="selectedCategory === category.id ? 'fw-bold' : 'text-muted'">
          {{ category.name }}
        </div>
      </div>
    </div>

    <!-- Products -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h6 class="fw-bold mb-0">
        {{ selectedCategory ? getCategoryName(selectedCategory) : 'Dekat Kamu' }}
      </h6>
      <small class="text-muted" style="cursor:pointer">Lihat semua <i class="bi bi-chevron-right"></i></small>
    </div>

    <div class="row g-3">
      <div v-for="product in filteredProducts" :key="product.id" class="col-6">
        <ProductCard :product="product" 
         @add-to-cart="addToCart" 
         @open-detail="(p) => emit('open-detail', p)"
        />
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="text-center text-muted mt-5">
      <i class="bi bi-search fs-1 d-block mb-2"></i>
      <p>Tidak ada produk ditemukan</p>
    </div>
  </div>
</template>

<script setup>
const base = import.meta.env.BASE_URL
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProductCard from './ProductCard.vue'

const searchQuery = ref('')
const selectedCategory = ref(null)

const banners = ref([
  {
    title: 'Menu Legendaris Minggu Ini',
    subtitle: 'Rabeg & Sate khas Banten tersedia!',
    image: '${base}/images/Untitled4.jpeg'
  },
  {
    title: 'Promo Spesial Nasi Kuning',
    subtitle: 'Diskon 20% setiap hari Minggu',
    image: '${base}/images/nasikuning.webp'
  },
  {
    title: 'Sate Bandeng Khas Serang',
    subtitle: 'Duri lunak, rasa otentik sejak 1985',
    image: '${base}/images/Satebandeng.jpeg'
  }
])

// Carousel
const currentSlide = ref(0)
let autoplayTimer = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % banners.value.length
}
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + banners.value.length) % banners.value.length
}

// Swipe support
let touchStartX = 0
const onTouchStart = (e) => { touchStartX = e.touches[0].clientX }
const onTouchEnd = (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (diff > 50) nextSlide()
  else if (diff < -50) prevSlide()
}

// Autoplay
onMounted(() => {
  autoplayTimer = setInterval(nextSlide, 3500)
})
onUnmounted(() => clearInterval(autoplayTimer))

const categories = ref([
  { id: 1, name: 'Rabeg',   image: `${base}/images/Untitled4.jpeg` },
  { id: 2, name: 'Sate',    image: `${base}/images/Untitled.jpeg` },
  { id: 3, name: 'Pecak',   image: `${base}/images/Untitled2.jpeg` },
  { id: 4, name: 'Nasi',    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=150&q=80' },
  { id: 5, name: 'Seafood', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=150&q=80' },
  { id: 6, name: 'Kue',     image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=150&q=80' },
])

const products = ref([
  { id: 1,  nama: 'Rabeg H.Naswi Magersari',   harga: 16000, category: 1, image: `${base}/images/Untitled4.jpeg` },
  { id: 2,  nama: 'Rabeg Kambing Pak Udin',    harga: 20000, category: 1, image: `${base}/images/Rabegkambing.jpg` },
  { id: 3,  nama: 'Sate Bandeng Ratu Toety',   harga: 40000, category: 2, image: `${base}/images/Satebandeng.jpeg` },
  { id: 4,  nama: 'Sate Bebek',                harga: 35000, category: 2, image: `${base}/images/satebebek.webp` },
  { id: 5,  nama: 'Sate Kambing Muda',         harga: 38000, category: 2, image: `${base}/images/satekambing.webp` },
  { id: 6,  nama: 'Nasi Kuning Tuban',         harga: 22000, category: 4, image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=300&q=80' },
  { id: 7,  nama: 'Nasi Goreng Surabaya',      harga: 25000, category: 4, image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=300&q=80' },
  { id: 8,  nama: 'Nasi Uduk Betawi',          harga: 18000, category: 4, image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=300&q=80' },
  { id: 9,  nama: 'Pecak Ikan Tuna',           harga: 28000, category: 3, image: `${base}/images/Pecaktuna.jpeg` },
  { id: 10, nama: 'Pecak Bandeng',             harga: 45000, category: 3, image: `${base}/images/Pecakbandeng.webp` },
  { id: 11, nama: 'Udang Bakar Mentega',       harga: 55000, category: 5, image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=300&q=80' },
  { id: 12, nama: 'Cumi Saus Tiram',           harga: 48000, category: 5, image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=300&q=80' },
])

const filteredProducts = computed(() => {
  let filtered = products.value
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    filtered = filtered.filter(p =>
      p.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return filtered
})

const filterByCategory = (categoryId) => {
  selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId
}

const getCategoryName = (categoryId) => {
  return categories.value.find(c => c.id === categoryId)?.name ?? ''
}

const emit = defineEmits(['add-to-cart', 'open-detail'])
const addToCart = (product) => {
  emit('add-to-cart', product)
}
</script>

<style scoped>
.carousel-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}

.carousel-track {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide {
  min-width: 100%;
  position: relative;
}

.carousel-caption-custom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 12px 16px;
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 50%;
  width: 32px; height: 32px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;
}
.carousel-btn:hover { background: #fff; }
.carousel-btn.left { left: 10px; }
.carousel-btn.right { right: 10px; }

.carousel-dots {
  position: absolute;
  bottom: 10px;
  right: 12px;
  display: flex;
  gap: 5px;
}

.dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: background 0.2s, width 0.2s;
}
.dot.active {
  background: #fff;
  width: 18px;
  border-radius: 3px;
}
</style>