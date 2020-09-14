class Carrito {

    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const product = e.target.parentElement.parentElement;
            this.leerProducto(product)
        }
    }

    leerProducto(producto) {
        const infoProducto = {
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.bold').textContent,
            id: producto.querySelector('.agregar-carrito').getAttribute('data-id')
        }

        this.insertarCarrito(infoProducto)
    }

    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${producto.titulo}</td>
    <td>${producto.precio}</td>    
    <td><a  class="btn btn-danger fas fa-times-circle eliminar-producto" data-id="${producto.id}"></a></td>
    `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto)
        refrescar();
    }

    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('eliminar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID)
        this.calcularTotal();
    }
    vaciarCarrito(e) {
        e.preventDefault();
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>    
        <td><a  class="btn btn-danger fas fa-times-circle eliminar-producto" data-id="${producto.id}"></a></td>
        `;
            listaProductos.appendChild(row);
        });
    }

    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }


    obtenerProductosLocalStorage() {
        let productoLS;
        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    leerLocalStorageCompra() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <th scope="row">${producto.titulo}</th>
            <td>${producto.precio}</td>
            
        `;
            listaCompra.appendChild(row);
        });
    }

    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === productoID) {
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }



    obtenerUsuarioLS() {
        let userLS;
        var email;
        if (localStorage.getItem('user') === null) {
            userLS = [];
            console.log('no hay nada')
        }
        else {
            userLS = JSON.parse(localStorage.getItem('user'));
            console.log('hola' + userLS.uid)
            email = userLS.uid
        }
        return email;
    }

    insertarProductoDB() {
        let productoLS;
        let userLS = JSON.parse(localStorage.getItem('user'));;
        console.log(userLS);
        productoLS = this.obtenerProductosLocalStorage();
        productoLS.forEach(function (producto) {
            db.collection("pedidos")
                .add({
                    Correo: `${userLS}`,
                    producto: `${producto.titulo}`,
                    precio: `${producto.precio}`
                })
                .then((refDoc) => {
                    console.log(`Added ${refDoc.id}`);
                    localStorage.clear();
                    location.reload();
                });
        })
    }

    vaciarLocalStorage() {
        localStorage.clear();
        location.reload();
    }

    calcularTotal() {
        let productosLS;
        let total = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for (let i = 0; i < productosLS.length; i++) {
            let element = Number(productosLS[i].precio);
            total = total + element;

        }
        document.getElementById('total').innerHTML = "$" + total.toFixed(3);

    }

}

const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const listaCompra = document.querySelector('#resumen-pedido tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const pedido = document.getElementById('pedido');


cargarEvento()

function cargarEvento() {
    productos.addEventListener('click', (e) => { carro.comprarProducto(e) });
    carrito.addEventListener('click', (e) => { carro.eliminarProducto(e) });
    pedido.addEventListener('click', (e) => { carro.insertarProductoDB(e) });
    vaciarCarritoBtn.addEventListener('click', (e) => { carro.vaciarCarrito(e) })
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorageCompra());
    document.addEventListener('DOMContentLoaded', carro.obtenerUsuarioLS());
    carro.calcularTotal();
}

function refrescar() {
    window.location.href = "menu.html";
}