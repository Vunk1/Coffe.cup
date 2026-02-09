// Toggle Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Periksa apakah elemen ada sebelum mengaksesnya
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Hanya jalankan kode jika elemen ditemukan
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Periksa apakah ikon ditemukan sebelum mengaksesnya
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Tutup menu mobile saat klik link (jika ada)
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (navLinks.length > 0 && navToggle) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu) navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Order Modal
    const orderButtons = document.querySelectorAll('.btn-order');
    const orderModal = document.getElementById('orderModal');
    
    // Hanya jalankan jika elemen modal ditemukan
    if (orderModal) {
        const modalClose = document.querySelector('.modal-close');
        const orderForm = document.getElementById('orderForm');
        const productNameInput = document.getElementById('productName');
        const productPriceInput = document.getElementById('productPrice');
        const quantityInput = document.getElementById('quantity');
        const summaryQuantity = document.getElementById('summaryQuantity');
        const summaryTotal = document.getElementById('summaryTotal');
        
        // Tutup modal (jika tombol close ada)
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        // Buka modal saat tombol pesan diklik
        if (orderButtons.length > 0) {
            orderButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const product = this.getAttribute('data-product');
                    const price = this.getAttribute('data-price');
                    
                    if (productNameInput) productNameInput.value = product;
                    if (productPriceInput) productPriceInput.value = `Rp ${parseInt(price).toLocaleString('id-ID')}`;
                    if (quantityInput) quantityInput.value = 1;
                    
                    updateOrderSummary(price, 1);
                    
                    orderModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
        }
        
        // Tutup modal saat klik di luar modal
        orderModal.addEventListener('click', function(e) {
            if (e.target === orderModal) {
                closeModal();
            }
        });
        
        // Update ringkasan pesanan saat jumlah berubah
        if (quantityInput) {
            quantityInput.addEventListener('input', function() {
                const product = productNameInput ? productNameInput.value : '';
                if (product) {
                    const productButton = document.querySelector(`.btn-order[data-product="${product}"]`);
                    if (productButton) {
                        const price = productButton.getAttribute('data-price');
                        updateOrderSummary(price, this.value);
                    }
                }
            });
        }
        
        // Handle form submission
        if (orderForm) {
            orderForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const product = productNameInput ? productNameInput.value : '';
                let price = '';
                
                if (product) {
                    const productButton = document.querySelector(`.btn-order[data-product="${product}"]`);
                    if (productButton) {
                        price = productButton.getAttribute('data-price');
                    }
                }
                
                const quantity = quantityInput ? quantityInput.value : '1';
                const customerName = document.getElementById('customerName') ? document.getElementById('customerName').value : '';
                const customerPhone = document.getElementById('customerPhone') ? document.getElementById('customerPhone').value : '';
                const customerAddress = document.getElementById('customerAddress') ? document.getElementById('customerAddress').value : '';
                const deliveryOption = document.getElementById('deliveryOption') ? document.getElementById('deliveryOption').value : '';
                
                const total = parseInt(price) * parseInt(quantity);
                
                // Format pesan untuk WhatsApp
                const message = `Halo, saya ingin memesan kopi dari Kopi Cup UMKM%0A%0A` +
                               `*Detail Pesanan:*%0A` +
                               `Produk: ${product}%0A` +
                               `Jumlah: ${quantity} cup%0A` +
                               `Total: Rp ${total.toLocaleString('id-ID')}%0A` +
                               `Metode: ${deliveryOption === 'pickup' ? 'Ambil di tempat' : 'Antar ke alamat'}%0A%0A` +
                               `*Data Pemesan:*%0A` +
                               `Nama: ${customerName}%0A` +
                               `No. HP: ${customerPhone}%0A` +
                               `Alamat: ${customerAddress}%0A%0A` +
                               `Terima kasih!`;
                
                // Redirect ke WhatsApp - NOMOR WHATSAPP: 082161135392
                const phoneNumber = "6282161135392"; // Format internasional
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                
                // Buka WhatsApp di tab baru
                window.open(whatsappUrl, '_blank');
                
                // Reset form dan tutup modal
                orderForm.reset();
                closeModal();
                
                // Tampilkan pesan sukses
                alert('Terima kasih! Pesanan Anda telah dikirim. Kami akan menghubungi Anda segera via WhatsApp.');
            });
        }
        
        // Fungsi update ringkasan pesanan
        function updateOrderSummary(price, quantity) {
            if (!price || !quantity) return;
            
            const total = parseInt(price) * parseInt(quantity);
            
            if (summaryQuantity) {
                summaryQuantity.textContent = `${quantity} cup`;
            }
            
            if (summaryTotal) {
                summaryTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
            }
        }
        
        // Fungsi tutup modal
        function closeModal() {
            orderModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset form jika ada
            if (orderForm) {
                orderForm.reset();
            }
        }
    }
    
    // Smooth scroll untuk link navigasi
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip untuk link yang tidak mengarah ke bagian halaman
            if (href === "#" || href === "#!") return;
            
            e.preventDefault();
            
            // Cari target elemen
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tambahkan kelas active pada navigasi saat scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});