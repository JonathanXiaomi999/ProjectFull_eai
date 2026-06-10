export const formatRp = (angka) => {
  return "Rp" + angka.toLocaleString('id-ID')
}

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
