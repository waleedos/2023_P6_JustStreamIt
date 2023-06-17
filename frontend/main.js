/* déclare une constante mainURL qui contient l'URL de base de votre API. Cette constante est utilisée plus tard
pour faire des requêtes à l'API.*/
const mainURL = "http://localhost:8000/api/v1/titles/"

// Gestion du meilleur film
// Définition de la fonction asynchrone nommée getBest 
async function getBest() {

    // Envoi d'une requête GET asynchrone à l'API pour récupérer les films classés par le score IMDb décroissant
    const response = await fetch(mainURL + "?sort_by=-imdb_score");

    // Conversion de la réponse de l'API en JSON
    const data = await response.json();

    // Envoi d'une nouvelle requête GET asynchrone à l'URL du film avec le meilleur score IMDb.
    // pour la récupération du détail du meilleur film
    const best = await fetch(data["results"][0]["url"])

    // Conversion de la réponse de l'API en JSON
    const dataBest = await best.json()

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
};

/* Gestion des 7 meilleurs film pour une catégorie */
// Définition d'une fonction asynchrone getNumberFilm qui prend deux arguments : le nombre de films à 
// récupérer et leur catégorie.
async function getNumberFilm(numberFilm, categorie){

    // Vérifie si la catégorie est "best" et si c'est le cas, la remplace par une chaîne vide.
    if (categorie == "Les films les mieux notés")
        categorie = ""

    // Envoyer une requête GET asynchrone à l'API pour récupérer un certain nombre de films d'une certaine 
    // catégorie, classés par score IMDb décroissant.
    const response = await fetch(mainURL + "?sort_by=-imdb_score&page_size=" + numberFilm + "&genre=" + categorie)

    // Si la réponse de l'API n'est pas OK (c'est-à-dire si le code d'état HTTP n'est pas dans la plage 200-299), 
    // la fonction est terminée et retourne undefined.
    if (!response.ok)
        return
    
    // Convertir la réponse de l'API en JSON.   
    const numberFilms = await response.json();

    // Retourne l'objet JSON contenant les informations sur les films.
    return numberFilms
};


// Création du carousel
// Définit une fonction asynchrone getNumberFilm qui prend deux arguments : le nombre de films à récupérer 
// et leur catégorie. 
async function createCarrousel(numberFilm, categorie) {

    // Appelle la fonction asynchrone getNumberFilm et attend son résultat, qui est affecté à dataFilms.
    const dataFilms = await getNumberFilm(numberFilm, categorie)

    // Vérifie si la catégorie est "best", si c'est le cas, supprime le premier film de la liste dataFilms.results 
    //et l'affecte à dataCarousel.
    if (categorie == "best")
        dataCarousel = dataFilms.results.splice(0, 1)

    // Affectation de dataFilms à dataCarousel.
    dataCarousel = dataFilms

    // Construction des balises du HTML
    // Trouver l'élément HTML avec l'ID "categories" et l'affecter à sectionCategorie.
    const sectionCategorie = document.getElementById("categories");
    
    // Création d'un nouvel élément div et l'affecter à wrapper.
    const wrapper = document.createElement('div');

    // Ajout de la classe "slide-container" à wrapper.
    wrapper.classList.add("slide-container");

    // Création d'un nouvel élément div et l'affecter à title.    
    const title = document.createElement('div');
    
    // Ajout de la classe "title" à title.
    title.classList.add("title");
    
    // Création d'un nouvel élément h2 et l'affecter à categoryTitle.
    const categoryTitle = document.createElement('h2');

    // Définition du contenu HTML de categoryTitle comme la valeur de categorie.
    categoryTitle.innerHTML = categorie

    // Construction d'un nouvel élément img et l'affecter à buttonPrev.
    const buttonPrev = document.createElement('img');

    // Ajoute la classe 'arrow' à buttonPrev.
    buttonPrev.classList.add('arrow');

    // Définition de l'attribut id de buttonPrev comme la valeur de categorie suivie de '-slide-left'.
    buttonPrev.setAttribute("id", categorie + '-slide-left');
    
    // Définit l'attribut src de buttonPrev comme le chemin vers l'image de la flèche gauche.
    buttonPrev.src = "./img/arrow-left.png";

    // Création d'un nouvel élément 'section' et l'affecter à carouselConst.
    const carouselConst = document.createElement('section');

    // Ajout de la classe 'container' à carouselConst.
    carouselConst.classList.add("container");

    // Définition de l'attribut 'id' de carouselConst comme la valeur de 'categorie'.
    carouselConst.setAttribute("id", categorie);
    
    // Création d'un nouvel élément img et l'affecter à buttonNext.
    const buttonNext = document.createElement('img');

    // Ajoute la classe 'arrow' à buttonNext.
    buttonNext.classList.add('arrow');

    // Définition de l'attribut 'id' de 'buttonNext' comme la valeur de categorie suivie de '-slide-right'.
    buttonNext.setAttribute("id", categorie + '-slide-right');

    // Définition de l'attribut src de 'buttonNext' comme le chemin vers l'image de la flèche droite.
    buttonNext.src = "./img/arrow-right.png";
    
    //----- Boucle pour créer les 7 affiches de film dans le carousel-----//
    // Boucle sur chaque élément de dataCarousel.results.
    for( i in dataCarousel.results){

        // Creation d'un nouvel élément div dans la boucle et l'affecter à film.
        const film = document.createElement('div');

        // Creation d'un nouvel élément img dans la boucle et l'affecter à cover.        
        const cover = document.createElement('img');

        // Dans la boucle, ajout de la classe 'thumbnail' à film.
        film.classList.add('thumbnail');
        
        // Dans la boucle, définition de l'attribut 'src' de 'cover' comme l'URL de l'image du film courant.
        cover.src = dataCarousel.results[i].image_url;

        // Définition de l'attribut "onclick" de "cover" dans la boucle pour ouvrir la modale avec l'id du 
        // film courant lorsque l'image est cliquée.
        cover.setAttribute("onclick", `openModal(${dataCarousel.results[i].id})`)

        // Dans la boucle, ajoute cover comme enfant de film.
        film.appendChild(cover);

        // Dans la boucle, ajoute film comme enfant de carouselConst.
        carouselConst.appendChild(film);
    }

    // Construction du HTML
    // Ajoute title comme enfant de sectionCategorie.
    sectionCategorie.appendChild(title);

    // Ajoute categoryTitle comme enfant de title.
    title.appendChild(categoryTitle);

    // Ajoute wrapper comme enfant de sectionCategorie.
    sectionCategorie.appendChild(wrapper);
    
    // Ajoute buttonPrev comme enfant de wrapper.
    wrapper.appendChild(buttonPrev);

    // Ajoute carouselConst comme enfant de wrapper.
    wrapper.appendChild(carouselConst);
    
    // Ajoute buttonNext comme enfant de wrapper.
    wrapper.appendChild(buttonNext);

    // Gestion des boutons de défilement du carousel

    // Trouve l'élément HTML avec l'ID équivalent à categorie et l'affecte à slider. 
    let slider = document.getElementById(categorie);

    // Ajoute un gestionnaire d'événements qui exécute la fonction movePrev lorsque buttonPrev est cliqué.
    buttonPrev.addEventListener("click", movePrev);

    // Ajoute un gestionnaire d'événements qui exécute la fonction moveNext lorsque buttonNext est cliqué.
    buttonNext.addEventListener("click", moveNext);

    // Définit la fonction movePrev qui décale le carrousel vers la gauche de 230 pixels lorsque appelée.
    function movePrev(){
        slider.scrollLeft -= 230;
    }

    // Définit la fonction moveNext qui décale le carrousel vers la droite de 230 pixels lorsque appelée.
    function moveNext(){
        slider.scrollLeft += 230;
    }

};

//--- Gestion de la modale ---\\
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-triggers");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active");
}

async function openModal(movieId) {
    modalContainer.classList.toggle("active");
    await openModalData(movieId)
}

function closeModal(){
    modalContainer.classList.toggle("active");
}
// Informations affichées dans la modale
async function openModalData(movieId) {
    const response = await fetch(mainURL + movieId);
    const data = await response.json();

    document.getElementById("modal-picture").src = data.image_url;
    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-genre").innerHTML = '<span>Genre : </span>' + data.genres;
    document.getElementById("modal-date").innerHTML = '<span>Date de sortie du film : </span>' + data.date_published;
    document.getElementById("modal-score").innerHTML = '<span>Note JustStreamIt : </span>' + data.imdb_score;
    document.getElementById("modal-description").innerHTML = '<span>Description du film :\n </span>' + data.long_description;
    document.getElementById("modal-director").innerHTML = '<span>Réalisateur : </span>' + data.directors;
    document.getElementById("modal-actors").innerHTML = '<span>Acteurs : </span>' + data.actors;
    document.getElementById("modal-duration").innerHTML = '<span>Durée du film : </span>' + data.duration + " Minutes";
    document.getElementById("modal-country").innerHTML = "<span>Pays d'origine : </span>" + data.countries;

    
    if (data.rated = "Not rated or unkown rating")
        document.getElementById("modal-rated").innerHTML = '<span>Note : </span>' + "Pas de note pour le moment";
    else
        document.getElementById("modal-rated").innerHTML = '<span>Note : </span>' + data.rated;
    
    if (data.worldwide_gross_income == null)
        document.getElementById("modal-box").innerHTML = '<span>Résultat Box Office : </span>' + "Pas de résultat";
    else
        document.getElementById("modal-box").innerText = '<span>Résultat Box Office : </span>' + data.worldwide_gross_income;

    document.getElementsByClassName("close-modal")[0].setAttribute("onclick" , closeModal)
}  

//--- Fonction pour arrêter le loader ---\\
function loader(){
    document.querySelector('.loader-container').classList.add('hidden')
}

//--- Création d'une fonction async pour l'affichage du carousel dans l'ordre ---\\
async function viewCarousel(){
    await getBest();
    await createCarrousel(8, "Les films les mieux notés"),
    await createCarrousel(7, "Crime"),
    await createCarrousel(7, "Biography"),
    await createCarrousel(7, "Family"),
    loader()
};

//--- Chargement du JS dans le HTML ---\\
window.addEventListener('load', () => {
    
    viewCarousel()
});

