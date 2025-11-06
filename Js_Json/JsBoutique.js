const audios = [];
const sections = {
    promotions: document.querySelector(".promotions"),
    phares: document.querySelector(".phares"),
    "tous-produits": document.querySelector(".tous-produits")
};

// Produits de base
const produitsExemple = [
    { nom: "Steak", origine: "Boeuf", image: "styles/Image/ImageDeSteak.jpg", description: "Steak qualité AAA", prix: "10$", audioTester: "styles/Audio/VacheTest.ogg", audioHT: "styles/Audio/VacheAchat.ogg" },
    { nom: "Saucisse", origine: "Cochon", image: "styles/Image/saucisse.jpg", description: "Saucisse basic", prix: "13$", audioTester: "styles/Audio/CochonTester.ogg", audioHT: "styles/Audio/CochonAcheter.mp3" },
    { nom: "2 Cuisse de Poulet", origine: "Poulet", image: "styles/Image/CuissePoulet.webp", description: "Poulet bien pouleter", prix: "15$", audioTester: "styles/Audio/PouleT.ogg", audioHT: "styles/Audio/PouleA.ogg" },
    { nom: "Ribs", origine: "mouton", image: "styles/Image/Mouton.jpeg", description: "2kg de pure mouton", prix: "11$", audioTester: "styles/Audio/MoutonT.ogg", audioHT: "styles/Audio/MoutonA.ogg" }

];

// 👉 Tableau spécial pour les promotions
const promotions = [
        { nom: "Steak", origine: "Boeuf", image: "styles/Image/ImageDeSteak.jpg", description: "Promo du jour", prix: "10$ → 7$", audioTester: "styles/Audio/VacheTest.ogg", audioHT: "styles/Audio/VacheAchat.ogg" },
    { nom: "Saucisse", origine: "Cochon", image: "styles/Image/saucisse.jpg", description: "Saucisse basic", prix: "24$ → 14$", audioTester: "styles/Audio/CochonTester.ogg", audioHT: "styles/Audio/CochonAcheter.mp3" },
    { nom: "2 Cuisse de Poulet", origine: "Poulet", image: "styles/Image/CuissePoulet.webp", description: "Poulet bien pouleter", prix: "20$ → 15$", audioTester: "styles/Audio/PouleT.ogg", audioHT: "styles/Audio/PouleA.ogg" } ,
    { nom: "Ribs", origine: "mouton", image: "styles/Image/Mouton.jpeg", description: "10kg de pure mouton", prix: " 32$ → 24$", audioTester: "styles/Audio/MoutonT.ogg", audioHT: "styles/Audio/MoutonA.ogg" }
];

// --- Notification ---
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

// --- Création cartes produits ---
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
        <button class="bouton-HT">Acheter</button>
    `;

    const audioTester = new Audio(produit.audioTester);
    const audioHT = new Audio(produit.audioHT);
    audios.push(audioTester, audioHT);

    div.querySelector(".bouton-tester").addEventListener("click", () => {
        audioTester.currentTime = 0;
        audioTester.play();
        afficherNotification(`${produit.nom} en test !`);
    });

    div.querySelector(".bouton-HT").addEventListener("click", () => {
        audioHT.currentTime = 0;
        audioHT.play();
        afficherNotification(`${produit.nom} acheté !`);
    });

    return div;
}

// --- Remplissage sections ---
// Promotions → utilise le tableau dédié
for (let i = 0; i < 4; i++) {
    const promo = promotions[i % promotions.length]; // alterne dans le tableau
    sections.promotions.appendChild(creerCarteProduit(promo));
}

// Produits phares
for (let i = 0; i < 6; i++) {
    sections.phares.appendChild(creerCarteProduit(produitsExemple[i % produitsExemple.length]));
}

// Tous les produits
for (let i = 0; i < 10; i++) {
    sections["tous-produits"].appendChild(creerCarteProduit(produitsExemple[i % produitsExemple.length]));
}

// --- Bouton Mute ---
let estMute = false;
document.getElementById("mute-btn").addEventListener("click", () => {
    estMute = !estMute;
    audios.forEach(a => a.muted = estMute);
    document.getElementById("mute-btn").textContent = estMute ? "Off" : "On";
});

// --- Flou dynamique sur scroll ---
const imageParallax = document.querySelector(".image-parallax");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const hauteurHero = window.innerHeight;

    let blur = Math.min(scrollY / hauteurHero * 5, 5);
    let scale = 1 + Math.min(scrollY / hauteurHero * 0.05, 0.05);

    if (imageParallax) {
        imageParallax.style.filter = `blur(${blur}px) brightness(0.7)`;
        imageParallax.style.transform = `scale(${scale})`;
    }
});

// --- Scroll fluide ---
document.querySelectorAll(".call-to-action").forEach(lien => {
    lien.addEventListener("click", e => {
        e.preventDefault();
        const cible = document.querySelector(lien.getAttribute("href"));
        cible.scrollIntoView({ behavior: "smooth" });
    });
});


document.querySelectorAll(".normal").forEach(lien => {
    lien.addEventListener("click", e => {
        e.preventDefault();
        const cible = document.querySelector(lien.getAttribute("href"));
        cible.scrollIntoView({ behavior: "smooth" });
    });
});

