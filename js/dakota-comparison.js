(() => {
  // Mesma lógica de arraste usada no comparativo da SW4.
  var baWrap = document.getElementById("baWrapDakota");
  var baAfter = document.getElementById("baAfterDakota");
  var baHandle = document.getElementById("baHandleDakota");
  if (!baWrap || !baAfter || !baHandle) return;
  var dragging = false;

  function setBaPosition(clientX){
    var rect = baWrap.getBoundingClientRect();
    var pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    baAfter.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
    baHandle.style.left = pct + "%";
  }

  function startDrag(){
    dragging = true;
    baWrap.style.cursor = "ew-resize";
  }
  function endDrag(){ dragging = false; }
  function moveDrag(e){
    if(!dragging) return;
    var x = e.touches ? e.touches[0].clientX : e.clientX;
    setBaPosition(x);
  }

  baWrap.addEventListener("mousedown", function(e){ startDrag(); setBaPosition(e.clientX); });
  window.addEventListener("mouseup", endDrag);
  window.addEventListener("mousemove", moveDrag);

  baWrap.addEventListener("touchstart", function(e){ startDrag(); setBaPosition(e.touches[0].clientX); }, {passive:true});
  window.addEventListener("touchend", endDrag);
  window.addEventListener("touchmove", moveDrag, {passive:true});

  baWrap.addEventListener("click", function(e){ setBaPosition(e.clientX); });
})();
