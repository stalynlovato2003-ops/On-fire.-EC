// Shared interactions for ON FIRE STUDIO
document.addEventListener('DOMContentLoaded', () => {
  // Portfolio filters
  document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', (e)=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      card.style.display = (filter==='all' || card.dataset.type===filter) ? '' : 'none';
    })
  }))

  // Hero play opens native video modal (simple)
  const heroPlay = document.getElementById('heroPlay');
  if(heroPlay) heroPlay.addEventListener('click', ()=>{alert('Play video overlay (simulado)')});

  // Timeline: highlight when in viewport
  const steps = document.querySelectorAll('.process-step');
  if(steps.length){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          steps.forEach(s=>{ const n = s.querySelector('.timeline-num'); if(n) n.classList.remove('active') });
          const num = entry.target.querySelector('.timeline-num'); if(num) num.classList.add('active');
        }
      })
    }, {threshold:0.6});
    steps.forEach(s=>obs.observe(s));
  }

  // Simple testimonials rotation (auto)
  const t = document.getElementById('testimonials');
  if(t){
    let idx=0; const items = [...t.children];
    setInterval(()=>{ items.forEach((it,i)=>it.style.display = (i===idx)?'block':'none'; idx = (idx+1)%items.length }, 6000);
  }

  // Video player controls (if present)
  const player = document.getElementById('player');
  const playBtn = document.getElementById('playBtn');
  const seek = document.getElementById('seek');
  const fsBtn = document.getElementById('fsBtn');
  if(player){
    if(playBtn) playBtn.addEventListener('click', ()=>{ if(player.paused){player.play();} else {player.pause()} });
    player.addEventListener('timeupdate', ()=>{ if(player.duration) seek.value = (player.currentTime/player.duration)*100 });
    if(seek) seek.addEventListener('input', ()=>{ if(player.duration) player.currentTime = (seek.value/100)*player.duration });
    if(fsBtn) fsBtn.addEventListener('click', ()=>{ if(document.fullscreenElement) document.exitFullscreen(); else document.getElementById('mainVideo').requestFullscreen(); });
  }

  // Theater thumbnails
  document.querySelectorAll('.thumb').forEach(tn=>tn.addEventListener('click', ()=>{
    const src = tn.dataset.src; const main = document.getElementById('theaterMain');
    if(main) main.innerHTML = '<video src="'+src+'" controls class="w-full h-64 object-cover" autoplay></video>';
  }))

  // Audio player generator (wave bars)
  document.querySelectorAll('[data-wave]').forEach(container=>{
    for(let i=0;i<24;i++){ const bar = document.createElement('div'); bar.className='wave-bar transition-smooth'; bar.style.height = (8 + Math.random()*40)+'px'; container.appendChild(bar); }
  })

  // Simple play for tracks
  document.querySelectorAll('.play-track').forEach(btn => {
    const audio = new Audio(btn.dataset.src || btn.getAttribute('data-src'));
    btn.addEventListener('click', ()=>{
      if(audio.paused) { audio.play(); btn.classList.add('playing') } else { audio.pause(); btn.classList.remove('playing') }
    });
  });

  // Contact form basic submit
  const form = document.getElementById('contactForm'); if(form) form.addEventListener('submit', e=>{ e.preventDefault(); alert('Gracias — formulario simulado.'); form.reset(); });
});
