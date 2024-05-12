const careeDePixellien = "https://pixel-api.codenestedu.fr/tableau";
const uidLien = "https://pixel-api.codenestedu.fr/choisir-equipe";
const envoyerInfo = document.getElementById("buttonSubmit");
let currentTeam = null;
const tab = document.getElementById("table");
let VeuxAfficherTabJoueur = false;


/**
 * fait toute les modification nécessaire pour le passage a l'équipe 1
 */
document.getElementById("buttonTeam1").addEventListener("click", (event) => {
    currentTeam = 1;
    console.log(event);
    document.getElementById("buttonTeam1").style.backgroundColor = 'red';
    document.getElementById("buttonTeam2").style.backgroundColor = 'white';
    document.getElementById("buttonTeam3").style.backgroundColor = 'white';
    document.getElementById("buttonTeam4").style.backgroundColor = 'white';
});

/**
 * fait toute les modification nécessaire pour le passage a l'équipe 2
 */
document.getElementById("buttonTeam2").addEventListener("click", () => {
    currentTeam = 2;
    document.getElementById("buttonTeam1").style.backgroundColor = 'white';
    document.getElementById("buttonTeam2").style.backgroundColor = 'red';
    document.getElementById("buttonTeam3").style.backgroundColor = 'white';
    document.getElementById("buttonTeam4").style.backgroundColor = 'white';
});

/**
 * fait toute les modification nécessaire pour le passage a l'équipe 3
 */
document.getElementById("buttonTeam3").addEventListener("click", () => {
    currentTeam = 3;
    document.getElementById("buttonTeam1").style.backgroundColor = 'white';
    document.getElementById("buttonTeam2").style.backgroundColor = 'white';
    document.getElementById("buttonTeam3").style.backgroundColor = 'red';
    document.getElementById("buttonTeam4").style.backgroundColor = 'white';
});

/**
 * fait toute les modification nécessaire pour le passage a l'équipe 4
 */
document.getElementById("buttonTeam4").addEventListener("click", () => {
    currentTeam = 4;
    document.getElementById("buttonTeam1").style.backgroundColor = 'white';
    document.getElementById("buttonTeam2").style.backgroundColor = 'white';
    document.getElementById("buttonTeam3").style.backgroundColor = 'white';
    document.getElementById("buttonTeam4").style.backgroundColor = 'red';
});



/**
 * Fait apparaitre le carre de pixel 
 */
const fetchcarredepixel = () =>{
    tab.innerHTML = "";
    fetch(careeDePixellien)
    .then(reponse => reponse.json())
    .then(data => {
        data.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.style.backgroundColor = cell;
                td.addEventListener("click",(event)=>{
                    ChangerCouleurPixel(event);
                });
                tr.appendChild(td);
            })
            tab.appendChild(tr);
        });
    })
    .catch(
        new Error("mauvais lien")
    );
}


setInterval(()=>{
    fetchcarredepixel();
},5000);

/**
 * envoie le formulaire au serveur avec l'uid de la personne et son équipe choisis
 */
envoyerInfo.addEventListener("click", () => {
    if (currentTeam === null) {
        return alert("choisissez une équipe")
    }
    const u = {
        uid: document.getElementById("Idd").value,
        nouvelleEquipe: currentTeam
    };
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(u)
    };
    fetch(uidLien, options)
        .then(async response => {
            const ConsoleMsg = await response.json();
            document.getElementById("console").textContent = ConsoleMsg.msg;
            if (!response.ok) {
                throw new Error("Erreur serveur : " + ConsoleMsg.msg);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error(error.message));
});


/**
 * change le pixel séléctionner dans le tableau en fonction de la couleur choisis
 */
const ChangerCouleurPixel = (event) => {
    const color = document.getElementById("ChoixCouleur").value;
    const selectedCell = event.target;
    const id = document.getElementById("Idd").value;

    const data = {
        color: color,
        uid: id,
        col: selectedCell.cellIndex,
        row: selectedCell.parentNode.rowIndex
    };

    const option = {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }

    fetch('https://pixel-api.codenestedu.fr/modifier-case',option)
    .then(async response => {
        const ConsoleMsg = await response.json();
        document.getElementById("console").textContent = ConsoleMsg.msg;
        if (!response.ok) {
            throw new Error("Erreur serveur : " + ConsoleMsg.msg);
        }
        return response.json();
    })
    .then(data => {
        
        console.log('Réponse de l\'API:', data);
        TempsAttente();
    })
    .catch((error) =>{
        console.error('Erreur lors de l\'envoie de la requete:',error);
    })
}


/**
 * Methode verifiant et affichant le temps d'attente
 */

const TempsAttente = () => {
    const nodeUid = document.getElementById("Idd");
    const temps = document.getElementById('TpsModif')

    fetch(`https://pixel-api.codenestedu.fr/temps-attente?uid=${nodeUid.value}`)
    .then(response => {
        if (!response.ok) {
                throw new Error(data.error);
        } return response.json();
    })

    .then(data =>{
        console.log(data);
        temps.textContent = 'Temps d\'attente :',data.tempsAttente;
    })

    .catch(error => {
        console.error('Erreur lors de la requete:',error)
    })
}

/**
 * Méthode pour afficher le tableau des participant recent
 */
document.getElementById("printTab").addEventListener('click', () =>{
    VeuxAfficherTabJoueur = true;
    afficherTabJoueur();
})

const afficherTabJoueur = () =>{
    const table = document.getElementById("tabledejoueur");
    let trTab = document.querySelectorAll("#tabledejoueur tr");

    for(let i = trTab.length - 1; i > 0 ; i--){
        trTab[i].remove();
    }
    if(VeuxAfficherTabJoueur){
        document.getElementById("tabledejoueur").style.display = "block";
    }
    fetch(`https://pixel-api.codenestedu.fr/liste-joueurs?uid=${document.getElementById("Idd").value}`)

    .then(response => response.json())

    .then(data =>{
        data.forEach(personne => {
            const tr = document.createElement("tr");
            const tdnom = document.createElement("td");
            const tdlasteModification = document.createElement("td");
            const tdbanned = document.createElement("td");
            const tdnbPixel = document.createElement("td");
            tdnom.textContent = personne.nom;
            tdbanned.textContent = personne.banned;
            tdlasteModification.textContent = personne.lastModificationPixel;
            tdnbPixel.textContent = personne.nbPixelsModifies;
            tdnom.style.border = "solid 2px rgb(150, 19, 148)";
            tdbanned.style.border = "solid 2px rgb(150, 19, 148)";
            tdlasteModification.style.border = "solid 2px rgb(150, 19, 148)";
            tdnbPixel.style.border = "solid 2px rgb(150, 19, 148)";
            tr.appendChild(tdnom);
            tr.appendChild(tdlasteModification);
            tr.appendChild(tdbanned);
            tr.appendChild(tdnbPixel);
            table.appendChild(tr);
        })
    });
}

fetchcarredepixel();