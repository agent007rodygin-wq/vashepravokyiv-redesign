/* ==========================================================================
   Ваше Право — Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Slides logic
  const slides = [
    'assets/slides/Slide_01.jpg',
    'assets/slides/Slide_02.jpg',
    'assets/slides/Slide_03.jpg',
    'assets/slides/Slide_04.jpg',
    'assets/slides/Slide_05.jpg',
    'assets/slides/Slide_06.jpg',
    'assets/slides/Slide_07.jpg',
    'assets/slides/Slide_08.jpg',
    'assets/slides/Slide_09.jpg',
    'assets/slides/Slide_10.jpg',
    'assets/slides/Slide_11.jpg',
    'assets/slides/Slide_12.jpg'
  ];

  let currentSlideIndex = 0;
  const mainSlideImg = document.getElementById('main-slide-img');
  const slideCounter = document.getElementById('slide-counter');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  const thumbsContainer = document.getElementById('slide-thumbs');

  function renderThumbs() {
    if (!thumbsContainer) return;
    thumbsContainer.innerHTML = '';
    slides.forEach((src, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `slide-thumb ${idx === currentSlideIndex ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${src}" alt="Слайд ${idx + 1}" loading="lazy">`;
      thumb.addEventListener('click', () => setSlide(idx));
      thumbsContainer.appendChild(thumb);
    });
  }

  function setSlide(idx) {
    if (idx < 0) idx = slides.length - 1;
    if (idx >= slides.length) idx = 0;
    currentSlideIndex = idx;
    if (mainSlideImg) mainSlideImg.src = slides[currentSlideIndex];
    if (slideCounter) slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
    
    // Update active thumb
    const thumbs = document.querySelectorAll('.slide-thumb');
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === currentSlideIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => setSlide(currentSlideIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => setSlide(currentSlideIndex + 1));
  renderThumbs();

  // 2. Modals Logic
  const serviceDetails = {
    'med-practice': {
      title: 'Ліцензування медичної практики (МОЗ України)',
      subtitle: 'Повний супровід від аналізу приміщення та персоналу до наказу МОЗ',
      content: `
        <p><strong>До комплексу послуг входить:</strong></p>
        <ul>
          <li>Безкоштовна первинна консультація медичного адвоката щодо відповідності ліцензійним умовам.</li>
          <li>Комплексний правовий аудит документації на матеріально-технічну базу (приміщення, медобладнання, засоби вимірювальної техніки).</li>
          <li>Перевірка кваліфікаційних документів лікарів та молодших спеціалістів з медичною освітою.</li>
          <li>Складання відомостей суб’єкта господарювання та заяви встановленого зразка.</li>
          <li>Подача пакету документів до Міністерства охорони здоров'я України.</li>
          <li>Контроль розгляду на Ліцензійній комісії МОЗ до виходу наказу про видачу ліцензії.</li>
          <li>Оплата державного мита та отримання копій наказів про надання ліцензії.</li>
        </ul>
        <p style="margin-top: 16px;"><strong>Також здійснюємо внесення змін до чинної ліцензії:</strong> розширення переліку спеціальностей, відкриття нових філій/кабінетів, зміна персоналу або перепланування приміщення.</p>
      `
    },
    'narcotics': {
      title: 'Ліцензування обігу наркотичних засобів та прекурсорів',
      subtitle: 'Державна служба України з лікарських засобів та контролю за наркотиками',
      content: `
        <p><strong>Повний комплекс отримання ліцензії:</strong></p>
        <ul>
          <li>Аналіз установчих документів та матеріально-технічної бази для зберігання/використання підконтрольних речовин.</li>
          <li>Отримання дозволів Національної поліції на використання об'єктів та приміщень.</li>
          <li>Отримання довідок про відсутність судимості та психіатричних сертифікатів для персоналу.</li>
          <li>Підготовка пакету документів для Держлікслужби України.</li>
          <li>Подача та повний супровід розгляду справи аж до отримання позитивного рішення.</li>
          <li>Оформлення розширення видів діяльності (придбання, перевезення, знищення, ввезення/вивезення).</li>
        </ul>
      `
    },
    'legal-support': {
      title: 'Юридичний та кадровий супровід медичних закладів',
      subtitle: 'Розробка та перевірка 10 ключових блоків внутрішньої документації',
      content: `
        <p><strong>Пакет повної юридичної безпеки медзакладу:</strong></p>
        <ul>
          <li><strong>1. Установчі документи:</strong> статути, накази, положення про Медичний центр.</li>
          <li><strong>2. Ліцензійна документація:</strong> накази, відомості МТБ, метрологічні повірки.</li>
          <li><strong>3. Правила якості:</strong> зберігання ліків, внутрішній контроль якості медичної допомоги.</li>
          <li><strong>4. Пацієнтська документація:</strong> публічний договір, інформовані добровільні згоди, правила перебування.</li>
          <li><strong>5. Охорона праці та пожежна безпека:</strong> інструкції, навчання відповідальних осіб.</li>
          <li><strong>6. Кадровий супровід:</strong> трудові договори, посадові інструкції лікарів, штатні розписи, графіки відпусток.</li>
          <li><strong>7. Військовий облік:</strong> накази, картотеки, звірка з військкоматами, бронь фахівців.</li>
          <li><strong>8. Захист персональних даних:</strong> положення про захист баз даних, зобов’язання про нерозголошення.</li>
        </ul>
      `
    }
  };

  const modalOverlay = document.getElementById('service-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  window.openServiceModal = function(key) {
    const data = serviceDetails[key] || {
      title: 'Юридична консультація',
      subtitle: 'Компанія «Ваше Право»',
      content: '<p>Для отримання вичерпної інформації заповніть форму або зателефонуйте на нашу гарячу лінію 0 800 33 60 12.</p>'
    };
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalBody) modalBody.innerHTML = data.content;
    if (modalOverlay) modalOverlay.classList.add('open');
  };

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('open');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }

  // 3. Form Handling with Toast
  const leadForm = document.getElementById('consultation-form');
  const toast = document.getElementById('toast-notice');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = leadForm.querySelector('input[type="text"]').value;
      const phone = leadForm.querySelector('input[type="tel"]').value;
      
      if (!phone || phone.trim().length < 9) {
        alert('Будь ласка, вкажіть коректний контактний номер телефону.');
        return;
      }

      // Show toast
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }
      leadForm.reset();
    });
  }

  // 4. Quick consultation button trigger
  window.scrollToConsultation = function() {
    const el = document.getElementById('contacts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 5. Translucent Page-Sheet Flip Transition Logic
  const curtain = document.getElementById('sheet-curtain');
  let isTransitioning = false;

  function triggerSheetTransition(direction, callback) {
    if (!curtain || isTransitioning) {
      if (callback) callback();
      return;
    }
    isTransitioning = true;
    curtain.className = 'page-sheet-curtain';
    void curtain.offsetWidth; // Force reflow
    
    // direction: 'down' (scrolling down -> sheet sweeps from bottom to top)
    // direction: 'up' (scrolling up -> sheet sweeps from top to bottom)
    const animClass = direction === 'down' ? 'sweep-up' : 'sweep-down';
    curtain.classList.add(animClass);

    // Midpoint: execute callback (scroll or route)
    setTimeout(() => {
      if (callback) callback();
    }, 280);

    setTimeout(() => {
      curtain.className = 'page-sheet-curtain';
      isTransitioning = false;
    }, 750);
  }

  // Intercept all internal anchor navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const currentScroll = window.scrollY;
      const headerOffset = 70;
      const targetScroll = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      const direction = targetScroll >= currentScroll ? 'down' : 'up';

      triggerSheetTransition(direction, () => {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      });
    });
  });

  // Make trigger available globally (e.g. for buttons)
  window.triggerPageTransition = triggerSheetTransition;

  // 6. Section Sheet Reveal on Scroll (IntersectionObserver)
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    sec.classList.add('section-sheet-reveal');
  });

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('sheet-revealed');
      }
    });
  }, observerOptions);

  sections.forEach(sec => revealObserver.observe(sec));


  // 7. Metric Number Count-Up Roll Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.counter-animate');
    if (!counters.length) return;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // 1.8s duration
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic curve for smooth organic deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * target);

        counter.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target + suffix;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  // Observer to trigger counter animation when Hero / metrics grid enters view
  const metricsGrid = document.querySelector('.hero-metrics-grid');
  if (metricsGrid) {
    let animated = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          // Slight delay for organic feel after card entrance
          setTimeout(animateCounters, 200);
        }
      });
    }, { threshold: 0.2 });

    counterObserver.observe(metricsGrid);
  }

});