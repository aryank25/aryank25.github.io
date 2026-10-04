const root=document.documentElement;
const themeButtons=[document.getElementById('themeBtn'),document.getElementById('sideTheme')].filter(Boolean);
const colorBtn=document.getElementById('colorBtn');
const palettes=[...document.querySelectorAll('.palette-swatch')];
const paletteNames=['moon','ocean','forest','rose','amber','indigo'];
const savedTheme=localStorage.getItem('aryan-theme');
const savedPalette=localStorage.getItem('aryan-palette')||'moon';
if(savedTheme==='light') root.dataset.theme='light'; else root.dataset.theme='dark';
root.dataset.palette=savedPalette;
function updateThemeIcon(){themeButtons.forEach(b=>b.textContent=root.dataset.theme==='dark'?'☀':'☾')}
function updatePalette(){palettes.forEach(p=>p.classList.toggle('active',p.dataset.palette===root.dataset.palette));colorBtn.style.color='var(--accent)'}
function toggleTheme(){root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('aryan-theme',root.dataset.theme);updateThemeIcon()}
themeButtons.forEach(b=>b.addEventListener('click',toggleTheme));
palettes.forEach(p=>p.addEventListener('click',()=>{root.dataset.palette=p.dataset.palette;localStorage.setItem('aryan-palette',p.dataset.palette);updatePalette()}));
colorBtn.addEventListener('click',()=>{const i=paletteNames.indexOf(root.dataset.palette);root.dataset.palette=paletteNames[(i+1)%paletteNames.length];localStorage.setItem('aryan-palette',root.dataset.palette);updatePalette()});
updateThemeIcon();updatePalette();

document.documentElement.classList.add('js');
(()=>{const els=document.querySelectorAll('.reveal');
if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
els.forEach(e=>io.observe(e));
// scrollspy for sidebar
const links=[...document.querySelectorAll('.side-section a[href^="#"]')];
const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));const a=map.get(e.target.id);a&&a.classList.add('active')}}),{rootMargin:'-30% 0px -60% 0px'});
map.forEach((_,id)=>{const s=document.getElementById(id);s&&spy.observe(s)});
})();
const cb=document.getElementById('copyCite');
if(cb)cb.addEventListener('click',async()=>{const t=cb.dataset.cite;try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}const o=cb.textContent;cb.textContent='Copied ✓';setTimeout(()=>cb.textContent=o,1800)});
