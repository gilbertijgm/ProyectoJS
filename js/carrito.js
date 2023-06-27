let productoEnCarrito = localStorage.getItem("producto-en-carrito");
productoEnCarrito = JSON.parse(productoEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const btnVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const btnComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito(){

    if(productoEnCarrito && productoEnCarrito.length > 0){
    
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        //mostrar los productos en el html
        productoEnCarrito.forEach(producto =>{
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.categoria.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        });
    
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    
    actualizarBtnDelet();
    actualizarTotal()
}

cargarProductosCarrito();

//funcion para eliminar productos de carrito
function actualizarBtnDelet(){
    btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    btnEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    let idBtn = e.currentTarget.id;

    const index = productoEnCarrito.findIndex(producto => producto.id === idBtn);

    productoEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("producto-en-carrito", JSON.stringify(productoEnCarrito));

    //agregando libreria toastifyJS
    Toastify({
        text: "Producto eliminado del carrito",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        style: {
          background: "linear-gradient(to right, #ac3131, #f50606)",
          borderRadius: "2rem",
          fontSize: "0.85rem"
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

btnVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    productoEnCarrito.length = 0;
    localStorage.setItem("producto-en-carrito", JSON.stringify(productoEnCarrito));
    cargarProductosCarrito();
}


//calcular el total de la compra 
function actualizarTotal(){
    const totalCalculado =
    productoEnCarrito.reduce((acumulador, producto) => acumulador +(producto.precio * producto.cantidad), 0);
    
    total.innerText = `$${totalCalculado}`;
     
}

//boton compra
btnComprar.addEventListener("click", comprarCarrito);

function comprarCarrito(){
    productoEnCarrito.length = 0;
    localStorage.setItem("producto-en-carrito", JSON.stringify(productoEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}
