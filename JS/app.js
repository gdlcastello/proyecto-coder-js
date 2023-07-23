console.log("Está conectado");
alert("Estamos online");

let productosCargados = document.getElementById('productos-carrito');
let productosDisponibles = [];
let productosSeleccionados = [];
let total = 0;

// Función para cargar los productos desde el archivo JSON
function cargarProductosDesdeJSON() {
  fetch('json/productos.json') // Ruta relativa al archivo productos.json
    .then(response => response.json())
    .then(data => {
      productosDisponibles = data;
      console.log('Productos cargados desde JSON:', productosDisponibles);
      inicializarCarrito();
    })
    .catch(error => {
      console.error('Error al cargar productos desde JSON:', error);
    });
}

// Llama a la función para cargar los productos al iniciar la página
cargarProductosDesdeJSON();

// Función para inicializar el carrito y agregar los eventos de clic para los botones
function inicializarCarrito() {
  // Botón agregar al carrito para agregar nuevos productos
  let addToCartButtons = document.querySelectorAll('#opciones-productos li button');

  // Función de clic para los botones
  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      let product = event.target.parentNode;
      let productName = product.querySelector('h3').innerText;
      let productPrice = product.querySelector('.precio').innerText.match(/(\d+)/)[0];

      let producto = {
        nombre: productName,
        precio: parseInt(productPrice)
      };
      agregarProductoAlCarrito(producto);
    });
  });

  // Agregar evento de clic al botón de búsqueda
  let btnBuscar = document.getElementById('btn-buscar');
  btnBuscar.addEventListener('click', buscarProducto);
}

// Función para actualizar el importe total después de eliminar o agregar un producto al carrito
function actualizarTotal() {
  total = 0;
  let itemsCarrito = productosCargados.querySelectorAll('li');

  // Iterar sobre los productos cargados en el carrito
  itemsCarrito.forEach(function (item) {
    let importeTexto = item.querySelector('.precio').innerText.match(/(\d+)/)[0];
    let importe = parseInt(importeTexto);
    let cantidadElement = item.querySelector('.cantidad');

    if (cantidadElement) {
      let cantidad = parseInt(cantidadElement.value);
      let subtotal = importe * cantidad;
      total += subtotal;
    } else {
      total += importe; // Sumar solo el importe del producto
    }
  });

  console.log('Importe total de la compra: $' + total);

  // Actualizar el recuadro con el importe total
  let importeTotalElement = document.getElementById('importe-total');
  importeTotalElement.textContent = 'Importe Total: $' + total;
}

// Función para buscar productos por nombre
function buscarProducto() {
  let terminoBusqueda = document.getElementById('input-busqueda').value.toLowerCase();
  let resultadosBusqueda = productosDisponibles.filter(function(producto) {
    return producto.nombre.toLowerCase().includes(terminoBusqueda);
  });

  // Mostrar los resultados en el DOM
  let resultadosContainer = document.getElementById('resultados-busqueda');
  resultadosContainer.innerHTML = '';
  resultadosBusqueda.forEach(function(producto) {
    let productoEncontrado = document.createElement('div');
    productoEncontrado.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="btn-agregar-carrito">Agregar al carrito</button>
    `;
    let btnAgregarCarrito = productoEncontrado.querySelector('.btn-agregar-carrito');
    btnAgregarCarrito.addEventListener('click', function() {
      agregarProductoAlCarrito(producto);
    });
    resultadosContainer.appendChild(productoEncontrado);
  });
}

// Función para calcular el importe total de la compra
function calcularTotal() {
  total = 0;
  let itemsCarrito = productosCargados.querySelectorAll('li');

  // Iterar sobre los productos cargados en el carrito
  itemsCarrito.forEach(function (item) {
    let importeTexto = item.querySelector('.precio').innerText.match(/(\d+)/)[0];
    let importe = parseInt(importeTexto);
    let cantidadElement = item.querySelector('.cantidad');

    if (cantidadElement) {
      let cantidad = parseInt(cantidadElement.value);
      let subtotal = importe * cantidad;
      total += subtotal;
    } else {
      total += importe; // Sumar solo el importe del producto
    }
  });

  console.log('Importe total de la compra: $' + total);

  // Actualizar el recuadro con el importe total
  let importeTotalElement = document.getElementById('importe-total');
  importeTotalElement.textContent = 'Importe Total: $' + total;
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(producto) {
  let nuevoProductoCargado = document.createElement('li');
  nuevoProductoCargado.innerHTML = `
    <span class="nombre">${producto.nombre}</span> - <span class="precio">$${producto.precio}</span>
    <input class="cantidad" type="number" value="1" min="1">
    <button class="btn-eliminar-producto">Eliminar</button>
  `;

  // Agregar evento de clic para eliminar el producto del carrito
  let btnEliminarProducto = nuevoProductoCargado.querySelector('.btn-eliminar-producto');
  btnEliminarProducto.addEventListener('click', function() {
    nuevoProductoCargado.remove();
    actualizarTotal();
  });

  productosCargados.appendChild(nuevoProductoCargado);
  actualizarTotal();
}

// Agregar evento de clic al botón "Calcular Total"
let btnCalcularTotal = document.getElementById('btn-calcular-total');
btnCalcularTotal.addEventListener('click', calcularTotal);
