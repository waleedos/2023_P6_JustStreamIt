# Projet 6 OpenClassRoom : Développez une interface utilisateur pour une application web Python

## Présentation du projet
Le but de ce projet est de créer un site web de référencement de films de cinémas. Le but de ce site est de donner différentes informations sur plus ou moins 85000 films. Les informations comprennent le titre du film , son image, un résumé , son classement IMDB etc..

Ce site a pour but d'aider les cinéphiles lors de l'achat de dvd ou choix de programmes télé; Il est développé en html ,css et javascript( vanilla javascript). Et doit fonctionner sous Edge , Firefox et Chrome.

## composition
Tous les fichiers necessaires pour faire fonctionner le site se trouvent dans le répertoire /frontend.

Ces fichiers sont :
- index.html .
- style.css . 
- main.js .
- et un répértoire /img qui contient les images du site comme le logo et les fleches.

## Lancement du site
Mettez l'adresse main.html dans le navigateur de votre choix .
Auparavant , assurez-vous que l'api d'accès à la base de données de films fonctionne.

## Présentation du site
Un bandeau gris apparaît en haut de l'écran , avec le nom du site , un lien accueil et un combobox avec les différentes catégories de films.
- si on clique sur Accueil la page se rafraichit
- si on sélectionne une catégorie dans la combobox , un message apparait 'option non operationnele pour le moment'.
La présentation des films se fait en 5 parties.
Tout en haut , on voit le film avec le meilleur score imdb toute catégorie confondues
Ensuite on a un bandeau avec les 7 films suivants triés selon le scrore imdb , également toutes catégories. Une flècche à droite permet d'afficher 7 films suivants , si on arrive au bout de la sélection , un messge apparaît indiquant qu'il n'y a plus de films et la fèche de gauche permet de revenir en arrière. Si on arrive au début , un message 'on est revenu au début apparît'.
on a ensuite 3 bandeaux pour 3 catégories prédéfinies. Le fonctionnement de ces 3 bandeaux est similaire à celui des films les mieux notés.
Les 3 catégories sont
- Animation
- Série noire
- Western

Si on clique sur chaque image du film , une fenêtre s'affiche indquant les informations sur le film , un bouton permet de fermer la fenêtre. Il se peut que l'image du film ne soit pas présente , une image indiquant , image non disponible apparaît mais si on clique dessu , les informations apparaissent quand même.

# Interface pour l'application JustStreamIt

Interface pour l'application JustStreamIt qui permet l'affichage de données sur des films 
récupérés via une api.


## Initialisation du programme:

Créez un répertoire dédié et placez-vous dedans:

```
mkdir JustStreamIt
cd /JustStreamIt
```

Créez l'environnement virtuel et activez le:

```
python3 -m venv env
source env/bin/activate
```


Importez l'api du projet depuis github:

```
git clone https://github.com/GuillaumeP29/OC_P6.git
```


Suivez le procédure d'installation de l'api fournie.

Déammrer l'api en locale:

```
python manage.py runserver
```

## Utilisation du programme:

Doucle-cliquez sur le fichier index.html.

# Développez une interface utilisateur pour une application web Python

Créer une interface pour faire apparaitre une sélection de films depuis l'API OCMovies

Sur l'interface les sections sont:

    -   Le meillleur film
        - un bouton pour avoir un descriptif complet du film
    -   Section des 7 meilleurs films
    -   3 sections avec les 7 meilleurs films pour les catégories suivantes:
        - Crime
        - Biographie
        - Famille
Sur chaque image de film un clic est possible pour ouvrir une fenêtre modale avec un descriptif complet du film


## Interface



## Déploiement

### Installation de l'API OCMovies-API
Installation et exécution de l'application sans pipenv (avec venv et pip)
1. Cloner ce dépôt de code à l'aide de la commande $ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git (vous pouvez également télécharger le code en temps qu'archive zip)
2. Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande $ cd ocmovies-api-fr
3. Créer un environnement virtuel pour le projet avec $ python -m venv env sous windows ou $ python3 -m venv env sous macos ou linux.
4. Activez l'environnement virtuel avec $ env\Scripts\activate sous windows ou $ source env/bin/activate sous macos ou linux.
5. Installez les dépendances du projet avec la commande $ pip install -r requirements.txt
6. Créer et alimenter la base de données avec la commande $ python manage.py create_db
7. Démarrer le serveur avec $ python manage.py runserver

### Lancement de l'interface graphique

1. Aller dans le répertoire ''frontend''
2. Lancer le fichier ''index.html'' dans votre navigateur

Bonne navigation...

## Validation HTML et CSS

Résultat de la validation du HTML sur le site du W3C

Document checking completed. No errors or warnings to show.

Résultat de la validation du CSS sur le site du W3C

Félicitations ! Aucune erreur trouvée.


# JustStreamIt
![](images/logoJustStreamIt.png)

Créer une interface utilisateur pour une application web.

Intéragir avec une API REST.

Cette application web permettra de visualiser en temps réel un classement de films intérressants.

# Front-end
L'interface se compose de plusieurs zones :
- Le meilleur film avec le score le plus élevé
- les 7 films les mieux notés toutes catégories confondues
- les 7 films les mieux notés pour les catégories Action, Aventure et Comédie.

# Tester le projet

Lancer votre terminal et clonez le projet:



# Installation du back-end

Pour faire fonctionner ce site web, suiver les instructions présentent à cette adresse:


    
# Lancer le programme

Une fois l'API lancée, l'utilisateur peut accéder au site via son IDE avec la fonction Live Share ou en hébergeant ce dernier


# Oc-P6 Développez une interface utilisateur pour une application web Python
---

## Objectif
Ce programme est un projet proposé par [OpenClassRooms](https://openclassrooms.com/fr/) dans le cadre de la formation :
Développeur d'applications Python. Il s'agit de développer une application Web pour l'association JustStreamIt.

* Le site web présente le film le mieux 
* une liste des 7 meilleurs films 
* une liste des 7 meilleurs films de la catégorie Aventure
* une liste des 7 meilleurs films de la catégorie Animation
* une liste des 7 meilleurs films de la catégorie Biographie

Un carroussel donne la possibilité de naviguer dans chacune des listes

## Fonctionnement

* Le programme est écrit en html5, css3 et Javascript
* Il utilise une API REST: OCMovies-API-EN-FR

## API OCMovies-API

* Concernant l'installation de l'API, suivez les instructions données dans le repository Guthub :
[dépôt de OCMovies-API-EN-FR](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
* Puis lancez le serveur : pipenv run python manage.py runserver

## Installation

* Testé sur les navigateurs Edge, Chrome et Firefox
* L'API tourne par défaut sur le port 8000
* Ouvrez le fichier index.html en local depuis votre navigateur favori
