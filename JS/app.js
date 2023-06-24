console.log("Está conectado");
alert("Estamos online");

let nombre = prompt("Ingrese su nombre:");
let apellido = prompt("Ingrese su apellido:");

let nombreValido = nombre.length >= 4;
let apellidoValido = apellido.length >= 4;

if (nombreValido && apellidoValido) {
  console.log("Hola " + nombre + " " + apellido);

  let productosCargados = document.getElementById('productos-carrito');
  let productosSeleccionados = [];
  let total = 0;

  // Ver si el carrito contiene o no algo 
  if (productosCargados.children.length === 0) {
    console.log('El carrito está vacío');
  } else {
    console.log('Productos en el carrito de compra');
  }

  // Calcular el importe total de la compra
  for (let i = 0; i < productosCargados.children.length; i++) {
    let item = productosCargados.children[i];
    console.log('Articulo ' + (i + 1) + ': ' + item.innerText);

    // Obtener el importe del artículo
    let importeTexto = item.querySelector('.precio').innerText.match(/(\d+)/)[0];
    let importe = parseInt(importeTexto);
    total += importe;
  }

  // Mostrar el importe total de la compra
  console.log('Importe total de la compra: $' + total);

  // Botón agregar al carrito para agregar nuevos productos 
  let addToCartButtons = document.querySelectorAll('#opciones-productos li button');

  // Función de click para los botones 
  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      let product = event.target.parentNode;
      let productName = product.querySelector('h3').innerText;
      let productPrice = product.querySelector('.precio').innerText.match(/(\d+)/)[0];

      let nuevoProductoCargado = document.createElement('li');
      nuevoProductoCargado.innerHTML = '<span class="nombre">' + productName + '</span> - <span class="precio">' + productPrice + '</span>';

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
} else {
  alert("Nombre o apellido no son válidos");
}
