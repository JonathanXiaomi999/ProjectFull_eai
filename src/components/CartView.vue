<template>
  <div class="view-section">
    <div class="d-flex align-items-center mb-4">
      <button class="btn border-0 p-0" @click="$emit('back')">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <h5 class="fw-bold mx-auto mb-0">My Cart</h5>
      <div style="width: 24px;"></div>
    </div>

    <div v-if="cart.items.length === 0" class="text-center text-muted mt-5">
      <p>Keranjang masih kosong.</p>
    </div>

    <div v-else class="mb-4">
      <div v-for="item in cart.items" :key="item.id" class="d-flex align-items-center mb-3">
        <div class="flex-grow-1">
          <h6 class="fw-bold mb-0">{{ item.nama }}</h6>
          <span class="fw-bold">{{ formatRp(item.harga) }}</span>
        </div>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="cart.updateQty(item.id, item.qty - 1)"
          >
            -
          </button>
          <span class="mx-2 fw-bold">{{ item.qty }}</span>
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="cart.updateQty(item.id, item.qty + 1)"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <div class="border-top pt-3">
      <div class="d-flex justify-content-between mb-2 small">
        <span class="text-muted">Sub-total</span>
        <span class="fw-bold">{{ formatRp(cart.subtotal) }}</span>
      </div>
      <div class="d-flex justify-content-between mb-2 small">
        <span class="text-muted">Taxes</span>
        <span class="fw-bold">{{ formatRp(cart.TAX) }}</span>
      </div>
      <div class="d-flex justify-content-between mb-3 fw-bold fs-5">
        <span>Total</span>
        <span>{{ formatRp(cart.total) }}</span>
      </div>
      <button
        class="btn btn-black"
        @click="$emit('go-checkout')"
        :disabled="cart.items.length === 0"
      >
        Go To Checkout <i class="bi bi-arrow-right float-end mt-1"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import { formatRp } from '../utils/formatters'

const cart = useCartStore()

defineEmits(['back', 'go-checkout'])
</script>
