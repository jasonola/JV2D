// Importer les 2 jeux de données
d3.tsv("valeurs_nutritives.tsv", function(d){
    return {
        repas : d["titre bouffe"],
        sodium : +d["sodium (mg)"],
        gras : +d["matière grasse (g)"],
        glucides : +d["glucides (g)"],
        estPtitDej : +d["petit dej"],
        estRepas : +d["repas"],
        calories : +d["calories"],
        image : d["image"]

    }
}).then(donnees => {
    d3.tsv("accompagnant.tsv", function(d){
        return {
            accompagnant : d["accompagnant"],
            sodium : +d["sodium(mg)"],
            gras : +d["matière grasse(g)"],
            glucides : +d["glucides(g)"],
            image : d["image"]
    
        }
    }).then(donnees_acc => {
        console.log("donnees",donnees)
        console.log("donnees accompagnement",donnees_acc)
        // Chercher les 2 balises HTML du index.html
        let game = document.querySelector(".game")
        let choiceWrapper = document.querySelector(".choiceWrapper")

        // Fonction pour afficher plusieurs images en cartes avec leur comportement
        let show_mult_img = function(array){
            // Boucle pour itérer autant de fois que la taille du array en argument 
            //(Ici prévu 3 images, car c'est le return de randomThreeNum quon va prendre ici)
            for (let i = 0; i < array.length; i++) {
                // Création de la carte
                let card = document.createElement("div")
                card.setAttribute("class","card")
                card.setAttribute("id", `card${i}`)
                // Création de l'image
                let img = document.createElement("img")
                img.setAttribute("class","food")
                img.src = donnees[array[i]].image
                img.width = 360
                img.height = 360
                // Création du texte sous l'image pour les infos
                let info = document.createElement("p")
                info.setAttribute("class","info")
                info.setAttribute("id", `info${i}`)
                // On entre le texte dynamiquement en fonction des données
                info.innerHTML = `Menu : ${donnees[array[i]].repas}<br>
                                Sodium : ${donnees[array[i]].sodium} (mg)<br>
                                Matière grasse : ${donnees[array[i]].gras} (g)<br>
                                Glucides : ${donnees[array[i]].glucides} (g)`
                // On ajoute un evenement au cas ou on clique, on efface le contenu précédent s'il y en avait 
                // et on rajoute 3 images denouveau
                img.addEventListener("click", function(){
                    while (choiceWrapper.firstChild) {
                        choiceWrapper.firstChild.remove()
                    }
                    show_mult_img(randomThreeNum(0,donnees.length))
                })
                // Ajouter les balises sous les parents
                choiceWrapper.appendChild(card)
                card.appendChild(img)    
                card.appendChild(info)
            }
        }
        // Fonction de selection aléatoire de 3 chiffres
        let randomThreeNum = function (min, max) { 
            let n = []; 
            for(let i=0;i<3;i++){ 
            n.push(Math.floor(Math.random() * max) + min); 
            } 
            return n; 
            } 
        
        // Créer le bouton pour commencer le jeu qu'on met dans un div pour ensuite le centrer dans CSS
        let button = document.createElement("button")
        button.innerHTML = "Start game !"
        button.addEventListener("click", function(){
            show_mult_img(randomThreeNum(0,donnees.length))
            button.style.display = "none"
        })
        let buttonWrapper = document.createElement("div")
        buttonWrapper.setAttribute("class", "buttonWrapper")
        game.appendChild(buttonWrapper)
        buttonWrapper.appendChild(button)
  
})})