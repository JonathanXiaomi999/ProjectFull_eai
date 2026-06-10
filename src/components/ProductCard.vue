<template>
    <div class="card border-0 shadow-sm h-100 rounded-3" style="cursor:pointer;" @click="$emit('open-detail', product)">
    <img :src="product.image" class="product-img p-2" :alt="product.nama">
    <div class="card-body p-2 pt-0">
      <small class="text-muted d-block" style="font-size: 10px;">Brand</small>
      <h6 class="card-title fw-bold mb-1" style="font-size: 13px;">{{ product.nama }}</h6>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <span class="fw-bold" style="font-size: 14px;">{{ formatRp(product.harga) }}</span>
        <button
          class="btn btn-sm btn-dark rounded-circle"
          @click.stop="handleAddToCart"
        >
          <i class="bi bi-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatRp } from '../utils/formatters'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart', 'open-detail'])

const handleAddToCart = () => {
  console.log('ProductCard: Button clicked!', props.product)
  emit('add-to-cart', {
    id: props.product.id,
    nama: props.product.nama,
    harga: props.product.harga
  })
}
</script>
