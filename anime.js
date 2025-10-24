document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Cible l'élément HTML
    const targetElement = document.querySelector('.content-title');

    // Vérification de l'existence de l'élément pour éviter les erreurs
    if (!targetElement) return; 

    // 2. Définition des options de l'Observer
    const observerOptions = {
        root: null, // utilise le viewport (la fenêtre) comme conteneur
        rootMargin: '0px',
        threshold: 0.5 // Déclenchement quand 50% de l'élément est visible
    };

    // 3. Fonction de rappel (Callback)
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Si l'élément est dans la zone de visualisation (isIntersecting est vrai)
            if (entry.isIntersecting) {
                // Ajoute la classe qui déclenche l'animation CSS
                entry.target.classList.add('is-visible');
                
                // Arrête d'observer l'élément pour que l'animation ne se redéclenche pas
                observer.unobserve(entry.target);
            }
        });
    };

    // 4. Création de l'instance de l'Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 5. Lancement de l'observation sur l'élément ciblé
    observer.observe(targetElement);
});