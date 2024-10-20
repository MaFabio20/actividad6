let productos = [
    { id: 1, nombre: 'Arroz', precio: 20000 },
    { id: 2, nombre: 'Paca de Leche', precio: 35000 }
];

function mostrarProductos() {
    const tabla = document.querySelector('#tabla-productos tbody');
    const totalPrecios = document.getElementById('total-precios');
    const selectIdActualizar = document.getElementById('id-actualizar');
    let total = 0;

    tabla.innerHTML = '';
    selectIdActualizar.innerHTML = '<option value="" disabled selected>Seleccionar ID de Producto</option>';

    productos.forEach(producto => {
        const fila = document.createElement('tr');

        const celdaId = document.createElement('td');
        celdaId.textContent = producto.id;

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = producto.nombre;

        const celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = `$${producto.precio.toFixed(2)}`;

        // Crear celda para el botón de eliminar
        const celdaEliminar = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn btn-danger'; // Estilo de Bootstrap
        botonEliminar.addEventListener('click', () => eliminarProducto(producto.nombre, producto.id));
        celdaEliminar.appendChild(botonEliminar);

        fila.appendChild(celdaId);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaEliminar); // Añadir celda de eliminar

        tabla.appendChild(fila);
        total += producto.precio;

        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = `${producto.id} - ${producto.nombre}`;
        selectIdActualizar.appendChild(option);
    });

    totalPrecios.textContent = `$${total.toFixed(2)}`;
}

function eliminarProducto(nombre, id) {
    // Confirmación para eliminar producto mostrando el nombre
    if (confirm(`¿Está seguro de que desea eliminar el producto "${nombre}"?`)) {
        productos = productos.filter(p => p.id !== id); // Filtrar el producto a eliminar
        mostrarProductos(); // Actualizar tabla
    }
}

document.getElementById('id-actualizar').addEventListener('change', function () {
    const idSeleccionado = parseInt(this.value);
    const producto = productos.find(p => p.id === idSeleccionado);

    if (producto) {
        document.getElementById('nombre-actualizado').value = producto.nombre;
        document.getElementById('precio-actualizado').value = producto.precio;
    }
});

document.getElementById('cargar-productos').addEventListener('click', () => {
    mostrarProductos();
});

document.getElementById('form-post').addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevoNombre = document.getElementById('nuevo-nombre').value;
    const nuevoPrecio = parseFloat(document.getElementById('nuevo-precio').value);

    // Confirmación para agregar producto mostrando el nombre y precio
    if (confirm(`¿Desea agregar el producto "${nuevoNombre}" con un precio de $${nuevoPrecio.toFixed(2)}?`)) {
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: nuevoNombre,
            precio: nuevoPrecio
        };

        productos.push(nuevoProducto);
        mostrarProductos();
        
        // Limpiar campos
        document.getElementById('nuevo-nombre').value = '';
        document.getElementById('nuevo-precio').value = '';
    }
});

document.getElementById('form-put').addEventListener('submit', (e) => {
    e.preventDefault();
    const idActualizar = parseInt(document.getElementById('id-actualizar').value);
    const nombreActualizado = document.getElementById('nombre-actualizado').value;
    const precioActualizado = parseFloat(document.getElementById('precio-actualizado').value);

    const producto = productos.find(p => p.id === idActualizar);

    if (producto) {
        // Confirmación para actualizar producto mostrando el nombre
        if (confirm(`¿Desea actualizar el producto "${producto.nombre}" a "${nombreActualizado}" con un precio de $${precioActualizado.toFixed(2)}?`)) {
            if (nombreActualizado) {
                producto.nombre = nombreActualizado;
            }
            if (precioActualizado) {
                producto.precio = precioActualizado;
            }
            mostrarProductos();
        }
    } else {
        alert('Producto no encontrado');
    }

    // Limpiar campos
    document.getElementById('id-actualizar').value = '';
    document.getElementById('nombre-actualizado').value = '';
    document.getElementById('precio-actualizado').value = '';
});
