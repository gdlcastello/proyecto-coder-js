console.log("Está conectado");
alert("Estamos online");

let storedData = localStorage.getItem("userData");
let userData = {};

if (storedData) {
  userData = JSON.parse(storedData);
}

if (userData.nombre && userData.apellido) {
  console.log("Hola " + userData.nombre + " " + userData.apellido);
} else {
  let nombre = prompt("Ingrese su nombre:");
  let apellido = prompt("Ingrese su apellido:");

  let nombreValido = nombre.length >= 4;
  let apellidoValido = apellido.length >= 4;

  if (nombreValido && apellidoValido) {
    userData.nombre = nombre;
    userData.apellido = apellido;
    localStorage.setItem("userData", JSON.stringify(userData));

    console.log("Hola " + nombre + " " + apellido);
  } else {
    alert("Nombre o apellido no son válidos");
  }
}

let productosCargados = document.getElementById('productos-carrito');
let productosDisponibles = [
  { nombre: "Producto 1", precio: 100 },
  { nombre: "Producto 2", precio: 200 },
  { nombre: "Producto 3", precio: 150 },
  // Agrega más productos según sea necesario
];
let productosSeleccionados = [];
let total = 0;

// Ver si el carrito contiene o no algo 
if (productosCargados.children.length === 0) {
  console.log('El carrito está vacío');
} else {
  console.log('Productos en el carrito de compra');
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
  for (let i = 0; i < productosCargados.children.length; i++) {
    let item = productosCargados.children[i];
    let subtotalTexto = item.querySelector('.subtotal').innerText.match(/(\d+)/)[0];
    total += parseInt(subtotalTexto);
  }
  console.log('Importe total de la compra: $' + total);
}

// Agregar el evento de cambio a los campos de cantidad
let inputsCantidad = document.querySelectorAll('#productos-carrito .cantidad');
inputsCantidad.forEach(function(input) {
  input.addEventListener('change', actualizarCantidad);
});

// Botón agregar al carrito para agregar nuevos productos 
let addToCartButtons = document.querySelectorAll('#opciones-productos li button');

// Función de click para los botones 
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
      // Recalcular el importe total después de eliminar el producto
      total -= parseInt(productPrice);
      console.log('Importe total de la compra: $' + total);
    });
    nuevoProductoCargado.appendChild(eliminarButton);

    productosCargados.appendChild(nuevoProductoCargado);
    // Actualizar el importe total después de agregar un nuevo producto
    total += parseInt(productPrice);
    console.log('Importe total de la compra: $' + total);

    // Agregar el producto al array de productos seleccionados
    let producto = {
      nombre: productName,
      precio: parseInt(productPrice)
    };
    productosSeleccionados.push(producto);

    // Mostrar los productos seleccionados
    console.log('Productos seleccionados:');
    productosSeleccionados.forEach(function(producto, index) {
      console.log('Producto ' + (index + 1) + ': ' + producto.nombre + ' - $' + producto.precio);
    });
  });
});

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

