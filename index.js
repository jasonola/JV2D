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
    let show_img = function(index){
        let img = document.createElement("img")
        img.src = donnees[index].image
        img.width = 300
        img.height = 300
        document.body.appendChild(img)
    }
    
    show_img(0)
    show_img(1)
})