(function(){
  "use strict";

  // -------- WhatsApp appointment modal --------
  var WA_NUMBER = "5527996973201";
  var waModal = document.getElementById("waModal");
  var waForm = document.getElementById("waForm");
  var waClose = document.getElementById("waModalClose");
  var otherWrap = document.getElementById("otherWrap");
  var otherVehicle = document.getElementById("otherVehicle");
  var waError = document.getElementById("waError");

  function openWaModal(e){
    if(e) e.preventDefault();
    waModal.classList.add("is-open");
    waModal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    setTimeout(function(){ document.getElementById("waName").focus(); }, 180);
  }
  function closeWaModal(){
    waModal.classList.remove("is-open");
    waModal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".wa-link, #navCta, #mobileCta").forEach(function(el){
    el.setAttribute("href","#");
    el.removeAttribute("target");
    el.removeAttribute("rel");
    el.addEventListener("click", openWaModal);
  });
  document.querySelectorAll('input[name="vehicle"]').forEach(function(radio){
    radio.addEventListener("change", function(){
      var isOther = this.value === "Outro";
      otherWrap.classList.toggle("is-visible", isOther);
      otherVehicle.required = isOther;
      if(!isOther) otherVehicle.value = "";
      waError.textContent = "";
    });
  });
  waClose.addEventListener("click", closeWaModal);
  waModal.addEventListener("click", function(e){ if(e.target === waModal) closeWaModal(); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape" && waModal.classList.contains("is-open")) closeWaModal(); });
  waForm.addEventListener("submit", function(e){
    e.preventDefault();
    waError.textContent = "";
    var name = document.getElementById("waName").value.trim();
    var selected = document.querySelector('input[name="vehicle"]:checked');
    if(!name || !selected){ waError.textContent = "Preencha seu nome e escolha o tipo de veículo."; return; }
    var vehicle = selected.value;
    if(vehicle === "Outro") {
      var detail = otherVehicle.value.trim();
      if(!detail){ waError.textContent = "Informe qual é o outro tipo de veículo."; otherVehicle.focus(); return; }
      vehicle = "Outro veículo: " + detail;
    }
    var message = "Olá! Meu nome é " + name + ". Gostaria de agendar um atendimento na Garagem Estética Automotiva para meu veículo: " + vehicle + ".";
    var waUrl = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(waUrl,"_blank","noopener");
    closeWaModal();
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // -------- Nav scroll state --------
  var nav = document.getElementById("siteNav");
  function onScrollNav(){
    if(window.scrollY > 40){ nav.classList.add("scrolled"); }
    else { nav.classList.remove("scrolled"); }
  }
  window.addEventListener("scroll", onScrollNav, {passive:true});
  onScrollNav();

  // -------- Mobile menu --------
  var toggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", function(){
    toggle.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      toggle.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    var isMobile = window.innerWidth < 860;

    if(!reduceMotion){
      // ---------- HERO PARALLAX TIMELINE ----------
      var heroTl = gsap.timeline({
        scrollTrigger:{
          trigger:".hero-pin",
          start:"top top",
          end:"bottom bottom",
          scrub:0.6
        }
      });

      heroTl
        .to("#layer-bg video", {yPercent: isMobile ? 8 : 14, scale:1.27, ease:"none"}, 0)
        .to("#layer-glow", {yPercent: isMobile ? 12 : 22, ease:"none"}, 0)
        .to("#layer-reflect", {yPercent: isMobile ? -20 : -40, xPercent: 6, ease:"none"}, 0)
        .to("#layer-content", {yPercent: -18, opacity:0, ease:"none"}, 0.05)
        .to(".hero-scroll-cue", {opacity:0, ease:"none"}, 0);

      // ---------- SERVICE CARDS STAGGER ----------
      gsap.to("[data-card]", {
        opacity:1, y:0, duration:0.8, ease:"power3.out", stagger:0.12,
        scrollTrigger:{ trigger:".services-grid", start:"top 82%" }
      });

      // ---------- GENERIC REVEALS ----------
      gsap.utils.toArray(".reveal").forEach(function(el){
        gsap.to(el, {
          opacity:1, y:0, duration:0.9, ease:"power3.out",
          scrollTrigger:{ trigger:el, start:"top 88%" }
        });
      });

      // ---------- DIFERENCIAL ITEMS ----------
      gsap.to("[data-diff]", {
        opacity:1, y:0, duration:0.8, ease:"power3.out", stagger:0.15,
        scrollTrigger:{ trigger:".diff-list", start:"top 85%" }
      });

      // ---------- DIFERENCIAL BG PARALLAX ----------
      gsap.to(".diff-bg img", {
        yPercent:14, ease:"none",
        scrollTrigger:{ trigger:".diff-section", start:"top bottom", end:"bottom top", scrub:true }
      });

      // ---------- CTA PARALLAX ----------
      gsap.to("#ctaBg img", {
        yPercent:-10, ease:"none",
        scrollTrigger:{ trigger:".cta-final", start:"top bottom", end:"bottom top", scrub:true }
      });

      // ---------- HORIZONTAL GALLERY (desktop only — mobile scrolls natively) ----------
      if(!isMobile){
        document.querySelectorAll(".gallery-pin").forEach(function(pin){
          var track = pin.querySelector(".gallery-track");
          if(!track) return;
          function getScrollDistance(){
            return Math.max(track.scrollWidth - window.innerWidth + 90, 0);
          }
          gsap.to(track, {
            x: function(){ return -getScrollDistance(); },
            ease:"none",
            scrollTrigger:{
              trigger: pin,
              start:"top top",
              end:"bottom bottom",
              scrub:0.6,
              invalidateOnRefresh:true
            }
          });
        });
      }

    } else {
      // Reduced motion: simple fade-ins, no transforms
      gsap.set(["[data-card]","[data-diff]",".reveal"], {opacity:1, y:0});
    }
  } else {
    // GSAP failed to load: ensure content is still visible
    document.querySelectorAll("[data-card],[data-diff],.reveal").forEach(function(el){
      el.style.opacity = 1; el.style.transform = "none";
    });
  }

  // -------- SUBTLE TILT ON SERVICE CARDS (signature micro-interaction) --------
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if(canHover && !reduceMotion){
    document.querySelectorAll(".service-card").forEach(function(card){
      var rX = 0, rY = 0;
      function onMove(e){
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        rY = px * 8;
        rX = py * -8;
        card.style.transform = "translateY(0) perspective(700px) rotateX(" + rX + "deg) rotateY(" + rY + "deg)";
      }
      function onLeave(){
        card.style.transform = "translateY(0) perspective(700px) rotateX(0deg) rotateY(0deg)";
      }
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
  }

  // -------- BEFORE / AFTER SLIDER --------
  var baWrap = document.getElementById("baWrap");
  var baAfter = document.getElementById("baAfterImg");
  var baHandle = document.getElementById("baHandle");
  var dragging = false;

  function setBaPosition(clientX){
    var rect = baWrap.getBoundingClientRect();
    var pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    baAfter.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
    baHandle.style.left = pct + "%";
  }

  function startDrag(e){
    dragging = true;
    baWrap.style.cursor = "ew-resize";
  }
  function endDrag(){ dragging = false; }
  function moveDrag(e){
    if(!dragging) return;
    var x = e.touches ? e.touches[0].clientX : e.clientX;
    setBaPosition(x);
  }

  baWrap.addEventListener("mousedown", function(e){ startDrag(e); setBaPosition(e.clientX); });
  window.addEventListener("mouseup", endDrag);
  window.addEventListener("mousemove", moveDrag);

  baWrap.addEventListener("touchstart", function(e){ startDrag(e); setBaPosition(e.touches[0].clientX); }, {passive:true});
  window.addEventListener("touchend", endDrag);
  window.addEventListener("touchmove", moveDrag, {passive:true});

  baWrap.addEventListener("click", function(e){ setBaPosition(e.clientX); });

})();
