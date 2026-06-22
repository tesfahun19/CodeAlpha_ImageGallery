/* ==========================================================================
   1. DATA LAYER (MOCK DATA SOURCE)
   ========================================================================== */
/**
 * Static image repository populating the dynamic portfolio gallery grid.
 * Contains individual image structural data metadata including access-critical alt text.
 */
const imagesData = [
    { id: 1, src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80", category: "nature", alt: "Valley Mountain View" },
    { id: 2, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80", category: "nature", alt: "Green Landscape Field" },
    { id: 3, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80", category: "nature", alt: "Beautiful Autumn Forest Journey" },
    { id: 4, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80", category: "nature", alt: "Sunlight Piercing Trees" },
    { id: 5, src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80", category: "architecture", alt: "Skyscraper Glass Building" },
    { id: 6, src: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=600&q=80", category: "architecture", alt: "Suspension Bridge" },
    { id: 7, src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80", category: "architecture", alt: "Beautiful Paris Architecture" },
    { id: 8, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", category: "architecture", alt: "Modern Luxury Villa Design" },
    { id: 9, src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80", category: "animals", alt: "Majestic Lion" },
    { id: 10, src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80", category: "animals", alt: "Sleeping Fox" },
    { id: 11, src: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=600&q=80", category: "animals", alt: "Wild Deer in Woods" },
    { id: 12, src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80", category: "animals", alt: "African Giant Elephant" }
];

/* ==========================================================================
   2. UI / DOM CACHING LAYER
   ========================================================================== */
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

/* ==========================================================================
   3. APPLICATION STATE MANAGEMENT
   ========================================================================== */
let currentFilteredImages = [...imagesData]; // Active runtime dataset subset
let currentIndex = 0;                        // Pointer index tracking active modal node
let triggerElement = null;                   // Ref pointer caching focus anchor prior to modal opening

/* ==========================================================================
   4. ALGORITHM 1: DYNAMIC RENDERING ENGINE
   ========================================================================== */
/**
 * Renders data object sets into UI structural fragments inside the layout container grid.
 * Explicitly provisions native accessibility semantics for interactable elements.
 * @param {Array} imagesToRender 
 */
function displayImages(imagesToRender) {
    galleryGrid.innerHTML = ""; 
    
    imagesToRender.forEach((image, index) => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('gallery-item');
        
        // Accessibility Injection: Establish pseudo-button semantics for custom interactive layout blocks
        itemCard.setAttribute('role', 'button');
        itemCard.setAttribute('tabindex', '0');
        itemCard.setAttribute('aria-label', `Open ${image.alt}`);
        
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.loading = "lazy"; // Standard native performance optimization for paint-delaying assets
        
        // Input Event Registration: Mouse invocation channel
        itemCard.addEventListener('click', () => openLightbox(index));
        
        // Input Event Registration: Keyboard accessibility entry triggers (WCAG standard mapping)
        itemCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Intercept default page down scrolling triggers on space keys
                openLightbox(index);
            }
        });
        
        itemCard.appendChild(imgElement);
        galleryGrid.appendChild(itemCard);
    });
}

/* ==========================================================================
   5. ALGORITHM 2: FILTER & CATEGORIZATION CONTROL LOGIC
   ========================================================================== */
filterBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        // UI Layer Sync: Update traditional active CSS highlight hooks
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        
        // Accessibility State Sync: Explicitly notify assistive readers of mutation state changes
        document.querySelector('.filter-btn[aria-pressed="true"]')?.setAttribute('aria-pressed', 'false');
        e.target.setAttribute('aria-pressed', 'true');
        
        const selectedCategory = e.target.getAttribute('data-category');
        
        // Data Extraction Filtering Logic
        if (selectedCategory === 'all') {
            currentFilteredImages = [...imagesData];
        } else {
            currentFilteredImages = imagesData.filter(img => img.category === selectedCategory);
        }
        
        displayImages(currentFilteredImages);
    });
});

/* ==========================================================================
   6. CORE ACCESSIBILITY CORE UTIL: DIALOG FOCUS TRAPPING UTILITY
   ========================================================================== */
/**
 * Keeps keyboard tabulation strictly captured within the dialog boundary scope.
 * Defends users against unintended backdrop interactive breakouts during modal cycles.
 * @param {KeyboardEvent} e 
 */
function trapFocus(e) {
    const focusableEls = lightboxModal.querySelectorAll('button, [tabindex="0"]');
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey) { // Backwards Tabulation Flow (Shift + Tab)
            if (document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            }
        } else { // Forward Tabulation Flow (Tab)
            if (document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    }
}

/* ==========================================================================
   7. ALGORITHM 3: LIGHTBOX SUBSYSTEM PIPELINE
   ========================================================================== */
/**
 * Opens the lightbox view, updates contents, and mounts structural keyboard constraints.
 * @param {number} index 
 */
function openLightbox(index) {
    triggerElement = document.activeElement; // Track structural call site node to restore on teardown
    currentIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('show');
    
    // Mount focus security constraints to the context overlay container
    lightboxModal.addEventListener('keydown', trapFocus);
    
    // Dispatch focus transfer with explicit execution frame cushion
    setTimeout(() => {
        closeBtn.focus();
    }, 50);
}

/**
 * Updates individual text strings, asset links, labels, and tracking pagination parameters.
 */
function updateLightboxContent() {
    const currentImgData = currentFilteredImages[currentIndex];
    if (currentImgData) {
        lightboxImg.src = currentImgData.src;
        lightboxImg.alt = currentImgData.alt;
        lightboxCounter.textContent = `Image ${currentIndex + 1} of ${currentFilteredImages.length}`;
        lightboxCaption.textContent = currentImgData.alt;
    }
}

/**
 * Tears down lightbox contextual status wrappers and cleanly re-establishes historical focus profiles.
 */
function closeLightbox() {
    lightboxModal.classList.remove('show');
    
    // Purge background event listeners to avoid performance leaks
    lightboxModal.removeEventListener('keydown', trapFocus);
    
    // Return keyboard view status cleanly to the original initiator node
    if (triggerElement) {
        triggerElement.focus();
    }
}

/* ==========================================================================
   8. INTERACTION SURFACE BOUNDING EVENT LISTENERS
   ========================================================================== */
closeBtn.addEventListener('click', closeLightbox);

lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
});

nextBtn.addEventListener('click', () => {
    if (currentFilteredImages.length > 0) {
        currentIndex = (currentIndex + 1) % currentFilteredImages.length;
        updateLightboxContent();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentFilteredImages.length > 0) {
        currentIndex = (currentIndex - 1 + currentFilteredImages.length) % currentFilteredImages.length;
        updateLightboxContent();
    }
});

// Structural Keyboard Shortcuts Layer (Esc, ArrowRight, ArrowLeft)
document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('show')) return;

    if (e.key === 'Escape' || e.key === 'Esc') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
    }
});

/* ==========================================================================
   9. APPLICATION INITIALIZATION ENGINE
   ========================================================================== */
// Execution directly triggers here as script block parsing resides sequentially beneath static DOM nodes.
displayImages(imagesData);