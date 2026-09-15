(function(){
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightboxImg");
    var closeBtn = document.getElementById("lightboxClose");

    function openLightbox(img){
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox(){
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lightboxImg.src = "";
    }

    document.querySelectorAll(".gallery-item img").forEach(function(img){
      img.addEventListener("click", function(){ openLightbox(img); });
    });

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function(e){
      if(e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") closeLightbox();
    });
  })();
