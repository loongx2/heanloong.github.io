(function(){
  const root = document.documentElement;
  const key = 'hl-theme';
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const saved = localStorage.getItem(key);
  if(saved === 'light' || (!saved && prefersLight)) root.classList.add('light');

  function setTheme(mode){
    if(mode === 'light') root.classList.add('light');
    else root.classList.remove('light');
    localStorage.setItem(key, mode);
  }

  const btn = document.getElementById('theme-toggle');
  btn && btn.addEventListener('click', ()=>{
    const isLight = root.classList.toggle('light');
    localStorage.setItem(key, isLight ? 'light' : 'dark');
  });

  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Smooth-scroll for same-page anchors
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({ behavior:'smooth', block:'start' });
      history.pushState(null, '', `#${id}`);
    }
  });
})();
