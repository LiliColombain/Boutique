fetch('/Js_Json/DataBoutique.json')
    .then(response => response.json())
    .then(data => {
        const zoneProduit = document.getElementById('produits');

        for (let key in data) {
            const produit = data[key];

            const produitCarte = document.createElement('div');
            produitCarte.className = "block"

            const nom = document.createElement('h3');
            nom.textContent = `${produit.name}`;

            const

            const color = document.createElement('p');
            color.textContent = `${produit.origine}`;

            const descri = document.createElement('p');
            descri.textContent = `${produit.description}`;

            const img = document.createElement('img');
            img.src = produit.image;
            img.alt = produit.name;
            img.className = "image-produit";

            const audio = document.createElement('audio');
            audio.src = produit.audio;
            audio.controls = true;
            audio.className = "lecteur-audio";



            produitCarte.appendChild(nom);
            produitCarte.appendChild(color);
            produitCarte.appendChild(img);
            produitCarte.appendChild(descri);
            produitCarte.appendChild(audio);

            zoneProduit.append(produitCarte);
        }
    });