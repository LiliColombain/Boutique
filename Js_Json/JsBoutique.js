let audios = [];

fetch('/Js_Json/DataBoutique.json')
    .then(response => response.json())
    .then(data => {
        const zoneProduit = document.getElementById('produits');

        for (let key in data) {
            const produit = data[key];

            const produitCarte = document.createElement('div');
            produitCarte.className = "block";
            produitCarte.dataset.origine = produit.origine;
            produitCarte.dataset.name = produit.name;

            const img = document.createElement('img');
            img.src = produit.image;
            img.alt = produit.name;

            const nom = document.createElement('p');
            nom.textContent = produit.name;
            const origine = document.createElement('p');
            origine.textContent = produit.origine;

            const prix = document.createElement('p');
            prix.textContent = produit.price;

            const boutonAudio = document.createElement('button');
            boutonAudio.textContent = "Tester";
            boutonAudio.className = "bouton-audio";
            const audio = new Audio(produit.audio);
            audios.push(audio);

            boutonAudio.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    boutonAudio.classList.add('en-lecture');
                } else {
                    audio.pause();
                    boutonAudio.classList.remove('en-lecture');
                }
            });

            audio.addEventListener('ended', () => {
                boutonAudio.classList.remove('en-lecture');
            });

            if (produit.audioAchat) {
                const boutonAudioAchat = document.createElement('button');
                boutonAudioAchat.textContent = "Acheter";
                boutonAudioAchat.className = "bouton-audio";
                const audioAchat = new Audio(produit.audioAchat);
                audios.push(audioAchat);

                boutonAudioAchat.addEventListener('click', () => {
                    if (audioAchat.paused) {
                        audioAchat.play();
                        boutonAudioAchat.classList.add('en-lecture');
                    } else {
                        audioAchat.pause();
                        boutonAudioAchat.classList.remove('en-lecture');
                    }
                });

                audioAchat.addEventListener('ended', () => {
                    boutonAudioAchat.classList.remove('en-lecture');
                });

                produitCarte.appendChild(boutonAudioAchat);
            }

            produitCarte.appendChild(img);
            produitCarte.appendChild(nom);
            produitCarte.appendChild(origine);
            produitCarte.appendChild(boutonAudio);
            produitCarte.appendChild(prix)

            zoneProduit.appendChild(produitCarte);
        }

        const muteBtn = document.getElementById('mute-btn');
        let isMuted = false;
        muteBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            audios.forEach(a => a.muted = isMuted);
            muteBtn.textContent = isMuted ? "Off" : "On";
        });

        const filtreOrigine = document.getElementById('filtre-origine');
        filtreOrigine.addEventListener('change', () => {
            const valeur = filtreOrigine.value;
            const cartes = document.querySelectorAll('.block');
            cartes.forEach(carte => {
                carte.style.display = (valeur === 'all' || carte.dataset.origine === valeur) ? 'flex' : 'none';
            });
        });

        // Tri
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