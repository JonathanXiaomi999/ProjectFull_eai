<template>
  <div class="view-section">
    <div class="d-flex align-items-center mb-4">
      <button class="btn border-0 p-0" @click="$emit('back')">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <h5 class="fw-bold mx-auto mb-0">Notifications</h5>
      <div style="width: 24px;"></div>
    </div>

    <div v-if="notifications.length === 0" class="text-center text-muted mt-5">
      <p>Tidak ada notifikasi</p>
    </div>

    <div v-else>
      <div v-for="notif in notifications" :key="notif.id" class="card mb-2 border-0 shadow-sm rounded-3">
        <div class="card-body p-3">
          <div class="d-flex">
            <div class="me-3">
              <i class="bi bi-bell-fill text-warning fs-5"></i>
            </div>
            <div class="flex-grow-1">
              <h6 class="fw-bold mb-1" style="font-size: 14px;">{{ notif.title }}</h6>
              <small class="text-muted">{{ notif.message }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([
  { id: 1, title: 'Order Status', message: 'Pesanan Anda sedang disiapkan' },
  { id: 2, title: 'Discount', message: 'Dapatkan diskon 20% untuk Rabeg!' },
  { id: 3, title: 'Delivery', message: 'Pesanan tiba dalam 15 menit' }
])

defineEmits(['back'])
</script>
