d3.tsv("valeurs_nutritives.tsv", function(d){
    return {
        repas : d["titre bouffe"],
        sodium : +d["sodium (mg)"],
        gras : +d["matière grasse (g)"],
        glucides : +d["glucides (g)"],
        estPtitDej : +d["petit dej"],
        estRepas : +d["repas"],
        image : d["image"]

    }
}).then(donnees => {
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
            img.width = 300
            img.height = 300
            let info = document.createElement("p")
            info.setAttribute("class","info")
            info.setAttribute("id", `info${i}`)
            info.innerHTML = "test"
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
    function randomThreeNum(min, max) { 
        let n = []; 
        for(let i=0;i<3;i++){ 
        n.push(Math.floor(Math.random() * max) + min); 
        } 
        return n; 
        } 
    
    let button = document.createElement("button")
    button.innerHTML = "Start game !"
    button.addEventListener("click", function(){
        while (choiceWrapper.firstChild) {
            choiceWrapper.firstChild.remove()
        }
        show_mult_img(randomThreeNum(0,donnees.length))
        button.style.display = "none"
    })
    game.appendChild(button)
  
})