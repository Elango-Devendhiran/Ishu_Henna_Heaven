/* ==========================================================================
   ISHU HENNA HEAVEN — MAIN SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. LOADING SCREEN
  ------------------------------------------------------------------ */
  var loader = document.getElementById('loading-screen');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (loader) loader.classList.add('loaded');
    }, 500);
  });
  // Fallback in case 'load' fires slowly on slow connections
  setTimeout(function () {
    if (loader) loader.classList.add('loaded');
  }, 3000);

  /* ------------------------------------------------------------------
     2. AOS INIT
  ------------------------------------------------------------------ */
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  /* ------------------------------------------------------------------
     3. STICKY / TRANSPARENT NAVBAR
  ------------------------------------------------------------------ */
  var navbar = document.querySelector('.navbar-luxury');
  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  // Collapse mobile menu after clicking a link
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      var collapseEl = document.querySelector('.navbar-collapse');
      if (collapseEl && collapseEl.classList.contains('show') && window.bootstrap) {
        var bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.hide();
      }
    });
  });

  /* ------------------------------------------------------------------
     4. BACK TO TOP
  ------------------------------------------------------------------ */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     5. TYPING EFFECT (hero tagline)
  ------------------------------------------------------------------ */
  var typeTarget = document.getElementById('typing-tagline');
  if (typeTarget) {
    var fullText = typeTarget.getAttribute('data-text') || '';
    var i = 0;
    var speed = 45;
    typeTarget.textContent = '';
    var cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    function typeChar() {
      if (i < fullText.length) {
        typeTarget.textContent = fullText.substring(0, i + 1);
        typeTarget.appendChild(cursorSpan);
        i++;
        setTimeout(typeChar, speed);
      }
    }
    setTimeout(typeChar, 900);
  }

  /* ------------------------------------------------------------------
     6. ANIMATED COUNTERS
  ------------------------------------------------------------------ */
  var counters = document.querySelectorAll('.stat-number[data-count]');
  if (counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = Math.floor(progress * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------------
     7. VINE DIVIDER DRAW-ON-SCROLL
  ------------------------------------------------------------------ */
  var vines = document.querySelectorAll('.vine-divider');
  if (vines.length) {
    var vineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.3 });
    vines.forEach(function (v) { vineObserver.observe(v); });
  }

  /* ------------------------------------------------------------------
     8. GALLERY FILTER + LOAD MORE
  ------------------------------------------------------------------ */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  var loadMoreBtn = document.getElementById('load-more-btn');
  var visibleCount = 9;
  var currentFilter = 'all';

  function refreshGalleryVisibility() {
    var shown = 0;
    galleryItems.forEach(function (item) {
      var cat = item.getAttribute('data-category');
      var matches = currentFilter === 'all' || cat === currentFilter;
      if (matches && shown < visibleCount) {
        item.hidden = false;
        shown++;
      } else {
        item.hidden = true;
      }
    });
    var totalMatching = Array.prototype.filter.call(galleryItems, function (item) {
      var cat = item.getAttribute('data-category');
      return currentFilter === 'all' || cat === currentFilter;
    }).length;
    if (loadMoreBtn) {
      loadMoreBtn.style.display = visibleCount >= totalMatching ? 'none' : 'inline-block';
    }
  }

  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        visibleCount = 9;
        refreshGalleryVisibility();
      });
    });
    refreshGalleryVisibility();
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      visibleCount += 6;
      refreshGalleryVisibility();
    });
  }

  /* ------------------------------------------------------------------
     9. LIGHTBOX GALLERY
  ------------------------------------------------------------------ */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImage = lightbox.querySelector('.lightbox-img');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var lbClose = lightbox.querySelector('.lightbox-close');
    var lbPrev = lightbox.querySelector('.lightbox-prev');
    var lbNext = lightbox.querySelector('.lightbox-next');
    var galleryList = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
    var currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      renderLightbox();
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function renderLightbox() {
      var item = galleryList[currentIndex];
      if (!item) return;
      var title = item.getAttribute('data-title') || 'Mehendi Design';
      var cat = item.getAttribute('data-category') || '';
      if (lbImage) lbImage.querySelector('.ph-label').textContent = item.querySelector('.img-placeholder .ph-label').textContent;
      if (lbCaption) lbCaption.textContent = title + ' — ' + cat.charAt(0).toUpperCase() + cat.slice(1);
    }
    function showNext() {
      currentIndex = (currentIndex + 1) % galleryList.length;
      renderLightbox();
    }
    function showPrev() {
      currentIndex = (currentIndex - 1 + galleryList.length) % galleryList.length;
      renderLightbox();
    }

    galleryList.forEach(function (item, idx) {
      item.addEventListener('click', function () { openLightbox(idx); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbNext) lbNext.addEventListener('click', showNext);
    if (lbPrev) lbPrev.addEventListener('click', showPrev);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }

  /* ------------------------------------------------------------------
     10. CONTACT FORM VALIDATION (client-side, no backend wired up)
  ------------------------------------------------------------------ */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }
      var statusBox = document.getElementById('form-status');
      if (statusBox) {
        statusBox.textContent = 'Thank you! Your enquiry has been received. Ishu will get back to you within 24 hours.';
        statusBox.classList.add('success');
      }
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  /* ------------------------------------------------------------------
     11. SMOOTH SCROLL FOR ON-PAGE ANCHORS
  ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 90;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------
     12. SET ACTIVE NAV LINK BASED ON CURRENT PAGE
  ------------------------------------------------------------------ */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-luxury .nav-link[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
