const mainURL = "http://localhost:8000/api/v1/titles/"

//--- Gestion du meilleur film ---\\
async function getBest() {
    // Récupération des informations de l'API
    const response = await fetch(mainURL + "?sort_by=-imdb_score");
    const data = await response.json();
    // Récupération du détail du meilleur film
    const best = await fetch(data["results"][0]["url"])
    const dataBest = await best.json()
    // Affichage des informations dans le HTML
    document.getElementById("best-title").innerText = dataBest.title;
    document.getElementById("best-picture").src = dataBest.image_url;
    document.getElementById("best-description").innerText = dataBest.description;
    const bestModalBtn = document.getElementsByClassName("modal-btn")[0];
    bestModalBtn.setAttribute("onclick", `openModal(${dataBest.id})`);
};

