document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. AUTO COPYRIGHT YEAR =================
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ================= 2. PRODUCT DATA =================
    const products = [
        { id: 1, name: '6" Wide Joint Knife', code: '#1002', price: '₹28', desc: '', image: 'images/image2.jpg', category: 'knife' },
        { id: 2, name: '12" Wide Joint Knife', code: '#1004', price: '₹42', desc: '', image: 'images/image3.jpg', category: 'knife' },
        { id: 3, name: '3" Wide Scraper', code: '#1003', price: '₹12', desc: '', image: 'images/image4.jpg', category: 'scraper' },
        { id: 4, name: '8" Wide Joint Knife', code: '#1061', price: '₹32', desc: '', image: 'images/image5.jpg', category: 'knife' },
        { id: 5, name: 'Saw-Tooth Adhesive Trowel (12")', code: '', price: '₹110', desc: 'Precise & Fast Application', image: 'images/image6.jpg', category: 'trowel' },
        { id: 6, name: 'Notched Adhesive Trowel (12")', code: '', price: '₹35', desc: 'Uniform Coverage', image: 'images/image7.jpg', category: 'trowel' },
        { id: 7, name: 'Plastic/ABS Float (10")', code: '', price: '₹37', desc: 'Final Concrete Smooth Finish', image: 'images/image8.jpg', category: 'float' },
        { id: 8, name: 'Drywall Sander (6")', code: '', price: '₹35', desc: 'Efficient & Dust-Controlled', image: 'images/image9.jpg', category: 'float' },
        { id: 9, name: 'Adjustable Frame (Offset)', code: '', price: '₹6', desc: '', image: 'images/image10.jpg', category: 'roller' },
        { id: 10, name: 'Putty Knife 8"', code: '', price: '₹28', desc: 'SIZE: 8"', image: 'images/image11.jpg', category: 'knife' },
        { id: 11, name: 'Putty Knife 6"', code: '', price: '₹25', desc: 'SIZE: 6"', image: 'images/image12.jpg', category: 'knife' },
        { id: 12, name: 'Standard Roller Frame 4"', code: '', price: '₹7', desc: 'Roller Frame Set', image: 'images/image13.jpg', category: 'roller' },
        { id: 13, name: 'Standard Roller Frame 2"', code: '', price: '₹6.75', desc: 'Roller Frame Set', image: 'images/image15.jpg', category: 'roller' }
    ];

    // ================= 3. RENDER PRODUCT GRID =================
    const productGrid = document.getElementById('productGrid');
    const noResults = document.getElementById('noResults');

    function renderProducts(list) {
        productGrid.innerHTML = '';
        if (list.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';
        list.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-id', product.id);
            card.innerHTML = `
                <div class="product-img-wrap">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="product-img"
                         loading="lazy" 
                         onerror="this.style.display='none'">
                </div>
                <h3>${product.name}</h3>
                ${product.code ? `<p class="product-code">${product.code}</p>` : ''}
                <p class="price">${product.price}</p>
                ${product.desc ? `<p class="desc">${product.desc}</p>` : ''}
                <a href="tel:9873123689" class="btn btn-enquire">Enquire Now</a>
            `;
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A') openModal(product);
            });
            productGrid.appendChild(card);
        });
    }
    renderProducts(products);

    // ================= 4. AUTO SLIDER =================
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentIndex = 0;
    let autoSlideInterval;
    const AUTO_DELAY = 3000;

    products.forEach(product => {
        const slideCard = document.createElement('div');
        slideCard.className = 'slider-card';
        slideCard.innerHTML = `
            <div class="product-img-wrap">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <h4>${product.name}</h4>
            <p class="slider-price">${product.price}</p>
        `;
        slideCard.addEventListener('click', () => openModal(product));
        sliderTrack.appendChild(slideCard);
    });

    function getCardsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 992) return 3;
        return 4;
    }

    function updateSliderPosition() {
        const cardsPerView = getCardsPerView();
        const maxIndex = products.length - cardsPerView;
        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;
        const cardWidth = sliderTrack.children[0].offsetWidth;
        const gap = 20;
        const moveAmount = currentIndex * (cardWidth + gap);
        sliderTrack.style.transform = `translateX(-${moveAmount}px)`;
        updateDots(maxIndex + 1);
    }

    function updateDots(total) {
        sliderDots.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === currentIndex ? ' active' : '');
            dot.addEventListener('click', () => { currentIndex = i; updateSliderPosition(); resetAutoSlide(); });
            sliderDots.appendChild(dot);
        }
    }

    function nextSlide() {
        const maxIndex = products.length - getCardsPerView();
        currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
        updateSliderPosition();
    }

    function prevSlide() {
        const maxIndex = products.length - getCardsPerView();
        currentIndex = (currentIndex <= 0) ? maxIndex : currentIndex - 1;
        updateSliderPosition();
    }

    function startAutoSlide() { clearInterval(autoSlideInterval); autoSlideInterval = setInterval(nextSlide, AUTO_DELAY); }
    function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

    if (sliderTrack.children.length > 0) {
        startAutoSlide();
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
        document.querySelector('.slider-wrapper').addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        document.querySelector('.slider-wrapper').addEventListener('mouseleave', startAutoSlide);
        window.addEventListener('resize', () => { updateSliderPosition(); updateDots(products.length - getCardsPerView() + 1); });
        updateSliderPosition();
    }

    // ================= 5. SEARCH & FILTER =================
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    function filterProducts() {
        const query = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        const filtered = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.code.toLowerCase().includes(query);
            const matchesCategory = (category === 'all') || (p.category === category);
            return matchesSearch && matchesCategory;
        });
        renderProducts(filtered);
    }
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);

    // ================= 6. PRODUCT DETAIL MODAL =================
    const modal = document.getElementById('productModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalCode = document.getElementById('modalCode');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const modalCall = document.getElementById('modalCall');
    const modalWhatsapp = document.getElementById('modalWhatsapp');

    function openModal(product) {
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalName.textContent = product.name;
        modalCode.textContent = product.code || '';
        modalCode.style.display = product.code ? 'inline-block' : 'none';
        modalPrice.textContent = product.price;
        modalDesc.textContent = product.desc || '';
        modalDesc.style.display = product.desc ? 'block' : 'none';

        const waMessage = encodeURIComponent(
            `Hello Z.A. Tools,\n\nI want to enquire about:\n*Product:* ${product.name}\n${product.code ? `*Code:* ${product.code}\n` : ''}*Price:* ${product.price}\n\nPlease share more details.`
        );
        modalWhatsapp.href = `https://wa.me/919873123689?text=${waMessage}`;
        modalCall.href = 'tel:9873123689';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ================= 7. MOBILE NAV, SMOOTH SCROLL, HEADER, BACK TO TOP =================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });

    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 50 ? '0 4px 15px rgba(0,0,0,0.12)' : '0 2px 10px rgba(0,0,0,0.05)';
        backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});
