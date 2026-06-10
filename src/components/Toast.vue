<template>
  <div class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast-item', toast.type, { removing: toast.removing }]"
    >
      <div class="toast-icon">
        <i :class="getIcon(toast.type)"></i>
      </div>
      <div class="toast-message">{{ toast.message }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const toasts = ref([])
let toastId = 0

const getIcon = (type) => {
  const icons = {
    success: 'bi bi-check-circle-fill',
    error: 'bi bi-exclamation-circle-fill',
    info: 'bi bi-info-circle-fill'
  }
  return icons[type] || icons.info
}

const showToast = (message, type = 'info', duration = 3000) => {
  const id = toastId++
  const toast = { id, message, type, removing: false }
  toasts.value.push(toast)

  setTimeout(() => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value[index].removing = true
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }, 300)
    }
  }, duration)
}

defineExpose({ showToast })
</script>
