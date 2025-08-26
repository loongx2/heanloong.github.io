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

  // Avatar: attempt common filenames and paths, fallback to placeholder
  (function(){
    const img = document.querySelector('img.avatar-img');
    if(!img) return;
    const candidates = [
      'assets/img/heanloong.jpg',
      'assets/img/HeanLoong01.png',
      'assets/img/photo.jpeg',
      'assets/img/photo.jpg',
      'assets/img/photo.png',
      'assets/img/photo.webp',
      'assets/photo.jpeg',
      'assets/photo.jpg',
      'photo.jpeg',
      'photo.jpg'
    ];
    const placeholder = 'assets/img/profile-placeholder.svg';
    const testNext = (i)=>{
      if(i >= candidates.length){ img.src = placeholder; return; }
      const url = candidates[i];
      const probe = new Image();
      probe.onload = ()=>{ img.src = url; };
      probe.onerror = ()=>{ testNext(i+1); };
      probe.src = url;
    };
    // Start probing only if current src is missing (404) or is already placeholder
    const start = ()=>{
      if(img.complete && img.naturalWidth > 0 && img.src.indexOf(placeholder) === -1){
        return; // already loaded a real image
      }
      testNext(0);
    };
    // In case onerror fired earlier, schedule after load
    if(document.readyState === 'complete') start();
    else window.addEventListener('load', start);
  })();

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
