<template>
  <!-- Desktop: sidebar + main -->
  <div v-if="isDesktop" id="desktop-layout">

    <!-- Sidebar -->
    <div id="desktop-sidebar">
      <div class="sidebar-logo">
        <span>🍜</span>
        <span>Jawara Kuliner</span>
      </div>

      <div
        v-for="item in navItems" :key="item.view"
        class="sidebar-nav-item"
        :class="{ active: currentView === item.view }"
        @click="navigateTo(item.view)"
      >
        <i :class="item.icon"></i>
        {{ item.label }}
        <span v-if="item.view === 'cart' && cart.totalItems > 0" class="sidebar-cart-badge">
          {{ cart.totalItems }}
        </span>
      </div>
    </div>

    <!-- Main content -->
    <div id="desktop-main">
      <div id="app-container">
        <AppContent
          :current-view="currentView"
          :selected-product="selectedProduct"
          :is-loading="isLoading"
          @navigate="navigateTo"
          @add-to-cart="handleAddToCart"
          @open-detail="openDetail"
          @go-home="goHome"
          @go-checkout="currentView = 'checkout'"
          @go-cart="currentView = 'cart'"
          @show-toast="showToast"
          @order-placed="handleOrderPlaced"
        />
        <Toast ref="toastRef" />
      </div>
    </div>
  </div>

  <!-- Mobile: layout biasa -->
  <div v-else id="app-container">
    <Transition name="splash">
      <div v-if="showSplash" class="splash-screen">
        <div class="splash-content">
          <div class="splash-logo"><span class="splash-icon">🍜</span></div>
          <h2 class="splash-title">Jawara Kuliner</h2>
          <p class="splash-subtitle">Cita rasa terbaik, dekat dari kamu</p>
          <div class="splash-bar-wrap">
            <div class="splash-bar" :style="{ width: loadProgress + '%' }"></div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade-up">
      <div v-if="!showSplash">
        <div v-if="isLoading" class="loading-overlay">
          <div class="spinner"></div>
          <p>Memuat...</p>
        </div>
        <AppContent
          :current-view="currentView"
          :selected-product="selectedProduct"
          :is-loading="isLoading"
          @navigate="navigateTo"
          @add-to-cart="handleAddToCart"
          @open-detail="openDetail"
          @go-home="goHome"
          @go-checkout="currentView = 'checkout'"
          @go-cart="currentView = 'cart'"
          @show-toast="showToast"
          @order-placed="handleOrderPlaced"
        />
        <BottomNav
          v-if="currentView !== 'checkout' && currentView !== 'detail'"
          :current-view="currentView"
          @navigate="navigateTo"
        />
        <Toast ref="toastRef" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineComponent, h } from 'vue'
import { useCartStore } from './stores/cartStore'
import HomeView from './components/HomeView.vue'
import CartView from './components/CartView.vue'
import CheckoutView from './components/CheckoutView.vue'
import ExploreView from './components/ExploreView.vue'
import NotificationsView from './components/NotificationsView.vue'
import ProfileView from './components/ProfileView.vue'
import ProductDetailView from './components/ProductDetailView.vue'
import BottomNav from './components/BottomNav.vue'
import Toast from './components/Toast.vue'

// Komponen pembantu untuk render view aktif
const AppContent = defineComponent({
  props: ['currentView', 'selectedProduct', 'isLoading'],
  emits: ['navigate','add-to-cart','open-detail','go-home','go-checkout','go-cart','show-toast','order-placed'],
  setup(props, { emit }) {
    return () => {
      const v = props.currentView
      if (v === 'home') return h(HomeView, { onAddToCart: (p) => emit('add-to-cart', p), onOpenDetail: (p) => emit('open-detail', p) })
      if (v === 'detail') return h(ProductDetailView, { product: props.selectedProduct, onBack: () => emit('go-home'), onAddToCart: (p) => emit('add-to-cart', p) })
      if (v === 'cart') return h(CartView, { onBack: () => emit('go-home'), onGoCheckout: () => emit('go-checkout') })
      if (v === 'checkout') return h(CheckoutView, { onBack: () => emit('go-cart'), onShowToast: (m,t) => emit('show-toast', m, t), onOrderPlaced: () => emit('order-placed') })
      if (v === 'explore') return h(ExploreView, { onBack: () => emit('go-home'), onAddToCart: (p) => emit('add-to-cart', p), onOpenDetail: (p) => emit('open-detail', p) })
      if (v === 'notifications') return h(NotificationsView, { onBack: () => emit('go-home') })
      if (v === 'profile') return h(ProfileView, { onBack: () => emit('go-home') })
    }
  }
})

const currentView = ref('home')
const isLoading = ref(true)
const showSplash = ref(true)
const loadProgress = ref(0)
const selectedProduct = ref(null)
const isDesktop = ref(window.innerWidth >= 1024)
const cart = useCartStore()
const toastRef = ref(null)

const navItems = [
  { view: 'home',          label: 'Beranda',      icon: 'bi bi-house' },
  { view: 'explore',       label: 'Explore',      icon: 'bi bi-compass' },
  { view: 'cart',          label: 'Keranjang',    icon: 'bi bi-cart' },
  { view: 'notifications', label: 'Notifikasi',   icon: 'bi bi-bell' },
  { view: 'profile',       label: 'Profil',       icon: 'bi bi-person' },
]

const onResize = () => { isDesktop.value = window.innerWidth >= 1024 }

onMounted(() => {
  window.addEventListener('resize', onResize)

  const interval = setInterval(() => {
    loadProgress.value += Math.random() * 18 + 8
    if (loadProgress.value >= 100) {
      loadProgress.value = 100
      clearInterval(interval)
    }
  }, 120)

  setTimeout(() => {
    showSplash.value = false
    setTimeout(() => {
      isLoading.value = false
      showToast('Selamat datang di Jawara Kuliner! 🍜', 'success')
    }, 400)
  }, 2000)
})

onUnmounted(() => window.removeEventListener('resize', onResize))

const navigateTo = (view) => {
  if (view === 'cart' && cart.items.length === 0) {
    showToast('Keranjang masih kosong!', 'info')
    return
  }
  currentView.value = view
}

const goHome = () => { currentView.value = 'home' }
const openDetail = (product) => { selectedProduct.value = product; currentView.value = 'detail' }
const handleAddToCart = (product) => {
  cart.addItem(product.id, product.nama, product.harga)
  showToast(`${product.nama} ditambahkan ke keranjang!`, 'success')
}
const handleOrderPlaced = () => { currentView.value = 'home' }
const showToast = (message, type = 'info') => { toastRef.value?.showToast(message, type) }
</script>

<style scoped>
/* Splash */
.splash-screen {
  position: fixed; inset: 0;
  background: #111;
  display: flex; align-items: center; justify-content: center;
  z-index: 99999;
}
.splash-content { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.splash-logo {
  width: 80px; height: 80px; background: white; border-radius: 24px;
  display: flex; align-items: center; justify-content: center;
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.splash-icon { font-size: 40px; line-height: 1; }
.splash-title { color: #fff; font-weight: 800; font-size: 24px; margin: 0; animation: fadeSlideUp 0.5s ease 0.3s both; }
.splash-subtitle { color: #aaa; font-size: 13px; margin: 0; animation: fadeSlideUp 0.5s ease 0.45s both; }
.splash-bar-wrap { width: 140px; height: 3px; background: #333; border-radius: 99px; overflow: hidden; margin-top: 8px; animation: fadeSlideUp 0.5s ease 0.6s both; }
.splash-bar { height: 100%; background: #fff; border-radius: 99px; transition: width 0.15s ease; }

.splash-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.splash-leave-to { opacity: 0; transform: scale(1.04); }
.fade-up-enter-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up-enter-from { opacity: 0; transform: translateY(16px); }

@keyframes popIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>