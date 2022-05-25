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
            document.getElementById("resultado").innerHTML = html,
            document.getElementById("resultado").style.color = "white"
            document.getElementById("resultado").style.fontFamily = "Roboto flex"
            document.getElementById("resultado").style.listStyleType = "none"
            document.getElementById("resultado").style.display = "flex"
            document.getElementById("resultado").style.justifyContent = "center"
            document.getElementById("resultado").style.fontSize = "35px"
        })
  }
