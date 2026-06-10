<template>
  <div class="view-section">
    <div class="d-flex align-items-center mb-4">
      <button class="btn border-0 p-0" @click="$emit('back')">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <h5 class="fw-bold mx-auto mb-0">Profile</h5>
      <div style="width: 24px;"></div>
    </div>

    <div class="card border-0 shadow-sm rounded-3 mb-4">
      <div class="card-body p-4 text-center">
        <div class="mb-3">
          <i class="bi bi-person-circle" style="font-size: 60px; color: #111;"></i>
        </div>
        <h5 class="fw-bold mb-1">{{ user.name }}</h5>
        <p class="text-muted mb-0">{{ user.email }}</p>
      </div>
    </div>

    <div class="card border-0 shadow-sm rounded-3 mb-2">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <i class="bi bi-map-fill text-primary me-3"></i>
          <div class="flex-grow-1">
            <small class="text-muted d-block">Alamat Pengiriman</small>
            <h6 class="fw-bold mb-0">{{ user.address }}</h6>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <i class="bi bi-telephone-fill text-success me-3"></i>
          <div class="flex-grow-1">
            <small class="text-muted d-block">Telepon</small>
            <h6 class="fw-bold mb-0">{{ user.phone }}</h6>
          </div>
        </div>
      </div>
    </div>

    <button class="btn btn-black mt-4">
      <i class="bi bi-box-arrow-right me-2"></i>Logout
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'Pengguna Jawara',
  email: 'user@jawarakuliner.com',
  address: 'Jl. Merdeka No. 123, Kota Bandung',
  phone: '+62 812-3456-7890'
})

defineEmits(['back'])
</script>
