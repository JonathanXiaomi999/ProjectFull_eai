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
    <div id="bannerCarousel" class="carousel slide rounded-4 overflow-hidden mb-4" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button v-for="(banner, i) in banners" :key="i"
          type="button"
          :data-bs-target="'#bannerCarousel'"
          :data-bs-slide-to="i"
          :class="{ active: i === 0 }"
        ></button>
      </div>
      <div class="carousel-inner">
        <div v-for="(banner, i) in banners" :key="i" class="carousel-item" :class="{ active: i === 0 }">
          <img :src="banner.image" class="d-block w-100" style="height:160px; object-fit:cover;" :alt="banner.title">
          <div class="carousel-caption d-block text-start p-3" style="bottom:0; left:0; background:linear-gradient(transparent,rgba(0,0,0,0.55));">
            <h6 class="fw-bold text-white mb-0">{{ banner.title }}</h6>
            <small class="text-white-50">{{ banner.subtitle }}</small>
          </div>
        </div>
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
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'

const searchQuery = ref('')
const selectedCategory = ref(null)

const banners = ref([
  {
    title: 'Menu Legendaris Minggu Ini',
    subtitle: 'Rabeg & Sate khas Banten tersedia!',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Promo Spesial Nasi Kuning',
    subtitle: 'Diskon 20% setiap hari Minggu',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Sate Bandeng Khas Serang',
    subtitle: 'Duri lunak, rasa otentik sejak 1985',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80'
  }
])

const categories = ref([
  { id: 1, name: 'Rabeg',   image: `${base}/images/Untitled4.jpeg` },
  { id: 2, name: 'Sate',    image: `${base}/images/Untitled.jpeg` },
  { id: 3, name: 'Pecak',   image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=150&q=80' },
  { id: 4, name: 'Nasi',    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=150&q=80' },
  { id: 5, name: 'Seafood', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=150&q=80' },
  { id: 6, name: 'Kue',     image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=150&q=80' },
])

const products = ref([
  { id: 1,  nama: 'Rabeg H.Naswi Magersari',  harga: 16000, category: 1, image: `${base}/images/Untitled4.jpeg` },
  { id: 2,  nama: 'Rabeg Kambing Pak Udin',    harga: 20000, category: 1, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80' },
  { id: 3,  nama: 'Sate Bandeng Ratu Toety',   harga: 40000, category: 2, image: `${base}/images/Satebandeng.jpeg` },
  { id: 4,  nama: 'Sate Ayam Depok',           harga: 35000, category: 2, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=300&q=80' },
  { id: 5,  nama: 'Sate Kambing Muda',         harga: 38000, category: 2, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=300&q=80' },
  { id: 6,  nama: 'Nasi Kuning Tuban',         harga: 22000, category: 4, image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=300&q=80' },
  { id: 7,  nama: 'Nasi Goreng Surabaya',      harga: 25000, category: 4, image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=300&q=80' },
  { id: 8,  nama: 'Nasi Uduk Betawi',          harga: 18000, category: 4, image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=300&q=80' },
  { id: 9,  nama: 'Pecak Lele Khas Banten',    harga: 28000, category: 3, image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=300&q=80' },
  { id: 10, nama: 'Pecak Gurame Bakar',        harga: 45000, category: 3, image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=300&q=80' },
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