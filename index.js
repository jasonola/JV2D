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
        let game = document.querySelector(".game")
        let choiceWrapper = document.querySelector(".choiceWrapper")

        let show_mult_img = function(array){
            for (let i = 0; i < array.length; i++) {
                let card = document.createElement("div")
                card.setAttribute("class","card")
                card.setAttribute("id", `card${i}`)
                let img = document.createElement("img")
                img.setAttribute("class","food")
                img.src = donnees[array[i]].image
                img.width = 360
                img.height = 360
                let info = document.createElement("p")
                info.setAttribute("class","info")
                info.setAttribute("id", `info${i}`)
                info.innerHTML = `Menu : ${donnees[array[i]].repas}<br>
                                Sodium : ${donnees[array[i]].sodium} (mg)<br>
                                Matière grasse : ${donnees[array[i]].gras} (g)<br>
                                Glucides : ${donnees[array[i]].glucides} (g)`
                img.addEventListener("click", function(){
                    while (choiceWrapper.firstChild) {
                        choiceWrapper.firstChild.remove()
                    }
                    show_mult_img(randomThreeNum(0,donnees.length))
                })
                choiceWrapper.appendChild(card)
                card.appendChild(img)    
                card.appendChild(info)
            }
        }
        let randomThreeNum = function (min, max) { 
            let n = []; 
            for(let i=0;i<3;i++){ 
            n.push(Math.floor(Math.random() * max) + min); 
            } 
            return n; 
            } 
        
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