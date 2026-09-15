(() => {
  "use strict";

  function initComparison(config) {
    const wrap = document.getElementById(config.wrap);
    const after = document.getElementById(config.after);
    const handle = document.getElementById(config.handle);

    if (!wrap || !after || !handle) return;

    let dragging = false;

    function setPosition(clientX) {
      const rect = wrap.getBoundingClientRect();

      let pct = ((clientX - rect.left) / rect.width) * 100;

      pct = Math.max(2, Math.min(98, pct));

      after.style.clipPath =
        "inset(0 " + (100 - pct) + "% 0 0)";

      handle.style.left = pct + "%";
    }

    function start(clientX) {
      dragging = true;
      wrap.style.cursor = "ew-resize";
      setPosition(clientX);
    }

    function move(clientX) {
      if (!dragging) return;
      setPosition(clientX);
    }

    function end() {
      dragging = false;
    }

    wrap.addEventListener("mousedown", function(event) {
      start(event.clientX);
    });

    window.addEventListener("mousemove", function(event) {
      move(event.clientX);
    });

    window.addEventListener("mouseup", end);

    wrap.addEventListener(
      "touchstart",
      function(event) {
        if (!event.touches.length) return;
        start(event.touches[0].clientX);
      },
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      function(event) {
        if (!dragging || !event.touches.length) return;
        move(event.touches[0].clientX);
      },
      { passive: true }
    );

    window.addEventListener("touchend", end);

    wrap.addEventListener("click", function(event) {
      setPosition(event.clientX);
    });
  }

  /*
   * Todos os comparadores do site usam exatamente
   * a mesma funcao.
   */

  initComparison({
    wrap: "baWrap",
    after: "baAfterImg",
    handle: "baHandle"
  });

  initComparison({
    wrap: "baWrapDakota",
    after: "baAfterDakota",
    handle: "baHandleDakota"
  });

})();