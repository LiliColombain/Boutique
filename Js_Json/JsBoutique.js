// JsBoutique.js
let audios = [];
let produitsData = [];

fetch('/Js_Json/DataBoutique.json')
    .then(response => response.json())
    .then(data => {
        produitsData = data;
        const zoneProduit = document.getElementById('produits');
        const filtreOrigine = document.getElementById('filtre-origine');

        // Remplir dynamiquement le filtre avec toutes les origines uniques
        const origines = [...new Set(Object.values(produitsData).map(p => p.origine))];
        filtreOrigine.innerHTML = '<option value="all">Tous</option>';
        origines.forEach(origine => {
            const option = document.createElement('option');
            option.value = origine;
            option.textContent = origine;
            filtreOrigine.appendChild(option);
        });

        // Afficher les produits
        for (let key in produitsData) {
            const produit = produitsData[key];
            const produitCarte = document.createElement('div');
            produitCarte.className = "block";
            produitCarte.dataset.origine = produit.origine;
            produitCarte.dataset.name = produit.name;

            // Structure de la carte
            produitCarte.innerHTML = `
                <img src="${produit.image}" alt="${produit.name}">
                <div class="product-info">
                    <h2>${produit.name}</h2>
                    <p>${produit.origine}</p>
                    <p class="price">${produit.price}</p>
                    <div class="boutons-container">
                        <button class="bouton-tester">Tester</button>
                        <button class="bouton-acheter">Acheter</button>
                    </div>
                    <p class="descri">${produit.description}</p>
                </div>
            `;

            // Gestion des audios pour "Tester"
            const audioTester = new Audio(produit.audio);
            audios.push(audioTester);
            const boutonTester = produitCarte.querySelector('.bouton-tester');

            boutonTester.addEventListener('click', () => {
                if (audioTester.paused) {
                    audioTester.play();
                    boutonTester.classList.add('en-lecture');
                } else {
                    audioTester.pause();
                    boutonTester.classList.remove('en-lecture');
                }
            });

            audioTester.addEventListener('ended', () => {
                boutonTester.classList.remove('en-lecture');
            });

            // Gestion du son pour "Acheter"
            if (produit.audioAchat) {
                const audioAcheter = new Audio(produit.audioAchat);
                audios.push(audioAcheter);
                const boutonAcheter = produitCarte.querySelector('.bouton-acheter');
                boutonAcheter.addEventListener('click', () => {
                    audioAcheter.currentTime = 0; // Réinitialise le son
                    audioAcheter.play();
                });
            }

            // Ajout de la carte au DOM
            zoneProduit.appendChild(produitCarte);
        }

        // Gestion du mute
        const muteBtn = document.getElementById('mute-btn');
        let isMuted = false;

        // muteBtn.className = "boutonOnOff"; // Classe de base
        muteBtn.style.backgroundColor = "green"; 
        muteBtn.style.color = "white";
        muteBtn.addEventListener('click', () => {
            isMuted = !isMuted;

            audios.forEach(a => a.muted = isMuted);
            muteBtn.textContent = isMuted ? "Off" : "On";

            // Changement de couleur
            if (isMuted) {
                muteBtn.style.backgroundColor = "red";   // Couleur quand c’est Off
                muteBtn.style.color = "white";
            } else {
                muteBtn.style.backgroundColor = "green"; // Couleur quand c’est On
                muteBtn.style.color = "white";
            }
        });

        // Filtre par origine
        filtreOrigine.addEventListener('change', () => {
            const valeur = filtreOrigine.value;
            const cartes = document.querySelectorAll('.block');
            cartes.forEach(carte => {
                carte.style.display = (valeur === 'all' || carte.dataset.origine === valeur) ? 'block' : 'none';
            });
        });

        // Tri par nom
        const triNom = document.getElementById('tri-nom');
        triNom.addEventListener('change', () => {
            const cartes = Array.from(zoneProduit.children);
            cartes.sort((a, b) => {
                const nomA = a.dataset.name.toLowerCase();
                const nomB = b.dataset.name.toLowerCase();
                return triNom.value === 'asc' ? nomA.localeCompare(nomB) : nomB.localeCompare(nomA);
            });
            cartes.forEach(carte => zoneProduit.appendChild(carte));
        });
    })
    .catch(error => console.error('Erreur JSON :', error));
