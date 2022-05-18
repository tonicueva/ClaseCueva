// Haciendo JavaScript de page "PRODUCTOS"

// Creo ARRAY de productos
const arrayProductos = []

// Creo ARRAY de carrito de compras
let arrayCarrito = []

// Creo CLASS para objetos
class Neones {
    constructor(id,forma,color,tamanio,precio,imagen){
        this.id = id;
        this.forma = forma;
        this.color = color;
        this.tamanio = tamanio;
        this.precio = precio;
        this.imagen = imagen;
    };
};

// Creo los objetos
const neonUno = new Neones (1,"Nike","Blanco",30,2400,"../assets/nike.jpg");
const neonDos = new Neones (2,"Nike","Rojo",30,2400,"../assets/nike.jpg");
const neonTres = new Neones (3,"Nike","Blanco",60,4500,"../assets/nike.jpg");
const neonCuatro = new Neones (4,"Nike","Blanco",120,8000,"../assets/nike.jpg");

// Pusheo los objetos al array
arrayProductos.push(neonUno);
arrayProductos.push(neonDos);
arrayProductos.push(neonTres);
arrayProductos.push(neonCuatro);

// Creo los NODOS de mi página PRODUCTOS
let contenedorProductos = document.getElementById("contenedorProductos");
let contenedorCarrito = document.getElementById("contenedorCarrito")
let precioTotal = document.getElementById("precioTotal")

// Función para mostrar productos
mostrarProductos(arrayProductos);

function mostrarProductos (array){
    // Para recorrer el array
    array.forEach(i =>{
        let section = document.createElement("section")
        section.className = "producto"
        // Uso de comillas simples para el innerHTML
        section.innerHTML += `  
            <div class="row">
                <div class="col-lg-4">
                    <div class="card" style="width: 18rem;">
                        <img src=${i.imagen} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title" style="color: black;">${i.forma}</h5>
                            <p class="card-text">${i.color}</p>
                            <a href="#" id = "agregar${i.id}" class="btn btn-primary">Agregar al carrito</a>
                        </div>
                    </div>
                </div>
            </div>
            `   // Uso comillas simples
        contenedorProductos.appendChild(section); //Lo agrego al HTML como hijo de "contenedorProductos"

    // Para independizar cada botón
    let btnAgregar = document.getElementById(`agregar${i.id}`) // Usar comillas simples
    
    // Creo el evento para cuando clickeo en "Agregar al carrito"
    btnAgregar.addEventListener("click", ()=>{
        agregarAlCarrito(i.id);
        })
    })
}

// Función para agregar productos al carrito a partir de el ID
function agregarAlCarrito(id){
// Busco si se repiten los productos (no terminado)
    let masDeUnaUnidad = arrayCarrito.find(i => i.id == id)
    if (masDeUnaUnidad){
        masDeUnaUnidad.unidad = masDeUnaUnidad.unidad + 1
    }
// Toastify de Agregado
    Toastify({
        text: "Agregado al carrito!",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #BCA5FF, #FF0000)",
          }
        }).showToast();
// Fin Toastify

// Busco el producto en mi array de productos a través de su ID
    let productoAgregar = arrayProductos.find(i => i.id == id)

    productoAgregar.unidad = 1
 //Lo agrego al carrito
    arrayCarrito.push(productoAgregar)
    costoTotal()
    mostrarCarrito(productoAgregar)

// Agrego la información al local storage
    localStorage.setItem("carrito",JSON.stringify(arrayCarrito))

    
}

// Función para mostrar el carrito (MODAL)
function mostrarCarrito(productoAgregar){
    let div = document.createElement("div")
    div.innerHTML = `
            <h4 class="elementoModal">${productoAgregar.forma}</h3>
            <h4 class="elementoModal">Tamaño: ${productoAgregar.tamanio} cm </h4>
            <h4 class="elementoModal">Precio: $${productoAgregar.precio}</h4>
            <h4 class="elementoModal" id="und${productoAgregar}">Unidad: ${productoAgregar.unidad}</h4>
            <img src="../assets/iconoX.png" id="borrar${productoAgregar.id}"  class="imgBorrarCarrito" alt="borrar">
    `
    contenedorCarrito.appendChild(div)
    costoTotal()
//  para borrar elemento del carrito
    let btnEliminar = document.getElementById(`borrar${productoAgregar.id}`)

    btnEliminar.addEventListener("click",()=>{
    
        //Toastify de Eliminación
        Toastify({
        text: "Producto eliminado",
        duration: 3000,
        style: {
            background: "linear-gradient(to left, #BCA5FF, #FF0000)",
          }
        }).showToast();
// Uso filter para crear nuevo array
        arrayCarrito = arrayCarrito.filter(i => i.id != productoAgregar.id)
// Elimino el producto de HTML
        btnEliminar.parentElement.remove()
        // Agrego la información al local storage
        localStorage.setItem("carrito",JSON.stringify(arrayCarrito))
        costoTotal()
    })
}
    


// Función para calcular el costo total
function costoTotal(){
    let total = document.getElementById("precioTotal")
    total.innerText = `
    $${arrayCarrito.reduce((acc,i)=> acc + i.precio, 0)}
    `
}

// Función para recuperar la información al refrescar la página con JSON y STORAGE

function recuperar(){
    let recuperarLS = JSON.parse(localStorage.getItem("carrito"))
    
// Utilizo operador AND
    recuperarLS && recuperarLS.forEach(i =>{
        arrayCarrito.push(i)
        mostrarCarrito(i)
    })
}

recuperar()

// Abrir Producto personalizado
let contenidoDelModalPersonalizado = document.getElementById("contenidoDelModalPersonalizado")


let productoPersonalizado = document.getElementById("productoPersonalizado")

productoPersonalizado.addEventListener("click",fnAbrirModal)

function fnAbrirModal(){
    contenidoDelModalPersonalizado.style.display = "block"
}

//Cerrar ventana Producto Personalizado
let cerrarModalPersonalizado = document.getElementById("cerrarModalPersonalizado")
cerrarModalPersonalizado.addEventListener("click",fnCerrarModal)

function fnCerrarModal(){
    contenidoDelModalPersonalizado.style.display = "none"
}

// Mostrar precio aproximado
let calcularPrecioAproximado = document.getElementById("calcularPrecioAproximado")
calcularPrecioAproximado.addEventListener("click",fnCalcularPrecioAproximado)


function fnCalcularPrecioAproximado(){
    let altoEnCm = parseInt(document.getElementById("altoEnCm").value)
    let anchoEnCm = parseInt(document.getElementById("anchoEnCm").value)
    let precioAproximado = (altoEnCm * anchoEnCm) * 5
    //Lo agrego al HTML
    let precioAproximadoParaHtml = document.getElementById("precioAproximadoParaHtml")
    precioAproximadoParaHtml.innerText = `$${precioAproximado}. Recordá que este es el precio de la seña. Al ser un neón personalizado, se puede cobrar 10% más o 10% menos dependiendo la complejidad`
    let contenidoDelModalPersonalizado = document.getElementById("contenidoDelModalPersonalizado")
    contenidoDelModalPersonalizado.style.height = "32.5em"
}


//Función agregar el Neón Personalizado al Carrito
let botonConfirmarPersonalizado = document.getElementById("botonConfirmarPersonalizado")
botonConfirmarPersonalizado.addEventListener("click",fnGuardarProductoPersonalizado)

function fnGuardarProductoPersonalizado(){
    // Toastify de Agregado
    Toastify({
        text: "Agregado al carrito!",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #BCA5FF, #FF0000)",
          }
        }).showToast();

    let altoEnCm = parseInt(document.getElementById("altoEnCm").value)
    let anchoEnCm = parseInt(document.getElementById("anchoEnCm").value)
    let precioAproximado = (altoEnCm * anchoEnCm) * 5

    let neonPers = new Neones (arrayProductos.length+1,"Personalizado",(document.getElementById("inputColor").value),altoEnCm*anchoEnCm,precioAproximado,"No hay imagen")
    arrayProductos.push(neonPers)
    arrayCarrito.push(neonPers)

    mostrarCarrito(neonPers)

    // Cierro el MODAL Personalizado
    fnCerrarModal()
}