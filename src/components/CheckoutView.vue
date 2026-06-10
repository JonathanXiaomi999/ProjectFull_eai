<template>
  <div class="view-section">
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
      <div class="mb-4">
        <div v-for="item in cart.items" :key="item.id" class="d-flex justify-content-between mb-2">
          <div>
            <div class="small fw-bold">{{ item.nama }}</div>
            <div class="text-muted" style="font-size: 10px;">Quantity: {{ String(item.qty).padStart(2, '0') }}</div>
          </div>
          <div class="fw-bold">{{ formatRp(item.harga * item.qty) }}</div>
        </div>
      </div>

      <button type="submit" class="btn btn-black">
        Place order
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { formatRp } from '../utils/formatters'

const cart = useCartStore()
const address = ref('')

const emit = defineEmits(['back', 'order-placed'])

const handleCheckout = () => {
  if (!address.value.trim()) {
    emit('show-toast', { message: 'Harap isi alamat pengiriman terlebih dahulu!', type: 'error' })
    return
  }

  emit('show-toast', { message: 'Pesanan berhasil dibuat! Segera memproses pembayaran QRIS.', type: 'success' })

  setTimeout(() => {
    cart.clearCart()
    address.value = ''
    emit('order-placed')
  }, 500)
}
</script>
