<template>
  <nav class="bottom-nav">
    <button
      @click="$emit('navigate', 'home')"
      :class="{ active: currentView === 'home' }"
      title="Home"
    >
      <i class="bi bi-house-door"></i>
    </button>
    <button
      @click="$emit('navigate', 'explore')"
      :class="{ active: currentView === 'explore' }"
      title="Explore"
    >
      <i class="bi bi-compass"></i>
    </button>
    <button
      @click="$emit('navigate', 'cart')"
      :class="{ active: currentView === 'cart', 'position-relative': true }"
      title="Cart"
    >
      <i class="bi bi-cart"></i>
      <span v-if="cartTotal > 0" class="cart-badge">{{ cartTotal }}</span>
    </button>
    <button
      @click="$emit('navigate', 'notifications')"
      :class="{ active: currentView === 'notifications' }"
      title="Notifications"
    >
      <i class="bi bi-bell"></i>
    </button>
    <button
      @click="$emit('navigate', 'profile')"
      :class="{ active: currentView === 'profile' }"
      title="Profile"
    >
      <i class="bi bi-person"></i>
    </button>
  </nav>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import { computed } from 'vue'

defineProps({
  currentView: {
    type: String,
    required: true
  }
})

const cart = useCartStore()
const cartTotal = computed(() => cart.totalItems)

defineEmits(['navigate'])
</script>
