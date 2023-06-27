

//datos que seran llamadss por el dom
const contenedorProductos = document.querySelector("#contenedor-productos");
const btnCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let btnAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

//funcion para mostrar los productos del array en el html

function cargarProductos(productos){

    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `   
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Añadir <i class="bi bi-cart-fill"></i></button>
        `;

        contenedorProductos.append(div); //tiene que ir dentro de la funcion RECORDATORIO
    })

    actualizarBtnAgg();
    
}

cargarProductos(productos);

//Creamos un eventlistener para que los se activen los botones del menu de navegacion

btnCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        //otro foreach para que se active un solo boton
        btnCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        //usamos un filter para filtrar los productos por categoria
        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id); //usamos find para que recorra el array y nos traiga el nombre de la categoria seleccionada
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton); //usamos la funcion cargar productos pero pasandole como parametro la constante que se uso para filtrar
        } else{
            tituloPrincipal.innerText = "todos los productos";
            cargarProductos(productos);
        }

    })
});


//Realizar una funcion para que actualize los botones cada vez que se actualize las muestra de productos

function actualizarBtnAgg(){
    btnAgregar = document.querySelectorAll(".producto-agregar");

    btnAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productoEnCarrito;

let productoEnCarritoLS = localStorage.getItem("producto-en-carrito");


if(productoEnCarritoLS){
    productoEnCarrito = JSON.parse(productoEnCarritoLS);
    actualizarNumerito();
}else{
    productoEnCarrito = [];
}



function agregarAlCarrito(e){

    const idBtn = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBtn); //usamos filter para filtrar el producto agregado y asi pushearlo al array de producto en carrito

    //realizamos un if con some para ver si ya existe un producto en el array productoEnCarrito y asi contalibilzar la cantidad del producto que vamos agregar
    if(productoEnCarrito.some(producto => producto.id === idBtn)){
        const index = productoEnCarrito.findIndex(producto => producto.id === idBtn);
        productoEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productoEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    //guardamos la info en el localStorage para llevarlo al carrito
    localStorage.setItem("producto-en-carrito", JSON.stringify(productoEnCarrito));
}

//funcion para que se actualize el numerito del carrito cada vez que agregamos un producto
function actualizarNumerito(){
    let nuevoNumerito =  productoEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}