<template>
  <div class="view-section">
    <!-- Header - sembunyikan tombol back di desktop -->
    <div class="d-flex align-items-center mb-4">
      <button class="btn border-0 p-0 d-lg-none" @click="$emit('back')">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <h5 class="fw-bold mb-0 ms-2 ms-lg-0">Explore</h5>
    </div>

    <!-- Search -->
    <div class="input-group mb-4">
      <span class="input-group-text bg-light border-0 rounded-start-4">
        <i class="bi bi-search"></i>
      </span>
      <input
        v-model="searchQuery"
        type="text"
        class="form-control bg-light border-0 rounded-end-4"
        placeholder="Cari tempat makan..."
      >
    </div>

    <!-- Filter Tabs -->
    <div class="d-flex gap-2 mb-4 overflow-auto pb-1" style="scrollbar-width:none;">
      <button
        v-for="tab in tabs" :key="tab"
        class="btn btn-sm rounded-pill flex-shrink-0"
        :class="activeTab === tab ? 'btn-dark' : 'btn-outline-secondary'"
        @click="activeTab = tab"
      >{{ tab }}</button>
    </div>

    <!-- Trending -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h6 class="fw-bold mb-0">🔥 Trending Sekarang</h6>
    </div>
    <div class="row g-3 mb-4">
      <div v-for="item in filteredItems" :key="item.id" class="col-6 col-lg-3">
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden h-100">
          <div class="position-relative">
            <img :src="item.image" class="w-100" style="height:130px; object-fit:cover;" :alt="item.name">
            <span class="badge position-absolute top-0 end-0 m-2"
              :class="item.isOpen ? 'bg-success' : 'bg-secondary'">
              {{ item.isOpen ? 'Buka' : 'Tutup' }}
            </span>
          </div>
          <div class="p-2 d-flex flex-column" style="flex:1;">
            <h6 class="fw-bold mb-0" style="font-size:13px;">{{ item.name }}</h6>
            <small class="text-muted">{{ item.category }}</small>
            <div class="d-flex justify-content-between align-items-center mt-1 mb-2">
              <small class="text-warning fw-bold">
                <i class="bi bi-star-fill"></i> {{ item.rating }}
              </small>
              <small class="text-muted">{{ item.distance }}</small>
            </div>
            <!-- Produk dari restoran ini -->
            <div class="mt-auto">
              <div
                v-for="product in item.products" :key="product.id"
                class="d-flex justify-content-between align-items-center py-1"
                style="border-top: 1px solid #f0f0f0; font-size:12px;"
              >
                <span class="text-truncate me-2"
                style="cursor:pointer; text-decoration:underline dotted;"
                @click="openDetail(product)"
                >{{ product.nama }}</span>
                <div class="d-flex align-items-center gap-1 flex-shrink-0">
                  <span class="fw-bold" style="font-size:11px;">{{ formatRp(product.harga) }}</span>
                  <button
                    class="btn btn-dark btn-sm rounded-circle p-0"
                    style="width:22px; height:22px; font-size:12px; line-height:1;"
                    :disabled="!item.isOpen"
                    @click="addToCart(product)"
                  >+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Restoran Terdekat -->
    <h6 class="fw-bold mb-3">📍 Restoran Terdekat</h6>
    <div
      v-for="resto in nearbyRestos" :key="resto.id"
      class="mb-3 p-3 rounded-3"
      style="background:#f9f9f9;"
    >
      <div class="d-flex align-items-center gap-3 mb-2">
        <img :src="resto.image" style="width:56px; height:56px; object-fit:cover; border-radius:12px;" :alt="resto.name">
        <div class="flex-grow-1">
          <div class="fw-bold" style="font-size:14px;">{{ resto.name }}</div>
          <small class="text-muted">{{ resto.category }} · {{ resto.distance }}</small>
        </div>
        <small class="text-warning fw-bold"><i class="bi bi-star-fill"></i> {{ resto.rating }}</small>
      </div>
      <!-- Menu restoran -->
      <div class="row g-2">
        <div v-for="product in resto.products" :key="product.id" class="col-6 col-lg-3">
          <div class="d-flex justify-content-between align-items-center bg-white rounded-3 p-2">
            <div>
              <div style="font-size:12px; font-weight:600; cursor:pointer; text-decoration:underline dotted;"
              @click="openDetail(product)"
              >{{ product.nama }}</div>
              <div style="font-size:11px; color:#888;">{{ formatRp(product.harga) }}</div>
            </div>
            <button
              class="btn btn-dark btn-sm rounded-circle p-0 flex-shrink-0"
              style="width:26px; height:26px; font-size:14px; line-height:1;"
              @click="addToCart(product)"
            >+</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredItems.length === 0" class="text-center text-muted mt-5">
      <i class="bi bi-compass fs-1 d-block mb-2"></i>
      <p>Tidak ada hasil ditemukan</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatRp } from '../utils/formatters'
const base = import.meta.env.BASE_URL

const searchQuery = ref('')
const activeTab = ref('Semua')
const tabs = ['Semua', 'Rabeg', 'Sate', 'Nasi', 'Seafood']

const emit = defineEmits(['back', 'add-to-cart', 'open-detail'])

const addToCart = (product) => {
  emit('add-to-cart', product)
}

const trendingItems = ref([
  {
    id: 1, name: 'Warung Rabeg Favorit', category: 'Rabeg', rating: 4.8, distance: '0.3 km', isOpen: true,
    image: `${base}/images/Untitled41.webp`,
    products: [
      { id: 101, nama: 'Rabeg Kambing', harga: 18000, image: `${base}/images/Untitled41.webp` },
      { id: 102, nama: 'Rabeg Spesial', harga: 22000, image: `${base}/images/Untitled41.webp` },
    ]
  },
  {
    id: 2, name: 'Sate Bandeng Serang', category: 'Sate', rating: 4.7, distance: '0.5 km', isOpen: true,
    image: `${base}/images/Satebandeng.jpeg`,
    products: [
      { id: 103, nama: 'Sate Bandeng', harga: 40000, image: `${base}/images/Satebandeng.jpeg` },
      { id: 104, nama: 'Sate Bebek', harga: 25000, image: `${base}/images/satebebek.webp` },
    ]
  },
  {
    id: 3, name: 'Nasi Uduk Bu Sari', category: 'Nasi', rating: 4.5, distance: '1.1 km', isOpen: false,
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=300&q=80',
    products: [
      { id: 105, nama: 'Nasi Uduk', harga: 15000 },
      { id: 106, nama: 'Nasi Kuning', harga: 18000 },
    ]
  },
  {
    id: 4, name: 'Pecak Ikan Tuna', category: 'Pecak', rating: 4.6, distance: '0.8 km', isOpen: true,
    image: `${base}/images/Pecaktuna.jpeg`,
    products: [
      { id: 107, nama: 'Pecak Ikan Tuna', harga: 28000, image: `${base}/images/Pecaktuna.jpeg` },
      { id: 108, nama: 'Pecak Bandeng', harga: 45000, image: `${base}/images/Pecakbandeng.webp` },
    ]
  },
  {
    id: 5, name: 'Udang Bakar Cilegon', category: 'Seafood', rating: 4.9, distance: '2.0 km', isOpen: true,
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=300&q=80',
    products: [
      { id: 109, nama: 'Udang Bakar', harga: 55000 },
      { id: 110, nama: 'Cumi Saus Tiram', harga: 48000 },
    ]
  },
  {
    id: 6, name: 'Sate Kambing Muda', category: 'Sate', rating: 4.4, distance: '1.5 km', isOpen: true,
    image: `${base}/images/satekambing.webp`,
    products: [
      { id: 111, nama: 'Sate Kambing', harga: 38000, image: `${base}/images/satekambing.webp` },
      { id: 112, nama: 'Sate Kikil', harga: 30000, image: `${base}/images/satekikil.webp` },
    ]
  },
])

const nearbyRestos = ref([
  {
    id: 1, name: 'Warung Rabeg H. Naswi', category: 'Rabeg', rating: 4.8, distance: '0.3 km',
    image: `${base}/images/Untitled41.webp`,
    products: [
      { id: 201, nama: 'Rabeg H.Naswi', harga: 16000, image: `${base}/images/Untitled41.webp` },
      { id: 202, nama: 'Rabeg Spesial', harga: 20000, image: `${base}/images/Untitled41.webp` },
      { id: 203, nama: 'Es Teh Manis', harga: 5000, image: `${base}/images/esteh.webp` },
      { id: 204, nama: 'Nasi Putih', harga: 4000, image: `${base}/images/nasiputih.webp` },
    ]
  },
  {
    id: 2, name: 'Sate Bandeng Ratu Toety', category: 'Sate', rating: 4.7, distance: '0.5 km',
    image: `${base}/images/Satebandeng.jpeg`,
    products: [
      { id: 205, nama: 'Sate Bandeng', harga: 40000, image: `${base}/images/Satebandeng.jpeg` },
      { id: 206, nama: 'Sate Bebek', harga: 35000, image: `${base}/images/satebebek.webp` },
      { id: 207, nama: 'Lontong', harga: 5000, image: `${base}/images/Lontong Sayur.webp` },
      { id: 208, nama: 'Es Jeruk', harga: 8000, image: `${base}/images/esjeruk.webp` },
    ]
  },
  {
    id: 3, name: 'RM Nasi Kuning Tuban', category: 'Nasi', rating: 4.5, distance: '1.1 km',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=150&q=80',
    products: [
      { id: 209, nama: 'Nasi Kuning', harga: 22000, image: `${base}/images/nasikuning.webp` },
      { id: 210, nama: 'Nasi Goreng', harga: 25000, image: `${base}/images/nasigoreng.webp` },
      { id: 211, nama: 'Nasi Uduk', harga: 18000, image: `${base}/images/nasiuduk.webp` },
      { id: 212, nama: 'Teh Hangat', harga: 5000, image: `${base}/images/tehanget.webp` },
    ]
  },
])

const openDetail = (product) => {
  emit('open-detail', product)
}

const filteredItems = computed(() => {
  let items = trendingItems.value
  if (activeTab.value !== 'Semua') {
    items = items.filter(i => i.category === activeTab.value)
  }
  if (searchQuery.value) {
    items = items.filter(i => i.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  return items
})
</script>