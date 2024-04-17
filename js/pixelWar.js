const careeDePixellien = "https://pixel-api.codenestedu.fr/tableau";
const uidLien = "https://pixel-api.codenestedu.fr/choisir-equipe";
const envoyerInfo = document.getElementById("buttonSubmit");
let currentTeam = null;

const tab = document.getElementById("table");
fetch(careeDePixellien)
    .then(reponse => reponse.json())
    .then(data => {
        data.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.style.backgroundColor = cell;
                tr.appendChild(td);
            })
            tab.appendChild(tr);
        });
    })
    .catch(
        new Error("mauvais lien")
    );

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
            if (!response.ok) {
                const errorMsg = await response.json();
                document.getElementById("console").textContent = errorMsg.msg;
                throw new Error("Erreur serveur : " + errorMsg.msg);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error(error.message));
});

document.querySelector("#buttonTeam1").addEventListener("click", (event) => {
    currentTeam = 0;
    console.log(event);
    document.getElementById("buttonTeam1").style.backgroundColor = 'red';
    document.getElementById("buttonTeam2").style.backgroundColor = 'white';
    document.getElementById("buttonTeam3").style.backgroundColor = 'white';
    document.getElementById("buttonTeam4").style.backgroundColor = 'white';
});

document.getElementById("buttonTeam2").addEventListener("click", () => {
    currentTeam = 1;
    document.getElementById("buttonTeam1").style.backgroundColor = 'white';
    document.getElementById("buttonTeam2").style.backgroundColor = 'red';
    document.getElementById("buttonTeam3").style.backgroundColor = 'white';
    document.getElementById("buttonTeam4").style.backgroundColor = 'white';
});

document.getElementById("buttonTeam3").addEventListener("click", () => {
    currentTeam = 2;
    document.getElementById("buttonTeam1").style.backgroundColor = 'white';
    document.getElementById("buttonTeam2").style.backgroundColor = 'white';
    document.getElementById("buttonTeam3").style.backgroundColor = 'red';
    document.getElementById("buttonTeam4").style.backgroundColor = 'white';
});

document.getElementById("buttonTeam4").addEventListener("click", () => {
    currentTeam = 3;
    document.getElementById("buttonTeam1").style.backgroundColor = 'white';
    document.getElementById("buttonTeam2").style.backgroundColor = 'white';
    document.getElementById("buttonTeam3").style.backgroundColor = 'white';
    document.getElementById("buttonTeam4").style.backgroundColor = 'red';
});





/*
const uidVerification = () =>{
    fetch(uidLien)
    .then(reponse => reponse.json())
    .then(data =>{
        const existe = false;
        data.forEach(uid =>{
            if(uid == document.getElementById("Idd").value){
                existe = true;
            }
        })
        if(!existe){
            alert("uid inexistant");
            return new Error("ce n'est pas un uid existant")
        }
    })
    .catch(
        new Error("mauvais lien")
    );
};
*/