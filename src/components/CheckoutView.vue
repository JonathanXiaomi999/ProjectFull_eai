<template>
  <div class="view-section">

    <!-- QR Code Modal -->
    <div v-if="showQR" class="qr-overlay" @click.self="closeQR">
      <div class="qr-modal">
        <div class="qr-header">
          <h6 class="fw-bold mb-0">Bayar dengan QRIS</h6>
          <button class="btn border-0 p-0" @click="closeQR">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="qr-amount">
          <small class="text-muted">Total Pembayaran</small>
          <div class="fw-bold fs-5">{{ formatRp(cart.total) }}</div>
        </div>

        <!-- QR Code -->
        <div class="qr-code-wrap">
          <canvas ref="qrCanvas"></canvas>
        </div>

        <p class="text-muted text-center" style="font-size: 12px;">
          Scan QR code ini dengan aplikasi e-wallet atau m-banking kamu
        </p>

        <div class="qr-timer">
          <i class="bi bi-clock"></i>
          Berlaku selama <strong>{{ countdown }}</strong> detik
        </div>

        <button class="btn btn-black mt-3" @click="confirmPayment">
          <i class="bi bi-check-circle me-2"></i>Konfirmasi Pembayaran
        </button>
      </div>
    </div>

    <!-- Checkout Form -->
    <div class="d-flex align-items-center mb-4">
      <button class="btn border-0 p-0" @click="$emit('back')">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <h5 class="fw-bold mx-auto mb-0">Checkout</h5>
      <div style="width: 24px;"></div>
    </div>

    <form @submit.prevent="handleCheckout">
      <div class="mb-3 border-bottom pb-2">
        <label class="text-muted small">Alamat</label>
        <div class="d-flex justify-content-between align-items-center">
          <input
            v-model="address"
            type="text"
            class="form-control border-0 px-0 fw-bold"
            placeholder="Tambahkan alamat detail..."
            required
          >
          <i class="bi bi-chevron-right text-muted"></i>
        </div>
      </div>

      <div class="mb-3 border-bottom pb-2">
        <label class="text-muted small">Pengiriman</label>
        <div class="fw-bold">Free <span class="text-muted fw-normal small ms-2">Standard | 3-4 days</span></div>
      </div>

      <div class="mb-4 border-bottom pb-2">
        <label class="text-muted small">Payment</label>
        <div class="fw-bold">QRIS</div>
      </div>

      <h6 class="fw-bold mb-3">ITEMS</h6>
      <div class="mb-3">
        <div v-for="item in cart.items" :key="item.id" class="d-flex justify-content-between mb-2">
          <div>
            <div class="small fw-bold">{{ item.nama }}</div>
            <div class="text-muted" style="font-size: 10px;">Quantity: {{ String(item.qty).padStart(2, '0') }}</div>
          </div>
          <div class="fw-bold">{{ formatRp(item.harga * item.qty) }}</div>
        </div>
      </div>

      <!-- Total -->
      <div class="d-flex justify-content-between fw-bold border-top pt-3 mb-4">
        <span>Total</span>
        <span>{{ formatRp(cart.total) }}</span>
      </div>

      <button type="submit" class="btn btn-black">
        <i class="bi bi-qr-code me-2"></i>Place order
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { formatRp } from '../utils/formatters'

const cart = useCartStore()
const address = ref('')
const showQR = ref(false)
const qrCanvas = ref(null)
const countdown = ref(120)
let countdownTimer = null

const emit = defineEmits(['back', 'order-placed', 'show-toast'])

// Generate QR code menggunakan QRious library
const generateQR = async () => {
  await nextTick()
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js'
  script.onload = () => {
    const qrData = `JAWARA-KULINER|${address.value}|${cart.total}|${Date.now()}`
    new window.QRious({
      element: qrCanvas.value,
      value: qrData,
      size: 200,
      backgroundAlpha: 1,
      foreground: '#111111',
      background: '#ffffff',
      level: 'H'
    })
  }
  document.head.appendChild(script)
}

const startCountdown = () => {
  countdown.value = 120
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      closeQR()
      emit('show-toast', 'QR Code kadaluarsa. Silakan coba lagi.', 'error')
    }
  }, 1000)
}

const handleCheckout = () => {
  if (!address.value.trim()) {
    emit('show-toast', 'Harap isi alamat pengiriman terlebih dahulu!', 'error')
    return
  }
  showQR.value = true
  generateQR()
  startCountdown()
}

const closeQR = () => {
  showQR.value = false
  clearInterval(countdownTimer)
}

const confirmPayment = () => {
  clearInterval(countdownTimer)
  showQR.value = false
  emit('show-toast', 'Pembayaran berhasil! Pesanan sedang diproses. 🎉', 'success')
  setTimeout(() => {
    cart.clearCart()
    address.value = ''
    emit('order-placed')
  }, 800)
}

onUnmounted(() => clearInterval(countdownTimer))
</script>

<style scoped>
/* QR Overlay */
.qr-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.qr-modal {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.qr-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qr-amount {
  width: 100%;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 12px 16px;
  text-align: center;
}

.qr-code-wrap {
  background: #fff;
  border: 2px solid #f0f0f0;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-code-wrap canvas {
  display: block;
}

.qr-timer {
  background: #fff8e1;
  color: #b8860b;
  border-radius: 99px;
  padding: 6px 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-black {
  width: 100%;
}
</style>