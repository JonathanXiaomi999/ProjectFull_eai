<template>
  <div id="app-container">

    <!-- Splash Screen -->
    <Transition name="splash">
      <div v-if="showSplash" class="splash-screen">
        <div class="splash-content">
          <div class="splash-logo">
            <span class="splash-icon">🍜</span>
          </div>
          <h2 class="splash-title">Jawara Kuliner</h2>
          <p class="splash-subtitle">Cita rasa terbaik, dekat dari kamu</p>
          <div class="splash-bar-wrap">
            <div class="splash-bar" :style="{ width: loadProgress + '%' }"></div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main App -->
    <Transition name="fade-up">
      <div v-if="!showSplash">

        <!-- Loading overlay (existing) -->
        <div v-if="isLoading" class="loading-overlay">
          <div class="spinner"></div>
          <p>Memuat...</p>
        </div>

        <HomeView         v-if="currentView === 'home'"          @add-to-cart="handleAddToCart"
        @open-detail="openDetail"
         />
        <ProductDetailView
  v-if="currentView === 'detail'"
  :product="selectedProduct"
  @back="currentView = 'home'"
  @add-to-cart="handleAddToCart"
/>
        <CartView         v-if="currentView === 'cart'"          @back="goHome" @go-checkout="currentView = 'checkout'" />
        <CheckoutView     v-if="currentView === 'checkout'"      @back="currentView = 'cart'" @show-toast="showToast" @order-placed="handleOrderPlaced" />
        <ExploreView      v-if="currentView === 'explore'"       @back="goHome" />
        <NotificationsView v-if="currentView === 'notifications'" @back="goHome" />
        <ProfileView      v-if="currentView === 'profile'"       @back="goHome" />
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
import { ref, onMounted } from 'vue'
import { useCartStore } from './stores/cartStore'
import HomeView from './components/HomeView.vue'
import CartView from './components/CartView.vue'
import CheckoutView from './components/CheckoutView.vue'
import ExploreView from './components/ExploreView.vue'
import NotificationsView from './components/NotificationsView.vue'
import ProfileView from './components/ProfileView.vue'
import BottomNav from './components/BottomNav.vue'
import Toast from './components/Toast.vue'
import ProductDetailView from './components/ProductDetailView.vue'


const currentView = ref('home')
const isLoading = ref(true)
const showSplash = ref(true)
const loadProgress = ref(0)
const cart = useCartStore()
const toastRef = ref(null)
const selectedProduct = ref(null)


onMounted(() => {
  // Animate the progress bar
  const interval = setInterval(() => {
    loadProgress.value += Math.random() * 18 + 8
    if (loadProgress.value >= 100) {
      loadProgress.value = 100
      clearInterval(interval)
    }
  }, 120)
  
  // Hide splash after 2s
  setTimeout(() => {
    showSplash.value = false
    // Then hide inner loading overlay shortly after
    setTimeout(() => {
      isLoading.value = false
      showToast('Selamat datang di Jawara Kuliner! 🍜', 'success')
    }, 400)
  }, 2000)
})

const openDetail = (product) => {
  selectedProduct.value = product
  currentView.value = 'detail'
}

const navigateTo = (view) => {
  if (view === 'cart' && cart.items.length === 0) {
    showToast('Keranjang masih kosong!', 'info')
  }
  currentView.value = view
}

const goHome = () => { currentView.value = 'home' }

const handleAddToCart = (product) => {
  cart.addItem(product.id, product.nama, product.harga)
  showToast(`${product.nama} ditambahkan ke keranjang!`, 'success')
}

const handleOrderPlaced = () => { currentView.value = 'home' }

const showToast = (message, type = 'info') => {
  toastRef.value?.showToast(message, type)
}
</script>

<style scoped>
/* ── Splash Screen ── */
.splash-screen {
  position: fixed;
  inset: 0;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.splash-logo {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  box-shadow: 0 8px 30px rgba(255,255,255,0.15);
}

.splash-icon {
  font-size: 40px;
  line-height: 1;
}

.splash-title {
  color: #fff;
  font-weight: 800;
  font-size: 24px;
  margin: 0;
  animation: fadeSlideUp 0.5s ease 0.3s both;
  letter-spacing: -0.5px;
}

.splash-subtitle {
  color: #aaa;
  font-size: 13px;
  margin: 0;
  animation: fadeSlideUp 0.5s ease 0.45s both;
}

.splash-bar-wrap {
  width: 140px;
  height: 3px;
  background: #333;
  border-radius: 99px;
  overflow: hidden;
  margin-top: 8px;
  animation: fadeSlideUp 0.5s ease 0.6s both;
}

.splash-bar {
  height: 100%;
  background: #fff;
  border-radius: 99px;
  transition: width 0.15s ease;
}

/* ── Splash exit transition ── */
.splash-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.splash-leave-to {
  opacity: 0;
  transform: scale(1.04);
}

/* ── App enter transition ── */
.fade-up-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

/* ── Keyframes ── */
@keyframes popIn {
  from { transform: scale(0.5); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0);    }
}
</style>