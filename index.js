 //USANDO THREE.JS
 
 // Creo escena
 let escena = new THREE.Scene();
 // Creo cámara
     let camara = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight
        );
 // Creo renderer
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)

      document.body.appendChild(renderer.domElement)


 // Agrego geometría
 let geometry = new THREE.BoxGeometry()
 let material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
 let cubo = new THREE.Mesh(geometry, material)

 escena.add(cubo)

 camara.position.z = 5


 //Hago animación
 let animate = function(){
   requestAnimationFrame(animate)
   cubo.rotation.x += 0.01
   cubo.rotation.y += 0.01
   renderer.render(escena, camara)
 }
 animate()


















// USANDO THREE.JS

