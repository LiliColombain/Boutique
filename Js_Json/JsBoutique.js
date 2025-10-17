fetch('/Js_Json/DataBoutique.json')
    .then(response => response.json())
    .then(data => {
        const zoneProduit = document.getElementById('produits');

        for (let key in data) {
            const produit = data[key];

            const produitCarte = document.createElement('div');
            produitCarte.className = "block"

            const nom = document.createElement('p');
            nom.textContent = `Name: ${produit.name}`;

            const color = document.createElement('p');
            color.textContent = `couleur: ${produit.couleur}`;

            produitCarte.appendChild(nom);
            produitCarte.appendChild(color);

            zoneProduit.append(produitCarte);
        }
    });