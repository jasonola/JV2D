//still to do : better spread of points, figure out how to use calories

// Importer les 2 jeux de données
d3.tsv("valeurs_nutritives.tsv", function(d){
    return {
        repas : d["titre"],
        sodium : +d["sodium"],
        gras : +d["gras"],
        glucides : +d["glucides"],
        estPtitDej : +d["petit_dej"],
        estRepas : +d["repas"],
        calories : +d["calories"],
        image : d["image"],
        pts_sodium : +d["pts_sodium"],
        pts_gras : +d["pts_gras"],
        pts_glucides : +d["pts_glucides"]

    }
}).then(donnees => {
    d3.tsv("accompagnant.tsv", function(d){
        return {
            accompagnant : d["accompagnant"],
            sodium : +d["sodium"],
            gras : +d["gras"],
            glucides : +d["glucides"],
            calories : +d["calories"],
            image : d["image"],
            pts_sodium : +d["pts_sodium"],
            pts_gras : +d["pts_gras"],
            pts_glucides : +d["pts_glucides"]

        }
    }).then(donnees_acc => {

        counterCalories = 0
        counterSodium = 50
        counterGras = 50
        counterGlucide = 50

        counterPeriodeJour = 0
        counterJour = 0

        let game = document.querySelector(".game")
        let score = document.querySelector(".score")
        let periode = document.querySelector(".periode")


        let nutriments = donnees_acc.columns.slice(1,5)
        for (let i = 0; i < nutriments.length; i++) {
            let nutScore = document.createElement("span")
            let nutScoreLab = document.createElement("span")
            let nutScoreWrapper = document.createElement("div")
            nutScoreWrapper.setAttribute("class", "nutScoreWrapper")
            nutScore.setAttribute("id", nutriments[i])
            counterNut = 0
            nutScoreLab.innerHTML = `${nutriments[i]} : `
            nutScore.innerHTML = 50
            if(i == 3){
                nutScore.innerHTML = 0
            }
            nutScoreWrapper.appendChild(nutScoreLab)
            nutScoreWrapper.appendChild(nutScore)
            score.appendChild(nutScoreWrapper)
            
            
        }

        let caloriesScore = document.querySelector("#calories")
        let sodiumScore = document.querySelector("#sodium")
        let grasScore = document.querySelector("#gras")
        let glucidesScore = document.querySelector("#glucides")
        let nutScoreWrapper = document.querySelector(".nutScoreWrapper")

        //ajouter musique
        function playSound(soundfile){
            document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"true\"/>";
        }

        // Fonction pour afficher plusieurs images en cartes avec leur comportement
        let show_menus = function(array){
            
            if(counterGlucide <40){
                Swal.fire({
                    icon: 'error',
                    title: 'GAME OVER',
                    text: 'Pas assez de glucides',
                    footer: '<a href=url("fr.wikipedia.org/wiki/Glucide")>Sheh</a>'
                  }).then(function(){
                    window.location.reload()
                  })
            }

            let choiceWrapper = document.querySelector(".choiceWrapper")
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
                                Glucides : ${donnees[array[i]].glucides} (g)<br>
                                Calories : ${donnees[array[i]].calories}`

                
                // On ajoute un evenement au cas ou on clique, on efface le contenu précédent s'il y en avait 
                // et on rajoute 3 images denouveau

                img.addEventListener("click", function(){
                    while (choiceWrapper.firstChild) {
                        choiceWrapper.firstChild.remove()
                    }
                    
                    counterCalories += donnees[array[i]].calories
                    caloriesScore.innerHTML = counterCalories

                    counterSodium += donnees[array[i]].pts_sodium
                    sodiumScore.innerHTML = counterSodium
                    counterGlucide += donnees[array[i]].pts_glucides
                    glucidesScore.innerHTML = counterGlucide
                    counterGras += donnees[array[i]].pts_gras
                    grasScore.innerHTML = counterGras
                    
                    console.log("counterPeriodeJour",counterPeriodeJour)
                    console.log("counterJour",counterJour)

                    show_accomp(donnees_acc)
                })
                // Ajouter les balises sous les parents
                choiceWrapper.appendChild(card)
                card.appendChild(img)    
                card.appendChild(info)
            }
        }


//-----------------------------------------------------------------------------------------

        let show_accomp = function(data){

            if(counterGlucide <40){
                Swal.fire({
                    icon: 'error',
                    title: 'GAME OVER',
                    text: 'Pas assez de glucides',
                    footer: '<a href="fr.wikipedia.org/wiki/Glucide">Sheh</a>'
                  }).then(function(){
                    window.location.reload()
                  })
            }

            let choiceWrapper = document.querySelector(".choiceWrapper")
            for (let i = 0; i < data.length; i++) {
                let card = document.createElement("div")
                card.setAttribute("class","card")
                card.setAttribute("id", `card${i}`)
                // Création de l'image
                let img = document.createElement("img")
                img.setAttribute("class","food")
                img.src = data[i].image
                img.width = 250
                img.height = 250
                // Création du texte sous l'image pour les infos
                let info = document.createElement("p")
                info.setAttribute("class","info")
                info.setAttribute("id", `info${i}`)
                info.innerHTML = `Menu : ${data[i].accompagnant}<br>
                                Sodium : ${data[i].sodium} (mg)<br>
                                Matière grasse : ${data[i].gras} (g)<br>
                                Glucides : ${data[i].glucides} (g) <br>
                                Calories : ${data[i].calories}`   
                                
                // Comme on a maintenant 4 colonnes car 4 accompagnements, il faut changer la grid disposition
                choiceWrapper.style.gridTemplateColumns = "auto auto auto auto"
                choiceWrapper.appendChild(card)
               
                img.addEventListener("click", function(){
                    while (choiceWrapper.firstChild) {
                        choiceWrapper.firstChild.remove()
                    }
                    
                    
                    counterCalories += data[i].calories
                    caloriesScore.innerHTML = counterCalories

                    counterSodium += data[i].pts_sodium
                    sodiumScore.innerHTML = counterSodium
                    counterGlucide += data[i].pts_glucides
                    glucidesScore.innerHTML = counterGlucide
                    counterGras += data[i].pts_gras
                    grasScore.innerHTML = counterGras

                    
                    // utiliser le compteur de periode par jour pour faire les 3 repas et reinitialiser pour faire un nouveau jour
                    if(counterPeriodeJour == 3){
                        counterPeriodeJour = 1
                        counterJour++
                        caloriesScore.innerHTML = counterCalories

                        // Jolie alerte customisable quand on arrive a la fin de la journée
                        Swal.fire({
                            title: `Vous avez mangé pour <em>${counterCalories}</em> calories aujourd'hui !`,
                            width: 600,
                            padding: '3em',
                            color: "black",
                            background: '#fff url(picnic.png)'
                          })
                        counterCalories = 0
                        caloriesScore.innerHTML = counterCalories
                    }else{
                        counterPeriodeJour++
                    }
                    periode.innerHTML = `Jour ${counterJour}, periode ${counterPeriodeJour}`

                    show_menus(randomThreeNum(0,donnees.length))
                })
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
        
        let instructions = document.querySelector(".instructions")

        // Créer le bouton pour commencer le jeu qu'on met dans un div pour ensuite le centrer dans CSS
        let button = document.createElement("button")
        button.innerHTML = "START GAME !"
        button.addEventListener("click", function(){
            counterJour++
            counterPeriodeJour++
            periode.innerHTML = `Jour ${counterJour}, periode ${counterPeriodeJour}`
            show_menus(randomThreeNum(0,donnees.length))
            //on supprime le bouton apres le click
            button.style.display = "none"
            instructions.style.display = "none"
        })
        let buttonWrapper = document.createElement("div")
        buttonWrapper.setAttribute("class", "buttonWrapper")
        game.appendChild(buttonWrapper)
        buttonWrapper.appendChild(button)
  
    
})})