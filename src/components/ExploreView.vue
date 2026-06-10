<template>
  <div class="view-section">
    <!-- Header -->
    <div class="d-flex align-items-center mb-4">
      <button class="btn border-0 p-0" @click="$emit('back')">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <h5 class="fw-bold mx-auto mb-0">Explore</h5>
      <div style="width:24px;"></div>
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
        v-for="tab in tabs"
        :key="tab"
        class="btn btn-sm rounded-pill flex-shrink-0"
        :class="activeTab === tab ? 'btn-dark' : 'btn-outline-secondary'"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Trending Section -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h6 class="fw-bold mb-0">🔥 Trending Sekarang</h6>
    </div>
    <div class="row g-3 mb-4">
      <div v-for="item in filteredItems" :key="item.id" class="col-6">
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
          <div class="position-relative">
            <img :src="item.image" class="w-100" style="height:110px; object-fit:cover;" :alt="item.name">
            <span class="badge position-absolute top-0 end-0 m-2"
              :class="item.isOpen ? 'bg-success' : 'bg-secondary'">
              {{ item.isOpen ? 'Buka' : 'Tutup' }}
            </span>
          </div>
          <div class="p-2">
            <h6 class="fw-bold mb-0" style="font-size:13px;">{{ item.name }}</h6>
            <small class="text-muted">{{ item.category }}</small>
            <div class="d-flex justify-content-between align-items-center mt-1">
              <small class="text-warning fw-bold">
                <i class="bi bi-star-fill"></i> {{ item.rating }}
              </small>
              <small class="text-muted">{{ item.distance }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nearby Restaurants -->
    <h6 class="fw-bold mb-3">📍 Restoran Terdekat</h6>
    <div v-for="resto in nearbyRestos" :key="resto.id"
      class="d-flex align-items-center gap-3 p-2 rounded-3 mb-2"
      style="background:#f9f9f9; cursor:pointer;"
    >
      <img :src="resto.image" style="width:56px; height:56px; object-fit:cover; border-radius:12px;" :alt="resto.name">
      <div class="flex-grow-1">
        <div class="fw-bold" style="font-size:14px;">{{ resto.name }}</div>
        <small class="text-muted">{{ resto.category }} · {{ resto.distance }}</small>
      </div>
      <div class="text-end">
        <small class="text-warning fw-bold"><i class="bi bi-star-fill"></i> {{ resto.rating }}</small>
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

const searchQuery = ref('')
const activeTab = ref('Semua')
const tabs = ['Semua', 'Rabeg', 'Sate', 'Nasi', 'Seafood']

const trendingItems = ref([
  { id: 1,  name: 'Rabeg Favorit',        category: 'Rabeg',   rating: 4.8, distance: '0.3 km', isOpen: true,  image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80' },
  { id: 2,  name: 'Sate Bandeng Serang',  category: 'Sate',    rating: 4.7, distance: '0.5 km', isOpen: true,  image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=300&q=80' },
  { id: 3,  name: 'Nasi Uduk Bu Sari',    category: 'Nasi',    rating: 4.5, distance: '1.1 km', isOpen: false, image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=300&q=80' },
  { id: 4,  name: 'Pecak Lele Pak Haji',  category: 'Pecak',   rating: 4.6, distance: '0.8 km', isOpen: true,  image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=300&q=80' },
  { id: 5,  name: 'Udang Bakar Cilegon',  category: 'Seafood', rating: 4.9, distance: '2.0 km', isOpen: true,  image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=300&q=80' },
  { id: 6,  name: 'Sate Kambing Muda',    category: 'Sate',    rating: 4.4, distance: '1.5 km', isOpen: true,  image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=300&q=80' },
])

const nearbyRestos = ref([
  { id: 1, name: 'Warung Rabeg H. Naswi',   category: 'Rabeg',   rating: 4.8, distance: '0.3 km', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'Sate Bandeng Ratu Toety', category: 'Sate',    rating: 4.7, distance: '0.5 km', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'RM Nasi Kuning Tuban',    category: 'Nasi',    rating: 4.5, distance: '1.1 km', image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=150&q=80' },
  { id: 4, name: 'Seafood Bang Joni',       category: 'Seafood', rating: 4.9, distance: '1.8 km', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=150&q=80' },
])

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

defineEmits(['back'])
</script>