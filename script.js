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
const cards = document.querySelectorAll('.card');
const observerCards = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold:0.3});
cards.forEach(card=>observerCards.observe(card));

const canvas = document.getElementById('meatCanvas');
const ctx = canvas.getContext('2d');

const imagesSrc = [
  'image1.png',
  'image2.png',
  'image3.png',
  'image4.png',
  'image5.png',
  'image6.png'
];

const images = [];
let loadedCount = 0;

// Charger toutes les images
imagesSrc.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedCount++;
    if(loadedCount === imagesSrc.length){
      initParticles();
      animate();
    }
  };
  images.push(img);
});

const particles = [];

function random(min,max){ return Math.random()*(max-min)+min; }

class ImageParticle {
  constructor(img){
    this.img = img;
    this.reset();
  }
  reset(){
    this.x = random(50,250);
    this.y = 400 + random(0,100);
    this.size = random(40,70);
    this.speedY = random(0.5,2);
    this.speedX = random(-0.5,0.5);
    this.opacity = 0;
    this.opacitySpeed = random(0.01,0.02);
    this.rotation = random(0,360);
    this.rotationSpeed = random(-1,1);
  }
  update(){
    this.y -= this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    if(this.opacity<1) this.opacity += this.opacitySpeed;
    if(this.y + this.size < 0) this.reset();
  }
  draw(ctx){
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
    ctx.globalAlpha = 1;
  }
}

function initParticles(){
  images.forEach(img=>{
    for(let i=0;i<2;i++){ // 2 particules par image
      particles.push(new ImageParticle(img));
    }
  });
}

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
    // Récupère l'état actuel du défilement
    const scrollY = window.scrollY;

    // Récupère les éléments (on utilise querySelector plus tôt pour la performance)
    const video = document.querySelector('.video-parallax');
    const content = document.querySelector('.contenu-superpose');

    if (!video || !content) return; // Sécurité au cas où les éléments ne sont pas trouvés

    // ===================================
    // 🌫️ Calcul des Effets Visuels
    // ===================================

    // Flou Progressif : Augmente le flou jusqu'à 8px maximum.
    const maxBlur = 8;
    const blurRate = 50; // Nombre de pixels de défilement pour atteindre 1px de flou
    const blurAmount = Math.min(scrollY / blurRate, maxBlur);

    // Opacité de la Vidéo : Diminue jusqu'à 30% d'opacité (0.3).
    const minOpacity = 0.3;
    const fadeDistance = 600; // Distance de défilement sur laquelle l'effet d'estompage se produit
    const videoOpacity = Math.max(1 - scrollY / fadeDistance, minOpacity);

    // Opacité du Texte (Héro) : Disparaît complètement à mesure que l'utilisateur défile.
    const textFadeDistance = 400; 
    const textOpacity = Math.max(1 - scrollY / textFadeDistance, 0);

    // ===================================
    // 🎨 Application des Styles
    // ===================================

    video.style.filter = `blur(${blurAmount}px)`;
    video.style.opacity = videoOpacity;

    // Applique une légère translation pour simuler l'effet parallax (optionnel, voir note ci-dessous)
    // Pour que la vidéo (fixe) semble bouger plus lentement que le contenu qui la recouvre
    video.style.transform = `translateY(${-scrollY * 0.15}px)`; 

    content.style.opacity = textOpacity;
});
