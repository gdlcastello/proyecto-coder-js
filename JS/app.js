console.log("Esta conectado");

alert("Estamos online")



let productosCargados = document.getElementById('productos-carrito');

// Ver si el carrito contiene o no algo 
if (productosCargados.children.length === 0) {
  console.log('El carrito está vacío');
} else {
  console.log('El carrito contiene ' + productosCargados.children.length + ' articulos');
}

// Saber que cantidad hay y mostrarlo 
for (let i = 0; i < productosCargados.children.length; i++) {
  let item = productosCargados.children[i];
  console.log('articulos ' + (i + 1) + ': ' + item.innerText);


  // Agregar un botón "Eliminar" a cada producto cargado
  let eliminarButton = document.createElement('button');
  eliminarButton.innerText = 'Eliminar';
  eliminarButton.addEventListener('click', function(event) {
    event.target.parentNode.remove(); 
  });
  item.appendChild(eliminarButton);
}


// Boton agregar al carrito para agregar nuevos productos 
let addToCartButtons = document.querySelectorAll('#opciones-productos button');

// Funcion de click para los botones 
addToCartButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    let product = event.target.parentNode;
    let productName = product.querySelector('h3').innerText;
    let productPrice = product.querySelector('p:last-of-type').innerText;

    let nuevoProductoCargado = document.createElement('li');
    nuevoProductoCargado.innerText = productName + ' - Precio: ' + productPrice;
    productosCargados.appendChild(nuevoProductoCargado);
  });
});


