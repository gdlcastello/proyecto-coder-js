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

      let nuevoProductoCargado = document.createElement('li');
      nuevoProductoCargado.innerHTML = '<span class="nombre">' + productName + '</span> - <span class="precio">' + productPrice + '</span>' +
        '<input class="cantidad" type="number" value="1" min="1">';

      // Agregar un botón "Eliminar" al nuevo producto cargado
      let eliminarButton = document.createElement('button');
      eliminarButton.innerText = 'Eliminar';
      eliminarButton.addEventListener('click', function(event) {
        event.target.parentNode.remove();
        // Actualizar el importe total después de eliminar el producto
        let subtotalTexto = nuevoProductoCargado.querySelector('.subtotal').innerText.match(/(\d+)/)[0];
        total -= parseInt(subtotalTexto);
        console.log('Importe total de la compra: $' + total);
        // Eliminar el producto del arreglo productosSeleccionados
        productosSeleccionados = productosSeleccionados.filter(function(producto) {
          return producto.nombre !== productName;
        });
      });
      nuevoProductoCargado.appendChild(eliminarButton);

      productosCargados.appendChild(nuevoProductoCargado);

      // Agregar el producto al arreglo productosSeleccionados
      let producto = {
        nombre: productName,
        precio: parseInt(productPrice)
      };
      productosSeleccionados.push(producto);

      // Actualizar el importe total después de agregar un nuevo producto
      total += parseInt(productPrice);
      console.log('Importe total de la compra: $' + total);

      // Mostrar los productos seleccionados
      console.log('Productos seleccionados:');
      productosSeleccionados.forEach(function(producto, index) {
        console.log('Producto ' + (index + 1) + ': ' + producto.nombre + ' - $' + producto.precio);
      });

      // Agregar el evento de cambio a los campos de cantidad
      let inputCantidad = nuevoProductoCargado.querySelector('.cantidad');
      inputCantidad.addEventListener('change', actualizarCantidad);
    });
  });
}

// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidad(event) {
  let inputCantidad = event.target;
  let item = inputCantidad.parentNode;
  let precioElement = item.querySelector('.precio');
  let precioTexto = precioElement.innerText.match(/(\d+)/)[0];
  let precio = parseInt(precioTexto);
  let nuevaCantidad = parseInt(inputCantidad.value);
  let subtotalElement = item.querySelector('.subtotal');
  let subtotal = nuevaCantidad * precio;

  subtotalElement.innerText = 'Subtotal: $' + subtotal;

  // Recalcular el importe total después de actualizar la cantidad
  total = 0;
  let itemsCarrito = productosCargados.querySelectorAll('li');
  itemsCarrito.forEach(function(item) {
    let subtotalTexto = item.querySelector('.subtotal').innerText.match(/(\d+)/)[0];
    total += parseInt(subtotalTexto);
  });
  console.log('Importe total de la compra: $' + total);
}

// Búsqueda por nombre
let botonBusqueda = document.getElementById('btn-buscar');
botonBusqueda.addEventListener('click', function() {
  let terminoBusqueda = document.getElementById('input-busqueda').value;
  let resultadosBusqueda = productosDisponibles.filter(function(producto) {
    return producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
  });

  console.log('Resultados de la búsqueda:');
  resultadosBusqueda.forEach(function(producto) {
    console.log('Nombre: ' + producto.nombre + ', Precio: $' + producto.precio);
  });
});

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

// Agregar evento de clic al botón "Calcular Total"
let btnCalcularTotal = document.getElementById('btn-calcular-total');
btnCalcularTotal.addEventListener('click', calcularTotal);
