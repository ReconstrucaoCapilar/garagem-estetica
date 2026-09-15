(() => {
  const compare = document.querySelector('#resultados .ba-compare');
  const after = compare?.querySelector('.ba-after');
  const divider = compare?.querySelector('.ba-divider');
  const handle = compare?.querySelector('.ba-handle');

  if (!compare || !after || !divider || !handle) return;

  let dragging = false;

  const setPosition = (clientX) => {
    const rect = compare.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    divider.style.left = `${pct}%`;
    handle.style.left = `${pct}%`;
  };

  const begin = () => {
    dragging = true;
    compare.classList.add('is-active');
  };

  const finish = () => {
    dragging = false;
  };

  compare.addEventListener('pointerdown', (event) => {
    begin();
    compare.setPointerCapture?.(event.pointerId);
    setPosition(event.clientX);
  });

  compare.addEventListener('pointermove', (event) => {
    if (dragging) setPosition(event.clientX);
  });

  compare.addEventListener('pointerup', finish);
  compare.addEventListener('pointercancel', finish);
  compare.addEventListener('pointerleave', () => {
    if (dragging) finish();
  });

  compare.addEventListener('keydown', (event) => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();

    const current = parseFloat(divider.style.left || '50');
    let next = current;

    if (event.key === 'ArrowLeft') next = current - 5;
    if (event.key === 'ArrowRight') next = current + 5;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = 100;

    const rect = compare.getBoundingClientRect();
    setPosition(rect.left + rect.width * (next / 100));
    compare.classList.add('is-active');
  });

  // Mostra a dica no primeiro contato e deixa o usuário perceber a interação.
  setTimeout(() => compare.classList.add('is-active'), 6500);
})();
