document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("subreddits")) {
        fetch("https://www.reddit.com/subreddits/popular.json")
            .then(response => response.json())
            .then(data => {
                let subredditsDiv = document.getElementById("subreddits");
                data.data.children.forEach(sub => {
                    let subreddit = sub.data;
                    let card = document.createElement("div");
                    card.className = "subreddit-card";

                    // Obține URL-ul imaginii
                    let imageUrl = subreddit.icon_img || subreddit.community_icon;

                    // Verifică dacă URL-ul imaginii există și este valid
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = `https://www.reddit.com${imageUrl}`; // Completează URL-ul dacă este relativ
                    }

                    // Construiește conținutul cardului
                    card.innerHTML = `
                        <h3>${subreddit.title}</h3>
                        ${imageUrl ? `<img src="${imageUrl}" alt="${subreddit.title}" style="width:100px;height:100px;">` : ''}
                        <p>${subreddit.public_description}</p>
                        <a href="https://www.reddit.com${subreddit.url}" target="_blank">
                            <button>Vizitează subreddit</button>
                        </a>
                    `;

                    // Adaugă cardul în div-ul principal
                    subredditsDiv.appendChild(card);
                });
            })
            .catch(error => console.error("Eroare la preluarea datelor de la Reddit:", error));
    }
});
function redirectToPage2() {
    window.location.href = "pagina2.html"; // Redirecționează către pagina2.html
}

function redirectToReddit() {
    window.open("https://www.reddit.com/", "_blank"); // Deschide Reddit într-un tab nou
}