// Apparition du carousel
const heroRight = document.querySelector('.hero-right');
const observerHero = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) heroRight.classList.add('visible');
  });
}, { threshold:0.3 });
observerHero.observe(heroRight);

// Rotation carousel
const carousel = document.querySelector('.carousel');
let angle = 0;
function rotateCarousel(){
  angle += 0.3;
  carousel.style.transform = `rotateY(${angle}deg)`;
  requestAnimationFrame(rotateCarousel);
}
rotateCarousel();

// Animation cartes au scroll



function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.update();
    p.draw(ctx);
  });
  requestAnimationFrame(animate);
}

// Écoute l'événement de défilement de la fenêtre
window.addEventListener('scroll', () => {
    
    const scrollY = window.scrollY;

    
    const video = document.querySelector('.video-parallax');
    const content = document.querySelector('.contenu-superpose');

    if (!video || !content) return; 

    // ===================================
    // 🌫️ Calcul des Effets Visuels
    // ===================================

  
    const maxBlur = 8;
    const blurRate = 50;
    const blurAmount = Math.min(scrollY / blurRate, maxBlur);

    const minOpacity = 0.3;
    const fadeDistance = 600; 
    const videoOpacity = Math.max(1 - scrollY / fadeDistance, minOpacity);

    
    const textFadeDistance = 400; 
    const textOpacity = Math.max(1 - scrollY / textFadeDistance, 0);

    // ===================================
    // 🎨 Application des Styles
    // ===================================

    video.style.filter = `blur(${blurAmount}px)`;
    video.style.opacity = videoOpacity;


    video.style.transform = `translateY(${-scrollY * 0.15}px)`; 

    content.style.opacity = textOpacity;
});


const boutons = document.querySelectorAll('.bouton-rond');

boutons.forEach(bouton => {
  const popup = bouton.querySelector('.popup-info');
  const titre = popup.querySelector('.popup-titre');
  const desc = popup.querySelector('.popup-description');
  const lien = popup.querySelector('.popup-lien');
  const fermer = popup.querySelector('.popup-fermer');

  bouton.addEventListener('click', (e) => {
   
    document.querySelectorAll('.popup-info').forEach(p => p.classList.remove('actif'));

   
    titre.textContent = bouton.dataset.titre;
    desc.textContent = bouton.dataset.description;
    lien.href = bouton.dataset.lien;
    popup.classList.add('actif');
  });

  fermer.addEventListener('click', (e) => {
    e.stopPropagation(); 
    popup.classList.remove('actif');
  });
});