const audios = [];
const sections = {
    promotions: document.querySelector(".promotions"),
    phares: document.querySelector(".phares"),
    "tous-produits": document.querySelector(".tous-produits")
};

// Exemple de produits (tu peux dupliquer/modifier comme tu veux)
const produitsExemple = [
    { nom: "Steak", origine: "Boeuf", image: "styles/Image/ImageDeSteak.jpg", description: "Steak qualité AAA", prix: "10$", audioTester: "styles/audio/CochonTester.mp3", audioHT: "styles/audio/CochonAcheter.mp3" },
    { nom: "Saucisse", origine: "Cochon", image: "styles/Image/saucisse.jpg", description: "Saucisse basic", prix: "10$", audioTester: "styles/audio/CochonTester.mp3", audioHT: "styles/audio/CochonAcheter.mp3" },
    { nom: "Poulet", origine: "Poulet", image: "styles/Image/poulet.jpg", description: "Poulet bien pouleter", prix: "15$", audioTester: "styles/audio/CochonTester.mp3", audioHT: "styles/audio/CochonAcheter.mp3" }
];

// Création d'une notification
function afficherNotification(message) {
    const notif = document.createElement("div");
    notif.classList.add("notification");
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add("show"), 10);
    setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => notif.remove(), 300);
    }, 1500);
}

// Création d'une carte produit
function creerCarteProduit(produit) {
    const div = document.createElement("div");
    div.classList.add("produit");
    div.innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}">
        <h3>${produit.nom}</h3>
        <p>${produit.origine}</p>
        <p class="prix">${produit.prix}</p>
        <p>${produit.description}</p>
        <button class="bouton-tester">Tester</button>
        <button class="bouton-HT">HT</button>
    `;

    const audioTester = new Audio(produit.audioTester);
    const audioHT = new Audio(produit.audioHT);
    audios.push(audioTester, audioHT);

    const boutonTester = div.querySelector(".bouton-tester");
    const boutonHT = div.querySelector(".bouton-HT");

    boutonTester.addEventListener("click", () => {
        audioTester.currentTime = 0;
        audioTester.play();
        afficherNotification(`${produit.nom} en test !`);
    });

    boutonHT.addEventListener("click", () => {
        audioHT.currentTime = 0;
        audioHT.play();
        afficherNotification(`${produit.nom} HT !`);
    });

    return div;
}

// Remplissage des sections avec duplication pour démo
for (let i = 0; i < 4; i++) sections.promotions.appendChild(creerCarteProduit(produitsExemple[i % 3]));
for (let i = 0; i < 10; i++) sections.phares.appendChild(creerCarteProduit(produitsExemple[i % 3]));
for (let i = 0; i < 10; i++) sections["tous-produits"].appendChild(creerCarteProduit(produitsExemple[i % 3]));

// Bouton Mute
let estMute = false;
document.getElementById("mute-btn").addEventListener("click", () => {
    estMute = !estMute;
    audios.forEach(a => a.muted = estMute);
    document.getElementById("mute-btn").textContent = estMute ? "Off" : "On";
});

// Flou dynamique et zoom au scroll
const imageParallax = document.querySelector(".image-parallax");
const liensCTA = document.querySelectorAll(".call-to-action");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const hauteurHero = window.innerHeight;

    let blur = Math.min(scrollY / hauteurHero * 5, 5);
    let scale = 1 + Math.min(scrollY / hauteurHero * 0.05, 0.05);

    if(imageParallax) {
        imageParallax.style.filter = `blur(${blur}px) brightness(0.7)`;
        imageParallax.style.transform = `scale(${scale})`;
    }
});

// Scroll fluide vers les sections pour les CTA
liensCTA.forEach(lien => {
    lien.addEventListener("click", e => {
        e.preventDefault();
        const cible = document.querySelector(lien.getAttribute("href"));
        if(cible) cible.scrollIntoView({ behavior: "smooth" });
    });
});