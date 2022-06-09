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

    let choiceWrapper = document.querySelector(".choiceWrapper")

    let show_mult_img = function(array){
        //choiceWrapper.removeChild("img")
        for (let i = 0; i < array.length; i++) {
            //show_img(array[i])
            let card = document.createElement("div")
            card.setAttribute("class","card")
            let img = document.createElement("img")
            img.src = donnees[array[i]].image
            img.width = 300
            img.height = 300
            choiceWrapper.appendChild(card)
            card.appendChild(img)    
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
    button.addEventListener("click", function(){
        while (choiceWrapper.firstChild) {
            choiceWrapper.firstChild.remove()
        }
        show_mult_img(randomThreeNum(0,donnees.length))})
    document.body.appendChild(button)
  
})