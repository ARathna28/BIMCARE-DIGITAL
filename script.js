document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1. ELEMENT REFERENCES (SAFE)
  ===================================================== */

  const navbar     = document.querySelector(".navbar");
  const hero       = document.getElementById("home");
  const hamburger  = document.querySelector(".hamburger");
  const navLinks   = document.querySelector(".nav-links");
  const navItems   = document.querySelectorAll(".nav-links a");
  const sections   = document.querySelectorAll("section[id]");
  const auraCards  = document.querySelectorAll(".service-card, .client-box");
  const mailForm   = document.getElementById("mailtoForm");


  /* =====================================================
     2. HAMBURGER ACCESSIBILITY
  ===================================================== */

  if (hamburger) {
    hamburger.setAttribute("role", "button");
    hamburger.setAttribute("tabindex", "0");
    hamburger.setAttribute("aria-expanded", "false");

    hamburger.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        hamburger.click();
      }
    });
  }


  /* =====================================================
     3. MOBILE NAV TOGGLE
  ===================================================== */

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen);
    });
  }


  /* =====================================================
     4. NAVBAR SCROLL STATE
  ===================================================== */

  const updateNavbarState = () => {
    if (!navbar) return;

    if (!hero) {
      navbar.classList.add("navbar-scrolled");
      return;
    }

    navbar.classList.toggle(
      "navbar-scrolled",
      window.scrollY >= hero.offsetHeight / 2
    );
  };


  /* =====================================================
     5. SCROLLSPY (ACTIVE NAV LINK)
  ===================================================== */

  const updateScrollSpy = () => {
    let activeSection = "";

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 160) {
        activeSection = section.id;
      }
    });

    navItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${activeSection}`
      );
    });
  };


  /* =====================================================
     6. SCROLL PERFORMANCE (RAF THROTTLING)
  ===================================================== */

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNavbarState();
        updateScrollSpy();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateNavbarState();


  /* =====================================================
     7. SMOOTH SCROLL (CENTER TARGET)
  ===================================================== */

  document.querySelectorAll('.nav-scroll').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      navLinks?.classList.remove("active");
      hamburger?.setAttribute("aria-expanded", "false");

      const navbarHeight = navbar?.offsetHeight || 0;
      const targetRect = target.getBoundingClientRect();
      const targetCenter =
        targetRect.top + window.pageYOffset + targetRect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      window.scrollTo({
        top: targetCenter - viewportCenter - navbarHeight / 2,
        behavior: "smooth"
      });
    });
  });


  /* =====================================================
     8. SECTION SCROLL ANIMATIONS
  ===================================================== */

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
        entry.target.classList.toggle(
          "is-exiting",
          !entry.isIntersecting && entry.boundingClientRect.top < 0
        );
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    });

    sections.forEach(section => sectionObserver.observe(section));
  }


  /* =====================================================
     9. AURA MOUSE EFFECT
  ===================================================== */

  auraCards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty(
        "--mouse-x",
        `${((e.clientX - rect.left) / rect.width) * 100}%`
      );
      card.style.setProperty(
        "--mouse-y",
        `${((e.clientY - rect.top) / rect.height) * 100}%`
      );
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--mouse-x", "50%");
      card.style.setProperty("--mouse-y", "50%");
    });
  });


  /* =====================================================
     10. ESC KEY HANDLING
  ===================================================== */

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {

      if (navLinks?.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger?.setAttribute("aria-expanded", "false");
        hamburger?.focus();
      }

    }
  });


  /* =====================================================
     11. CONTACT FORM (GMAIL COMPOSE)
  ===================================================== */

  if (mailForm) {
    mailForm.addEventListener("submit", e => {
      e.preventDefault();

      const name    = document.getElementById("name")?.value.trim();
      const email   = document.getElementById("email")?.value.trim();
      const subject = document.getElementById("subject")?.value || "Website Enquiry";
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) return;

      const body = `${name}
${email}

${message}`;

      const gmailURL =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=hariraj.bct@gmail.com" +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.open(gmailURL, "_blank");
    });
  }

});
