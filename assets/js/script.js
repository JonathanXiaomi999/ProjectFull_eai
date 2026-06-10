let keranjang = [];
const PAJAK = 1500;

// Fungsi Format Rupiah
const formatRp = (angka) => {
    return "Rp" + angka.toLocaleString('id-ID');
}

// Navigasi antar halaman (SPA Mode)
function gantiHalaman(idHalaman) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(idHalaman).classList.add('active');
    
    // Atur tampilan Bottom Nav (hilang di checkout)
    if(idHalaman === 'view-checkout') {
        document.getElementById('bottom-nav').style.display = 'none';
        renderCheckout();
    } else {
        document.getElementById('bottom-nav').style.display = 'flex';
    }

    if(idHalaman === 'view-cart') renderKeranjang();
}

// Tambah Data Keranjang
function tambahKeKeranjang(id, nama, harga) {
    const index = keranjang.findIndex(item => item.id === id);
    if(index !== -1) {
        keranjang[index].qty += 1;
    } else {
        keranjang.push({ id, nama, harga, qty: 1 });
    }
    updateBadge();
    alert(`${nama} ditambahkan ke keranjang!`);
}

// Update Angka Notifikasi Keranjang
function updateBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = keranjang.reduce((sum, item) => sum + item.qty, 0);
    if(totalItems > 0) {
        badge.style.display = 'block';
        badge.innerText = totalItems;
    } else {
        badge.style.display = 'none';
    }
}

// Render HTML Keranjang
function renderKeranjang() {
    const container = document.getElementById('cart-items');
    let html = '';
    let subtotal = 0;

    keranjang.forEach(item => {
        subtotal += item.harga * item.qty;
        html += `
        <div class="d-flex align-items-center mb-3">
            <div class="flex-grow-1">
                <h6 class="fw-bold mb-0">${item.nama}</h6>
                <span class="fw-bold">${formatRp(item.harga)}</span>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary" onclick="ubahQty(${item.id}, -1)">-</button>
                <span class="mx-2 fw-bold">${item.qty}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="ubahQty(${item.id}, 1)">+</button>
            </div>
        </div>`;
    });

    if(keranjang.length === 0) html = '<p class="text-center text-muted">Keranjang masih kosong.</p>';
    
    container.innerHTML = html;
    document.getElementById('cart-subtotal').innerText = formatRp(subtotal);
    document.getElementById('cart-total').innerText = subtotal > 0 ? formatRp(subtotal + PAJAK) : 'Rp0';
}

// Render HTML Checkout
function renderCheckout() {
    const container = document.getElementById('checkout-items');
    let html = '';
    keranjang.forEach(item => {
        html += `
        <div class="d-flex justify-content-between mb-2">
            <div>
                <div class="small fw-bold">${item.nama}</div>
                <div class="text-muted" style="font-size: 10px;">Quantity: ${String(item.qty).padStart(2, '0')}</div>
            </div>
            <div class="fw-bold">${formatRp(item.harga * item.qty)}</div>
        </div>`;
    });
    container.innerHTML = html;
}

// Fungsi Tambah/Kurang Qty di Keranjang    
function ubahQty(id, ubah) {
    const index = keranjang.findIndex(item => item.id === id);
    if(index !== -1) {
        keranjang[index].qty += ubah;
        if(keranjang[index].qty <= 0) keranjang.splice(index, 1);
    }
    renderKeranjang();
    updateBadge();
}

// Simulasi Proses Pesanan
function prosesPesanan() {
    if(keranjang.length === 0) {
        alert('Keranjang kosong! Silakan pesan menu terlebih dahulu.');
        return;
    }
    
    const alamat = document.querySelector('input[name="alamat"]').value;
    if(!alamat) {
        alert('Harap isi alamat pengiriman terlebih dahulu!');
        return;
    }

    alert('Pesanan berhasil dibuat! Segera memproses pembayaran QRIS.');
    keranjang = []; // Kosongkan keranjang setelah sukses
    updateBadge();
    gantiHalaman('view-home');
}