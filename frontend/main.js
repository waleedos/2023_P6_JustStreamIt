/* déclare une constante mainURL qui contient l'URL de base de votre API. Cette constante est utilisée plus tard
pour faire des requêtes à l'API.*/
const mainURL = "http://localhost:8000/api/v1/titles/";

const categoryNamesMap = {
    "Best": { name: "(Classement Global)", preposition: "" },
    "Crime": { name: "Crime", preposition: "de " },
    "Drama": { name: "Drame", preposition: "de " },
    "Family": { name: "Famille", preposition: "de " },
    "Sport": { name: "Sport", preposition: "de " }
};

function getCategoryNameInFrench(categorie) {
    return categoryNamesMap[categorie] || { name: categorie, preposition: "de " };
}

// Gestion du meilleur film
// Définition de la fonction asynchrone nommée getBest 
async function getBest() {

    // Envoi d'une requête GET asynchrone à l'API pour récupérer les films classés par le score IMDb décroissant
    const response = await fetch(mainURL + "?sort_by=-imdb_score");
    
    // Conversion de la réponse de l'API en JSON
    const data = await response.json();
    
    // Envoi d'une nouvelle requête GET asynchrone à l'URL du film avec le meilleur score IMDb.
    // pour la récupération du détail du meilleur film    
    const best = await fetch(data["results"][0]["url"]);
    
    // Conversion de la réponse de l'API en JSON    
    const dataBest = await best.json();

    // Trouve l'élément HTML avec l'ID "best-title" et modifie son contenu textuel avec le titre du meilleur film.
    document.getElementById("best-title").innerText = dataBest.title;

    // Trouve l'élément HTML avec l'ID "best-picture" et modifie son attribut src avec l'URL de 
    // l'image du meilleur film.
    document.getElementById("best-picture").src = dataBest.image_url;
    
    // Trouve l'élément HTML avec l'ID "best-description" et modifie son contenu textuel avec la description 
    // du meilleur film.    
    document.getElementById("best-description").innerText = dataBest.description;
    
    // Trouve le premier élément HTML avec la classe "modal-btn".    
    const bestModalBtn = document.getElementsByClassName("modal-btn")[0];
    
    // Ajoute un attribut onclick à l'élément bestModalBtn pour ouvrir la modale avec les détails du meilleur
    // film quand on clique dessus.    
    bestModalBtn.setAttribute("onclick", `openModal(${dataBest.id})`);
}

/* Gestion des 7 meilleurs film pour une catégorie */
// déclaration d'une fonction asynchrone appelée getNumberFilm qui prend deux paramètres: numberFilm
// (le nombre de films à récupérer) et categorie (la catégorie de films à récupérer).
async function getNumberFilm(numberFilm, categorie){

    // Si la catégorie est "Best", alors on la remplace par une chaîne vide. C'est probablement dû au fait que l'API 
    //ne reconnaît pas "Best" comme une catégorie valide.
    if (categorie == "Best")
        categorie = "";

    // Envoie une requête HTTP GET à l'URL de l'API, en ajoutant des paramètres à l'URL pour spécifier le nombre
    // de films à récupérer, la façon de les trier (par score IMDB décroissant) et la catégorie de films à récupérer.
    const response = await fetch(mainURL + "?sort_by=-imdb_score&page_size=" + numberFilm + "&genre=" + categorie);

    // Si la requête HTTP échoue pour une raison quelconque (par exemple, si l'API est hors ligne ou si l'URL est
    // invalide), la fonction retourne immédiatement sans faire autre chose.
    if (!response.ok)
        return;

    // Attente que le corps de la réponse HTTP soit lu et retourné comme un objet JSON.
    const numberFilms = await response.json();

    // La fonction renvoie l'objet JSON, qui contient les détails des films.
    return numberFilms;
}

// Déclaration d'une fonction asynchrone appelée createCarrousel qui prend les mêmes paramètres que getNumberFilm.
async function createCarrousel(numberFilm, categorie) {

    // Appel de la fonction getNumberFilm et attend que celle-ci soit terminée. Les détails des films sont stockés
    // dans la variable dataFilms.
    const dataFilms = await getNumberFilm(numberFilm, categorie);

    // Initialisation d'une variable dataCarousel avec les détails des films.
    let dataCarousel = dataFilms;

    // Si la catégorie est "Best", la variable dataCarousel est réinitialisée avec les détails des films. C'est
    //une répétition inutile car cette opération a déjà été effectuée à la ligne précédente.
    if (categorie == "Best") {
        dataCarousel = dataFilms;
    }

    // sélectionner un élément du document HTML avec l'ID "categories".    
    const sectionCategorie = document.getElementById("categories");

    // Création d'un nouvel élément 'div' et lui ajoutent la classe "slide-container".
    const wrapper = document.createElement('div');
    wrapper.classList.add("slide-container");

    // Création d'un nouvel élément 'div', auquel est ajoutée la classe "title".
    const title = document.createElement('div');
    title.classList.add("title");

    // Création d'un nouvel élément 'h2', récupèrent le nom de la catégorie en français en utilisant la
    // fonction getCategoryNameInFrench et définissent le contenu de l'élément 'h2' avec la chaîne de caractères
    // spécifiée.
    const categoryTitle = document.createElement('h2');
    const categoryName = getCategoryNameInFrench(categorie);
    categoryTitle.innerHTML = "Catégorie meilleurs films " + categoryName.preposition + categoryName.name;

    // Création de deux éléments 'img' pour les boutons de défilement gauche et droit du carrousel,
    // leur attribuent les classes, ID et sources d'images appropriés.
    const buttonPrev = document.createElement('img');
    buttonPrev.classList.add('arrow');
    buttonPrev.setAttribute("id", categorie + '-slide-left');
    buttonPrev.src = "./img/arrow-left.png";

    // Création d'un nouvel élément 'section', lui ajoutent la classe "container" et lui attribuent 
    // un ID basé sur la catégorie.
    const carouselConst = document.createElement('section');
    carouselConst.classList.add("container");
    carouselConst.setAttribute("id", categorie);

    // Création d'un nouvel élément d'image HTML qui sera utilisé comme le bouton "Suivant" pour faire 
    // défiler le carrousel.
    const buttonNext = document.createElement('img');

    // La classe 'arrow' est ajoutée à l'élément d'image. Cela pourrait être utilisé pour l'application
    // de styles CSS à l'élément.
    buttonNext.classList.add('arrow');

    // un attribut 'id' est défini pour l'élément d'image. L'ID est une concaténation de la catégorie de
    // films et de la chaîne '-slide-right', ce qui pourrait être utilisé pour cibler spécifiquement cet
    // élément pour le style ou la manipulation via JavaScript.
    buttonNext.setAttribute("id", categorie + '-slide-right');

    // Définit l'attribut 'src' de l'élément d'image pour pointer vers l'image 'arrow-right.png' dans le
    // dossier 'img'. Cette image sera affichée pour le bouton "Suivant" dans le carrousel.
    buttonNext.src = "./img/arrow-right.png";

    // Cette boucle parcourt tous les films dans dataCarousel.results, crée un nouvel élément 'div' pour chaque
    // film, crée un élément 'img' pour la couverture du film, définit la source de l'image avec l'URL de l'image
    // du film, ajoute un gestionnaire d'événements pour ouvrir le modal quand l'image est cliquée, et ajoute
    // l'image à l'élément 'div', puis ajoute l'élément 'div' à l'élément 'section'.    
    for(let i in dataCarousel.results){
        const film = document.createElement('div');
        const cover = document.createElement('img');

        film.classList.add('thumbnail');
        cover.src = dataCarousel.results[i].image_url;
        cover.setAttribute("onclick", `openModal(${dataCarousel.results[i].id})`);

        film.appendChild(cover);
        carouselConst.appendChild(film);
    }

    // Ajoutent les différents éléments créés à l'élément "categories" du document HTML dans l'ordre approprié.
    sectionCategorie.appendChild(title);
    title.appendChild(categoryTitle);
    sectionCategorie.appendChild(wrapper);
    wrapper.appendChild(buttonPrev);
    wrapper.appendChild(carouselConst);
    wrapper.appendChild(buttonNext);

    // Cette ligne sélectionne l'élément avec l'ID basé sur la catégorie.
    let slider = document.getElementById(categorie);

    // Ces lignes ajoutent des gestionnaires d'événements aux boutons de défilement, qui font défiler le
    // carrousel vers la gauche ou la droite lorsqu'ils sont cliqués.
    buttonPrev.addEventListener("click", () => slider.scrollLeft -= 230);
    buttonNext.addEventListener("click", () => slider.scrollLeft += 230);
}

// Sélectionnent respectivement le conteneur modal (la fenêtre qui s'ouvre lorsque vous cliquez sur un
// film) et tous les éléments qui peuvent déclencher le modal.
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-triggers");

// Ajout d'un gestionnaire d'événements qui exécute la fonction toggleModal lorsque l'élément est cliqué
// et ce pour chaque élément déclencheur du modal.
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

// Cette fonction toggleModal ajoute ou supprime la classe "active" du conteneur modal. Cette classe est
// utilisée dans le CSS pour afficher ou masquer le modal.
function toggleModal(){
    modalContainer.classList.toggle("active");
}

// Cette fonction openModal est appelée avec un movieId. Elle ajoute ou supprime la classe "active" du
// conteneur modal et appelle ensuite la fonction openModalData pour remplir le modal avec les données
// du film.
async function openModal(movieId) {
    modalContainer.classList.toggle("active");
    await openModalData(movieId);
}

// Cette fonction closeModal ajoute ou supprime la classe "active" du conteneur modal, ce qui a pour effet
// de le masquer.
function closeModal(){
    modalContainer.classList.toggle("active");
}

// Récupèration des détails d'un film spécifique en utilisant son movieId. Elle utilise fetch pour faire
// une requête à l'API, puis remplit différents éléments du modal avec les détails du film.
async function openModalData(movieId) {

    // Lancement d'une requête HTTP GET pour obtenir des informations sur un film spécifique, en utilisant son ID.
    //L'opérateur await est utilisé pour attendre la réponse de la requête.
    const response = await fetch(mainURL + movieId);

    // convertisseur de la réponse de la requête en format JSON.
    const data = await response.json();

    // Modification de l'attribut src de l'élément HTML avec l'ID "modal-picture" pour afficher l'image du 
    //film spécifique.
    document.getElementById("modal-picture").src = data.image_url;

    // Modification des contenus des éléments HTML avec les ID "modal-....." pour afficher "les éléments requis" 
    // de sortie du film comme la date de sortie, le genre, la date de publication..... 
    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-genre").innerHTML = '<span>Genre : </span>' + data.genres;
    document.getElementById("modal-date").innerHTML = '<span>Date de sortie du film : </span>' + data.date_published;
    document.getElementById("modal-score").innerHTML = '<span>Note JustStreamIt : </span>' + data.imdb_score;
    document.getElementById("modal-description").innerHTML = '<span>Description du film :\n </span>' + data.long_description;
    document.getElementById("modal-director").innerHTML = '<span>Réalisateur : </span>' + data.directors;
    document.getElementById("modal-actors").innerHTML = '<span>Acteurs : </span>' + data.actors;
    document.getElementById("modal-duration").innerHTML = '<span>Durée du film : </span>' + data.duration + " Minutes";
    document.getElementById("modal-country").innerHTML = "<span>Pays d'origine : </span>" + data.countries;
    
    // Gèrer l'affichage de la note du film et du revenu brut mondial du film. Si la note du film n'est pas disponible
    // ou si le revenu brut mondial n'est pas disponible, un message d'absence de données est affiché. 
    // Sinon, les valeurs respectives sont affichées.
    if (data.rated = "Not rated or unkown rating")
        document.getElementById("modal-rated").innerHTML = '<span>Note : </span>' + "Pas de note pour le moment";
    else
        document.getElementById("modal-rated").innerHTML = '<span>Note : </span>' + data.rated;

    if (data.worldwide_gross_income == null)
        document.getElementById("modal-box").innerHTML = '<span>Résultat Box Office : </span>' + "Pas de résultat";
    else
        document.getElementById("modal-box").innerText = '<span>Résultat Box Office : </span>' + data.worldwide_gross_income;

    // Ajout d'un attribut "onclick" à l'élément HTML avec la classe "close-modal", ce qui signifie que lorsque cet élément 
    // est cliqué, la fonction "closeModal()" sera appelée.  
    document.getElementsByClassName("close-modal")[0].setAttribute("onclick" , closeModal);
}

// Déclaration d'une fonction appelée loader.
function loader(){

    // Sélectionner l'élément HTML avec la classe 'loader-container' et ajoute la classe 'hidden' à sa liste de classes. 
    // Cela est utilisé pour cacher le spinner de démarrage une fois que le contenu est prêt à être affiché.
    document.querySelector('.loader-container').classList.add('hidden');
}

// Déclaration d'une fonction asynchrone appelée viewCarousel. Et pour rappel, les fonctions asynchrones sont
// utilisées pour exécuter des opérations qui peuvent prendre un certain temps à compléter, comme les requêtes
// réseau, et permettent à d'autres parties du code de s'exécuter pendant que ces opérations sont en cours.
async function viewCarousel(){

    // Appels des fonctions asynchrones pour récupérer et afficher des carrousels de films. L'opérateur await
    // est utilisé pour attendre que chaque fonction ait terminé avant de passer à la suivante. Cela garantit
    // que les carrousels sont créés dans l'ordre souhaité.
    await getBest();
    await createCarrousel(8, "Best");
    await createCarrousel(7, "Crime");
    await createCarrousel(7, "Drama");
    await createCarrousel(7, "Family");
    await createCarrousel(7, "Sport");
    
    // Appel de la fonction loader définie précédemment pour cacher l'élément de chargement une fois que tous
    // les carrousels ont été créés.
    loader();
};

// Ajout d'un écouteur d'événements à l'objet window. L'événement 'load' se produit lorsque toute la page a
// terminé son chargement. Une fois que cet événement se produit, la fonction viewCarousel est appelée pour
// commencer à récupérer et afficher les carrousels de films.
window.addEventListener('load', viewCarousel);
