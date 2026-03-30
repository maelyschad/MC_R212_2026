const projets = [
  { id: 1, titre: "Portfolio", description: "Mon site personnel responsive.", tags: ["HTML", "CSS"] },
  { id: 2, titre: "Blog tech", description: "Articles sur le développement web.", tags: ["JS", "API"] },
  { id: 3, titre: "App météo", description: "Application de météo en temps réel.", tags: ["JS", "API"] },
  { id: 4, titre: "Refonte asso", description: "Nouveau site pour une association.", tags: ["HTML", "CSS", "Figma"] },
  { id: 5, titre: "Mini-jeu", description: "Jeu de mémoire en JavaScript.", tags: ["JS", "DOM"] },
];

const conteneur = document.querySelector('#projets-liste');

function afficherProjets(listeProjets) {
  conteneur.innerHTML = ''; // Vider le conteneur

  listeProjets.forEach((projet) => {
    const carte = document.createElement('article');
    carte.classList.add('carte');

    carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <div class="tags">
        ${projet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    `; //``met dans une chaîne de caractère, dans lequel on peut injecter du js

    conteneur.append(carte); //ajoute une à une les cartes
  });
}

// Affichage initial
afficherProjets(projets);

const boutonsFiltres = document.querySelectorAll('.filtre');

boutonsFiltres.forEach((btn) => {
  btn.addEventListener('click', () => {
    // 1. Mettre à jour le bouton actif
    document.querySelector('.filtre.active').classList.remove('active');
    btn.classList.add('active');

    // 2. Filtrer les données
    const tag = btn.dataset.tag;
    if (tag === 'tous') {
      afficherProjets(projets);
    } else {
      const projetsFiltres = projets.filter(p => p.tags.includes(tag));
      afficherProjets(projetsFiltres);
    }
  });
}); 

const form = document.querySelector('#form-ajout');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  const titre = document.querySelector('#input-titre').value.trim(); // lit les données entrées
  const description = document.querySelector('#input-desc').value.trim();
  const tagsTexte = document.querySelector('#input-tags').value.trim();

  if (!titre || !description) return; // Ne rien faire si vide

  const nouveauProjet = {
    id: projets.length + 1,
    titre: titre,
    description: description,
    tags: tagsTexte ? tagsTexte.split(',').map(t => t.trim()) : [], //sépare les tags avec des virgules
  };

  projets.push(nouveauProjet);
  sauvegarder();
  afficherProjets(projets);
  form.reset(); // Vider le formulaire
});

function sauvegarder() {
  localStorage.setItem('projets', JSON.stringify(projets));
}

function charger() {
  const donnees = localStorage.getItem('projets');
  if (donnees) {
    // Remplacer le contenu du tableau (sans réassigner la variable)
    projets.length = 0;
    JSON.parse(donnees).forEach(p => projets.push(p));
  }
}

// Au chargement de la page
charger();
afficherProjets(projets);