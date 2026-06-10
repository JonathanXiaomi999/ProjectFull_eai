import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const TAX = 1500

  const addItem = (id, nama, harga) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value[index].qty += 1
    } else {
      items.value.push({ id, nama, harga, qty: 1 })
    }
    return items.value[index !== -1 ? index : items.value.length - 1]
  }

  const updateQty = (id, newQty) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      if (newQty <= 0) {
        items.value.splice(index, 1)
      } else {
        items.value[index].qty = newQty
      }
    }
  }

  const removeItem = (id) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => sum + item.harga * item.qty, 0)
  })

  const total = computed(() => {
    return subtotal.value > 0 ? subtotal.value + TAX : 0
  })

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.qty, 0)
  })

  return {
    items,
    TAX,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    subtotal,
    total,
    totalItems
  }
})
