// Haciendo FETCH

document.getElementById("jsonBtn").addEventListener("click",cargarJson)

function cargarJson (){
    fetch('frases.json')
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            let html = ''
            data.forEach(function(frase){
                html += `<li>${frase.frase}</li>`
            })
            document.getElementById("resultado").innerHTML = html
        })
}






