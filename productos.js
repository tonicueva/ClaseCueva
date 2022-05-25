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
const neonCinco = new Neones (5,"Tesla","Blanco",40,3800,"../assets/tesla.jpg");
const neonSeis = new Neones (6,"Tesla","Blanco",80,7000,"../assets/tesla.jpg");
const neonSiete = new Neones (7,"Happy Hour","Amarillo y Rosa",50,3600,"../assets/happyhour.jpg");
const neonOcho = new Neones (8,"Conejo","Rojo",50,3500,"../assets/conejo.jpg");
const neonNueve = new Neones (9,"Conejo","Rojo",100,6750,"../assets/conejo.jpg");
const neonDiez = new Neones (10,"Espada","Rojo",35,2400,"../assets/espada.jpg");
const neonOnce = new Neones (11,"Espada","Rojo",70,4600,"../assets/espada.jpg");



// Pusheo los objetos al array
arrayProductos.push(neonUno);
arrayProductos.push(neonDos);
arrayProductos.push(neonTres);
arrayProductos.push(neonCuatro);
arrayProductos.push(neonCinco);
arrayProductos.push(neonSeis);
arrayProductos.push(neonSiete);
arrayProductos.push(neonOcho);
arrayProductos.push(neonNueve);
arrayProductos.push(neonDiez);
arrayProductos.push(neonOnce);

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
                            <p> ${i.tamanio} cm </p>
                            <h6>Precio: $${i.precio}</h6>
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
        document.getElementById(`und${masDeUnaUnidad.id}`).innerHTML = `<h4 class="elementoModal" id="und${masDeUnaUnidad.id}">Unidad: ${masDeUnaUnidad.unidad}</h4>`
        // Toastify de Agregado
        Toastify({
            text: "Agregado al carrito!",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #BCA5FF, #FF0000)",
            }
            }).showToast();
// Fin Toastify
    }else{
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

    
}

// Función para mostrar el carrito (MODAL)
function mostrarCarrito(productoAgregar){
    let div = document.createElement("div")
    div.innerHTML = `
            <h4 class="elementoModal">${productoAgregar.forma}</h3>
            <h4 class="elementoModal">Tamaño: ${productoAgregar.tamanio} cm </h4>
            <h4 class="elementoModal">Precio: $${productoAgregar.precio}</h4>
            <h4 class="elementoModal" id="und${productoAgregar.id}">Unidad: ${productoAgregar.unidad}</h4>
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
let cantidadNeonesPersonalizados = 0

function fnGuardarProductoPersonalizado(){
    // Toastify de Agregado
    Toastify({
        text: "Agregado al carrito!",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #BCA5FF, #FF0000)",
          }
        }).showToast();

    cantidadNeonesPersonalizados = cantidadNeonesPersonalizados + 1

    let altoEnCm = parseInt(document.getElementById("altoEnCm").value)
    let anchoEnCm = parseInt(document.getElementById("anchoEnCm").value)
    let precioAproximado = (altoEnCm * anchoEnCm) * 5

    let neonPers = new Neones (arrayProductos.length+1,"Neón personalizado " + cantidadNeonesPersonalizados,(document.getElementById("inputColor").value),altoEnCm*anchoEnCm,precioAproximado,"No hay imagen")
    arrayProductos.push(neonPers)
    arrayCarrito.push(neonPers)


    mostrarCarrito(neonPers)

    // Cierro el MODAL Personalizado
    document.getElementById("formaNeonPersonalizado").value = ''
    document.getElementById("inputColor").value = ''
    document.getElementById("altoEnCm").value = ''
    document.getElementById("anchoEnCm").value = ''

    let precioAproximadoParaHtml = document.getElementById("precioAproximadoParaHtml")
    precioAproximadoParaHtml.innerText = ``
    let contenidoDelModalPersonalizado = document.getElementById("contenidoDelModalPersonalizado")
    contenidoDelModalPersonalizado.style.height = "30em"

    fnCerrarModal()
}

//Para comprar y pagar con tarjeta

document.getElementById("botonCompra").addEventListener("click",fnAbrirModalCompra)
function fnAbrirModalCompra(){
    
    let modalPagar = document.getElementById("modalPagar")
    modalPagar.style.display = "block"
    let modalDeBs = document.getElementById("modalDeBs")
    modalDeBs.style.display = "none"
}

const tarjeta = document.getElementById("tarjeta")
const btnAbrirFormulario = document.getElementById("btn-abrir-formulario")
const formulario = document.getElementById("formulario-tarjeta")
const numeroTarjeta = document.querySelector('#tarjeta .numero')
const nombreTarjeta = document.querySelector('#tarjeta .nombre')
const logoMarca = document.getElementById("logo-marca")
const firma = document.querySelector('#tarjeta .firma p')
const mesExpiracion = document.querySelector('#tarjeta .mes')
const yearExpiracion = document.querySelector('#tarjeta .year')
const ccv = document.querySelector('#tarjeta .ccv')

const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

tarjeta.addEventListener('click',() => {
	tarjeta.classList.toggle('active');
});
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

const anioActual = new Date().getFullYear();
for(let i = anioActual; i <= anioActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

formulario.inputNumero.addEventListener('keyup', (i) => {
	let valorInput = i.target.value;
	formulario.inputNumero.value = valorInput
	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}
	if(valorInput[0] == 4){
		logoMarca.innerHTML = ''
		const imagen = document.createElement('img');
		imagen.src = '../assets/visa-logo.png';
        logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = '../assets/logo-Mastercard.png';
        logoMarca.appendChild(imagen);
	}
	mostrarFrente();
});

// Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (i) => {
	let valorInput = i.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Matías Aguirre';
	}
	mostrarFrente();
});

formulario.selectMes.addEventListener('change', (i) => {
	mesExpiracion.textContent = i.target.value;
	mostrarFrente();
});

formulario.selectYear.addEventListener('change', (i) => {
	yearExpiracion.textContent = i.target.value.slice(2);
	mostrarFrente();
});

formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	ccv.textContent = formulario.inputCCV.value;
});

let btnEnviar = document.getElementById("btnEnviar")
btnEnviar.addEventListener('click', fnComprado)
function fnComprado (){
    console.log(arrayCarrito)
     //Toastify de Compra
     Toastify({
        text: "Compra Exitosa",
        duration: 3000,
        style: {
            background: "linear-gradient(to left, #BCA5FF, #FF0000)",
          }
        }).showToast();
        let modalPagar = document.getElementById("modalPagar")
        modalPagar.style.display = "none"
}

