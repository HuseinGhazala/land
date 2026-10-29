/**
 * Golden Vacation (الإجازة الذهبية) Landing Page Scripts
 * Interactive features: Testimonial Carousel, Destination Modals, Form Validation, Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Testimonials Carousel
  const testimonials = [
    {
      quote: "مساحة مخصصة لعرض رأي عميل حقيقي عن تجربته مع الإجازة الذهبية. الخدمة كانت تفوق التوقعات والاهتمام بأدق التفاصيل من الاستقبال وحتى العودة صنع الفرق في إجازتنا.",
      author: "عبدالله الشمري",
      destination: "مسافر إلى النرويج",
      stars: 5
    },
    {
      quote: "تجربة موريشيوس كانت خيالية بكل المقاييس! المنتجعات المختارة بعناية والجداول اليومية المتوازنة خلت الرحلة مريحة وممتعة لجميع أفراد العائلة.",
      author: "سارة القحطاني",
      destination: "مسافرة إلى موريشيوس",
      stars: 5
    },
    {
      quote: "سافرت معهم إلى جورجيا وكانت الترتيبات ممتازة ومرنة جداً. المرشد السياحي كان متعاون والمواقع المقترحة كانت بعيدة عن الزحمة التجارية.",
      author: "فهد العتيبي",
      destination: "مسافر إلى جورجيا",
      stars: 5
    },
    {
      quote: "برنامج تايلاند جمع بين الطبيعة الخلابة والتسوق الراقي. احترافية فريق العمل في المتابعة طوال الرحلة تعطي شعور عالي بالأمان والراحة.",
      author: "نورة الدوسري",
      destination: "مسافرة إلى تايلاند",
      stars: 5
    }
  ];

  let currentTestimonialIndex = 0;
  const quoteTextEl = document.getElementById('testimonialQuote');
  const authorNameEl = document.getElementById('authorName');
  const authorDestEl = document.getElementById('authorDest');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  function renderTestimonial(index) {
    if (!quoteTextEl) return;
    quoteTextEl.style.opacity = '0';
    
    setTimeout(() => {
      const item = testimonials[index];
      quoteTextEl.textContent = item.quote;
      authorNameEl.textContent = item.author;
      authorDestEl.textContent = `— ${item.destination}`;
      quoteTextEl.style.opacity = '1';
    }, 150);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    });

    // Auto rotate every 7 seconds
    setInterval(() => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    }, 7000);
  }

  // 4. Destination Details Modal & Packages Data
  const destinationData = {
    korea: {
      tag: "01 / EAST ASIA",
      title: "كوريا الجنوبية | 7 ليالي",
      duration: "7 ليالي",
      price: "9,900 ريال سعودي",
      image: "assets/images/dest_korea_original.jpg",
      desc: "اكتشف سحر كوريا الجنوبية بين أجواء سيول العصرية وشواطئ بوسان الساحرة، مع إقامة في فنادق 4 و5 نجوم وتنقلات مريحة بين المدينتين.",
      includes: "يشمل العرض الإقامة والتنقلات من وإلى المطار والقطار بين المدينتين.",
      target: "شخصين",
      type: "مدن وطبيعة"
    },
    maldives: {
      tag: "02 / INDIAN OCEAN",
      title: "المالديف | 4 ليالي",
      duration: "4 ليالي",
      price: "14,620 ريال سعودي",
      image: "assets/images/dest_maldives_original.jpg",
      desc: "استمتع بأجواء رومانسية استثنائية في فيلا بمسبح خاص وسط مياه المالديف الفيروزية، مع إقامة فاخرة ووجبات الإفطار والعشاء وخدمة شخصية لراحة لا تُنسى.",
      includes: "يشمل العرض الإقامة، الإفطار والعشاء، والتنقلات بالقارب السريع ذهابًا وعودة.",
      target: "شخصين",
      type: "استرخاء ورومانسية"
    },
    london: {
      tag: "03 / EUROPE",
      title: "لندن | 4 ليالي",
      duration: "4 ليالي",
      price: "6,530 ريال سعودي",
      image: "assets/images/dest_london_original.jpg",
      desc: "عِش أجواء لندن الساحرة واستمتع باستكشاف أشهر معالمها، مع إقامة في فندق The Cumberland تشمل الإفطار، لتجربة تجمع بين الراحة والموقع المميز.",
      includes: "يشمل العرض الإقامة مع الإفطار والتنقلات من وإلى المطار.",
      target: "شخصين",
      type: "عراقة ومعالم"
    },
    norway: {
      tag: "04 / SCANDINAVIA",
      title: "النرويج | 7 ليالي",
      duration: "7 ليالي",
      price: "9,950 ريال سعودي",
      image: "assets/images/dest_norway_original.png",
      desc: "من أوسلو إلى ترومسو، عِش مغامرة استثنائية بين الطبيعة النرويجية الساحرة وفرصة مشاهدة الشفق القطبي، مع إقامة في فنادق 4 نجوم ورحلات طيران داخلية.",
      includes: "يشمل العرض الإقامة، والاستقبال والتوديع، والطيران الداخلي.",
      target: "شخصين",
      type: "طبيعة وشفق قطبي"
    },
    thailand: {
      tag: "05 / HONEYMOON",
      title: "تايلاند | شهر عسل - 8 ليالي",
      duration: "شهر عسل - 8 ليالي",
      price: "6,180 ريال سعودي",
      image: "assets/images/dest_thailand_original.png",
      desc: "ابدأوا رحلتكم الزوجية بين أجواء بانكوك النابضة بالحياة وسحر بوكيت الاستوائي، مع إقامة تشمل فيلا خاصة بمسبح، ولمسات رومانسية مميزة للاحتفال بشهر العسل.",
      includes: "يشمل العرض الإقامة مع الإفطار، وتزيين الغرفة واستقبال بالورود، والتنقلات والجولات، والطيران الداخلي، وشرائح اتصال وإنترنت مجانية.",
      target: "شخصين",
      type: "شهر عسل رومانسي"
    },
    georgia: {
      tag: "06 / CAUCASUS",
      title: "جورجيا | 7 ليالي",
      duration: "7 ليالي",
      price: "3,650 ريال سعودي",
      image: "assets/images/dest_georgia_original.png",
      desc: "اكتشفوا سحر جورجيا في رحلة تجمع بين أجواء تبليسي التاريخية، وطبيعة باكورياني الجبلية، وسحر باتومي الساحلي، مع إقامة في فنادق 4 نجوم وجولات خاصة لراحة أكبر.",
      includes: "يشمل العرض الإقامة مع الإفطار، والجولات والتنقلات بسيارة سيدان، وشريحة إنترنت مفتوح، وتأمين السفر والضرائب.",
      target: "شخصين",
      type: "جبال وسياحة ساحلية"
    },
    mauritius: {
      tag: "07 / INDIAN OCEAN",
      title: "موريشيوس | 5 ليالي",
      duration: "5 ليالي",
      price: "11,650 ريال سعودي",
      image: "assets/images/dest_mauritius_original.png",
      desc: "استمتعوا بأجواء استوائية ساحرة في موريشيوس، مع إقامة فاخرة في جناح بإطلالة على المحيط، وجولات خاصة لاكتشاف أجمل الشواطئ والطبيعة والمعالم السياحية في الجزيرة.",
      includes: "يشمل العرض الإقامة مع الإفطار، وجولتين سياحيتين بسيارة خاصة، والتنقلات من وإلى المطار.",
      target: "شخصين",
      type: "شواطئ فاخرة"
    }
  };

  // --------------------------------------------------------------------------
  // Traffic Source & Campaign Tracking (Google Ads {G2} vs. Snapchat Ads {S2})
  // WhatsApp Support Number: +966551433434
  // --------------------------------------------------------------------------
  const WHATSAPP_PHONE = '966551433434';

  function detectTrafficSource() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = (document.referrer || '').toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    // Check Snapchat indicators
    const isSnap =
      urlParams.get('source') === 'snapchat' ||
      urlParams.get('source') === 'snap' ||
      urlParams.get('utm_source') === 'snapchat' ||
      urlParams.get('utm_source') === 'snap' ||
      urlParams.get('src') === 'snap' ||
      urlParams.get('platform') === 'snapchat' ||
      urlParams.has('s2') ||
      urlParams.has('snap') ||
      urlParams.has('snapchat') ||
      urlParams.has('sccid') || // Snapchat Click ID
      search.includes('source=snap') ||
      search.includes('utm_source=snap') ||
      hash.includes('snap') ||
      referrer.includes('snapchat');

    // Check Google indicators
    const isGoogle =
      urlParams.get('source') === 'google' ||
      urlParams.get('utm_source') === 'google' ||
      urlParams.get('src') === 'google' ||
      urlParams.get('platform') === 'google' ||
      urlParams.has('g2') ||
      urlParams.has('google') ||
      urlParams.has('gclid') || // Google Ads Click ID
      search.includes('source=google') ||
      search.includes('utm_source=google') ||
      hash.includes('google') ||
      referrer.includes('google');

    if (isSnap) {
      sessionStorage.setItem('gv_ad_source', 'snapchat');
      return { platform: 'snapchat', tag: '{S2}', label: 'سناب شات' };
    }

    if (isGoogle) {
      sessionStorage.setItem('gv_ad_source', 'google');
      return { platform: 'google', tag: '{G2}', label: 'إعلانات جوجل' };
    }

    // Persisted session from earlier visit
    const stored = sessionStorage.getItem('gv_ad_source');
    if (stored === 'snapchat') {
      return { platform: 'snapchat', tag: '{S2}', label: 'سناب شات' };
    }
    if (stored === 'google') {
      return { platform: 'google', tag: '{G2}', label: 'إعلانات جوجل' };
    }

    // Default fallback to Google {G2}
    return { platform: 'google', tag: '{G2}', label: 'إعلانات جوجل' };
  }

  function updateAllWhatsAppLinks() {
    const traffic = detectTrafficSource();
    const tag = traffic.tag; // '{G2}' or '{S2}'

    // 1. Direct button in booking section
    const directBtn = document.getElementById('directWhatsappBtn');
    if (directBtn) {
      const msg = encodeURIComponent(`مرحباً، أرغب بالاستفسار عن برامج الإجازة الذهبية ${tag}`);
      directBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
    }

    // 2. Floating quick WhatsApp button
    const floatBtn = document.getElementById('floatingWhatsappBtn');
    if (floatBtn) {
      const msg = encodeURIComponent(`مرحباً، أود التواصل بخصوص عروض السفر في الإجازة الذهبية ${tag}`);
      floatBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
    }
  }

  // Run on page load
  updateAllWhatsAppLinks();

  // --------------------------------------------------------------------------
  // Destination Slider Controls (Arrow Navigation & Smooth Mouse Drag/Swipe)
  // --------------------------------------------------------------------------
  const destGrid = document.getElementById('destinationsGrid');
  const destPrevBtn = document.getElementById('destPrevBtn');
  const destNextBtn = document.getElementById('destNextBtn');
  const destinationCards = document.querySelectorAll('.destination-card');

  let hasMouseDragged = false;

  if (destGrid) {
    let isMouseDown = false;
    let startX = 0;
    let scrollStart = 0;

    // Arrow navigation
    if (destNextBtn) {
      destNextBtn.addEventListener('click', () => {
        destGrid.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }

    if (destPrevBtn) {
      destPrevBtn.addEventListener('click', () => {
        destGrid.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }

    // Mouse drag-to-swipe handling
    destGrid.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Only primary button
      isMouseDown = true;
      hasMouseDragged = false;
      startX = e.pageX;
      scrollStart = destGrid.scrollLeft;

      destGrid.classList.add('is-dragging');
      destGrid.style.scrollBehavior = 'auto';
      destGrid.style.scrollSnapType = 'none';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      const walk = (e.pageX - startX) * 1.35;

      if (Math.abs(e.pageX - startX) > 6) {
        hasMouseDragged = true;
      }

      destGrid.scrollLeft = scrollStart - walk;
    });

    const stopDragging = () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      destGrid.classList.remove('is-dragging');
      destGrid.style.scrollBehavior = 'smooth';
      destGrid.style.scrollSnapType = 'x mandatory';

      // Keep hasMouseDragged true briefly so card click handler ignores the drag gesture
      setTimeout(() => {
        hasMouseDragged = false;
      }, 100);
    };

    window.addEventListener('mouseup', stopDragging);
    destGrid.addEventListener('mouseleave', stopDragging);
  }

  // Modal Elements
  const modal = document.getElementById('destinationModal');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalDurationTag = document.getElementById('modalDurationTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalIncludes = document.getElementById('modalIncludes');
  const modalDuration = document.getElementById('modalDuration');
  const modalTarget = document.getElementById('modalTarget');
  const modalType = document.getElementById('modalType');
  const modalBookBtn = document.getElementById('modalBookBtn');
  const modalWhatsappLink = document.getElementById('modalWhatsappLink');

  destinationCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent opening modal when dragging
      if (hasMouseDragged) {
        e.preventDefault();
        return;
      }

      const destKey = card.getAttribute('data-destination');
      const data = destinationData[destKey];
      if (!data) return;

      if (modalImg) modalImg.src = data.image;
      if (modalTag) modalTag.textContent = data.tag;
      if (modalDurationTag) modalDurationTag.textContent = data.duration;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalPrice) modalPrice.textContent = data.price;
      if (modalDesc) modalDesc.textContent = data.desc;
      if (modalIncludes) modalIncludes.textContent = data.includes;
      if (modalDuration) modalDuration.textContent = data.duration;
      if (modalTarget) modalTarget.textContent = data.target || "شخصين";
      if (modalType) modalType.textContent = data.type;

      // Update WhatsApp link with package details & active source tag ({G2} or {S2})
      if (modalWhatsappLink) {
        const traffic = detectTrafficSource();
        const waMsg = encodeURIComponent(`مرحباً شركة الإجازة الذهبية، أرغب بالاستفسار والحجز في عرض: ${data.title} (${data.price}). ${traffic.tag}`);
        modalWhatsappLink.href = `https://wa.me/${WHATSAPP_PHONE}?text=${waMsg}`;
      }

      // Update booking link to pre-select this destination
      if (modalBookBtn) {
        modalBookBtn.onclick = () => {
          closeModal();
          const select = document.getElementById('destinationSelect');
          if (select) {
            select.value = destKey;
          }
          document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        };
      }

      openModal();
    });
  });

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Booking Form Submission & Validation (Google Sheets Integration)
  const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbygizANgSzIHdIP1MGdOXs6kY9m1SIlKu6-BHeDYR4zZQXpUKsozBwffrc7NvU_vnU7/exec';

  const bookingForm = document.getElementById('bookingForm');
  const toastNotice = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  function showToast(message, isError = false) {
    if (!toastNotice) return;
    toastText.textContent = message;
    if (isError) {
      toastNotice.style.borderColor = '#EF4444';
    } else {
      toastNotice.style.borderColor = 'var(--gold-primary)';
    }
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  if (bookingForm) {
    let isFormSubmitting = false;

    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const phoneError = document.getElementById('phoneError');
    const nameError = document.getElementById('nameError');
    const destSelect = document.getElementById('destinationSelect');
    const travelersSelect = document.getElementById('travelersSelect');
    const dateSelect = document.getElementById('travelDateSelect');
    const budgetSelect = document.getElementById('budgetSelect');
    const agreementCheckbox = document.getElementById('agreementCheckbox');

    // Phone Validation Helper
    function validatePhoneNumber(showError = false) {
      if (!phoneInput) return false;
      const raw = phoneInput.value.trim();

      if (!raw) {
        if (showError) {
          phoneInput.classList.add('is-invalid');
          phoneInput.classList.remove('is-valid');
          if (phoneError) {
            phoneError.style.display = 'flex';
            phoneError.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> رقم الجوال مطلوب للتواصل وتأكيد الحجز';
          }
        } else {
          phoneInput.classList.remove('is-invalid', 'is-valid');
          if (phoneError) {
            phoneError.style.display = 'none';
            phoneError.innerHTML = '';
          }
        }
        return false;
      }

      // Check for forbidden characters (anything other than digits, +, spaces, hyphens)
      if (/[^0-9+\s\-]/.test(raw)) {
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
        if (phoneError) {
          phoneError.style.display = 'flex';
          phoneError.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> يرجى إدخال أرقام فقط بدون أحرف أو رموز';
        }
        return false;
      }

      // Cleaned digits
      const cleaned = raw.replace(/[\s\-]/g, '');

      // Saudi local formats:
      // 05XXXXXXXX (10 digits)
      const isSaudi05 = /^05\d{8}$/.test(cleaned);
      // 5XXXXXXXX (9 digits starting with 5)
      const isSaudi5 = /^5\d{8}$/.test(cleaned);
      // Saudi intl: +9665XXXXXXXX, 009665XXXXXXXX, 9665XXXXXXXX (all total 8 digits after 5)
      const isSaudiIntl = /^(?:\+966|00966|966)5\d{8}$/.test(cleaned);
      // General international: e.g. + followed by 8 to 15 digits or standard intl
      const isGeneralIntl = /^\+?[1-9]\d{7,14}$/.test(cleaned);

      if (isSaudi05 || isSaudi5 || isSaudiIntl || isGeneralIntl) {
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
        if (phoneError) {
          phoneError.style.display = 'none';
          phoneError.innerHTML = '';
        }
        return true;
      }

      // If invalid, construct helpful message
      let errorMsg = 'يرجى إدخال رقم جوال صحيح (مثال: 05XXXXXXXX أو +9665XXXXXXXX)';
      if (cleaned.startsWith('05') && cleaned.length !== 10) {
        errorMsg = 'رقم الجوال السعودي يتكون من 10 أرقام ويبدأ بـ 05 (حالياً ' + cleaned.length + ' أرقام)';
      } else if (cleaned.startsWith('5') && cleaned.length !== 9) {
        errorMsg = 'رقم الجوال السعودي يبدأ بـ 05 ويتكون من 10 أرقام (أو 9 أرقام بدءاً بـ 5)';
      } else if ((cleaned.startsWith('+966') || cleaned.startsWith('00966') || cleaned.startsWith('966')) && !isSaudiIntl) {
        errorMsg = 'الرقم السعودي الدولي يجب أن يبدأ بـ +9665 متبوعاً بـ 8 أرقام';
      } else if (cleaned.length < 8) {
        errorMsg = 'رقم الجوال قصير جداً، يرجى كتابة الرقم كاملاً';
      }

      phoneInput.classList.add('is-invalid');
      phoneInput.classList.remove('is-valid');
      if (phoneError) {
        phoneError.style.display = 'flex';
        phoneError.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> ${errorMsg}`;
      }
      return false;
    }

    // Name Validation Helper
    function validateFullName(showError = false) {
      if (!nameInput) return false;
      const raw = nameInput.value.trim();
      if (!raw) {
        if (showError) {
          nameInput.classList.add('is-invalid');
          nameInput.classList.remove('is-valid');
          if (nameError) {
            nameError.style.display = 'flex';
            nameError.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> الاسم الكامل مطلوب للمتابعة';
          }
        } else {
          nameInput.classList.remove('is-invalid', 'is-valid');
          if (nameError) {
            nameError.style.display = 'none';
            nameError.innerHTML = '';
          }
        }
        return false;
      }
      if (raw.length < 2) {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        if (nameError) {
          nameError.style.display = 'flex';
          nameError.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> يرجى كتابة الاسم بشكل صحيح';
        }
        return false;
      }
      nameInput.classList.remove('is-invalid');
      nameInput.classList.add('is-valid');
      if (nameError) {
        nameError.style.display = 'none';
        nameError.innerHTML = '';
      }
      return true;
    }

    // Interactive Real-Time Validation
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        if (phoneInput.classList.contains('is-invalid')) {
          validatePhoneNumber(true);
        } else if (phoneInput.value.trim().length >= 9) {
          validatePhoneNumber(false);
        }
      });
      phoneInput.addEventListener('blur', () => {
        validatePhoneNumber(true);
      });
    }

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        if (nameInput.classList.contains('is-invalid')) {
          validateFullName(true);
        }
      });
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim().length > 0) {
          validateFullName(true);
        }
      });
    }

    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (isFormSubmitting) return;

      const isNameOk = validateFullName(true);
      const isPhoneOk = validatePhoneNumber(true);

      if (!isNameOk) {
        showToast('يرجى كتابة الاسم الكامل للمتابعة', true);
        nameInput.focus();
        return;
      }

      if (!isPhoneOk) {
        showToast('يرجى إدخال رقم جوال صحيح (حقل مطلوب)', true);
        phoneInput.focus();
        return;
      }

      const destination = destSelect.value;
      if (!destination) {
        showToast('يرجى اختيار الوجهة أو الباقة المفضلة', true);
        destSelect.focus();
        return;
      }

      const agreement = agreementCheckbox ? agreementCheckbox.checked : true;
      if (!agreement) {
        showToast('يرجى الموافقة على التواصل بخصوص الرحلة', true);
        return;
      }

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'جاري إرسال طلبك... ⏳';
      isFormSubmitting = true;

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const destinationText = destSelect.options[destSelect.selectedIndex]?.text || destination;
      const travelersText = travelersSelect.options[travelersSelect.selectedIndex]?.text || '';
      const travelDateText = dateSelect ? (dateSelect.options[dateSelect.selectedIndex]?.text || 'غير محدد') : 'غير محدد';
      const budgetText = budgetSelect ? (budgetSelect.options[budgetSelect.selectedIndex]?.text || 'غير محدد') : 'غير محدد';

      const traffic = detectTrafficSource();
      const payload = {
        fullName: name,
        phoneNumber: phone,
        destination: destinationText,
        travelers: travelersText,
        travelDate: travelDateText,
        budget: budgetText,
        campaignSource: traffic.platform === 'snapchat' ? 'سناب شات {S2}' : 'إعلانات جوجل {G2}',
        sourceTag: traffic.tag,
        submittedAt: new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' })
      };

      try {
        if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.startsWith('http')) {
          const formBody = new URLSearchParams();
          for (const key in payload) {
            formBody.append(key, payload[key]);
          }

          const fetchUrl = `${GOOGLE_SHEET_URL}?${formBody.toString()}`;
          await fetch(fetchUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody.toString()
          });
        }

        // Save local backup in browser storage
        try {
          const existing = JSON.parse(localStorage.getItem('gv_leads') || '[]');
          existing.push(payload);
          localStorage.setItem('gv_leads', JSON.stringify(existing));
        } catch (e) {}

        // Success Feedback
        showToast('تم استلام طلبك بنجاح! سيتواصل معك مستشارك السياحي قريباً.');
        bookingForm.reset();
        nameInput.classList.remove('is-valid', 'is-invalid');
        phoneInput.classList.remove('is-valid', 'is-invalid');
        if (nameError) nameError.style.display = 'none';
        if (phoneError) phoneError.style.display = 'none';

        submitBtn.innerHTML = 'تم الإرسال بنجاح ✓';
        submitBtn.style.backgroundColor = '#10B981';
        submitBtn.style.color = '#FFFFFF';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
        }, 4000);

      } catch (err) {
        console.error('Submission error:', err);
        showToast('حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى أو التواصل عبر واتساب', true);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      } finally {
        setTimeout(() => {
          isFormSubmitting = false;
        }, 3000);
      }
    });
  }

  // 6. Back to Top Button
  const backTopBtn = document.getElementById('backToTop');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
