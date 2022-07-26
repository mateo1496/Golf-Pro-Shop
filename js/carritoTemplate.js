import { obtenerUnicoProducto } from './data/firebase.js';
import { actualizarCarritoBadge, cargarEventofinalizarCompra } from './carrito.js'


window.addEventListener( 'DOMContentLoaded', () => {
    obtenerProdsCarrito();
    actualizarCarritoBadge();
    cargarEventofinalizarCompra();
});

const obtenerProdsCarrito = () => {
    /* verifica si hay filas anteriores cargadas y, en ese caso,
     las elimina antes de actualizar los productos encontrados en LocalStorage */
    $( '.tr-detalle-carrito' ).empty();

    // desde este punto busca productos en local storage para cargarlos al DOM.
    const productosLocalStorage = JSON.parse( localStorage.getItem( 'golfproshop28' ));
    
    let subtotalCarrito = 0;
    if ( productosLocalStorage ) {
        if ( productosLocalStorage.length>0 ) {

            productosLocalStorage.forEach( async id => {
                const productoUnico = await obtenerUnicoProducto( id );
                cargarDetalleProductos( productoUnico );
                
                subtotalCarrito += parseInt(productoUnico.data().precio);
                
                cargarSubtotalCarrito( subtotalCarrito );
            });
        } else {
            location.href = 'index.html';
        }

    } else {
        location.href = 'index.html';
    }
}

const cargarDetalleProductos = ( productoUnico ) => {
    const tbodyDetalle = document.getElementById( 'body-detalle-carrito' );

    const { imagen, nombre, marca, categoria, talle, precio } = productoUnico.data();
    const trDetalle = document.createElement( 'tr' );
    trDetalle.setAttribute( 'class', 'tr-detalle-carrito' );

    trDetalle.innerHTML = `
            <td>
                <div class="media">
                    <div class="d-flex">
                        <img 
                            class="imagen-detalle-carrito"
                            src="${ imagen[0] }"
                            alt=""
                        />
                    </div>
                    <div class="media-body">
                        <p>${ nombre }</p>
                    </div>
                </div>
            </td>
            <td>
                <p>Marca: ${ marca }</p>
                <p>Categoría: ${ categoria }</p>
                <p>Talle: ${ talle }</p>

            </td>
            <td>
                <h5>$${ precio }</h5>
            </td>
            <td>
                <button id='botonQuitarProd' type="button" class="btn btn-danger">x</button>
            </td>
    `

    tbodyDetalle.prepend( trDetalle );

    const botonQuitarProd = document.getElementById( 'botonQuitarProd' );
    botonQuitarProd.addEventListener( 'click', ()=> {
        quitarProdCarrito( productoUnico.id );
    })
}

const cargarSubtotalCarrito = ( subtotalCarrito ) => {
    const nodoSubtotal = document.getElementById( 'subtotalCarrito' );
    const totalFormateado = new Intl.NumberFormat("es-ES").format(parseFloat( subtotalCarrito ))
    nodoSubtotal.innerHTML = `$ ${ totalFormateado }`;

}

const quitarProdCarrito = ( idProducto ) => {
    const productosLocalStorage = JSON.parse( localStorage.getItem( 'golfproshop28' ));
    const indexProd = productosLocalStorage.findIndex( id => id===idProducto );

    // elimina el producto del LocalStorage
    productosLocalStorage.splice( indexProd, 1);

    // vuelve a cargar el array actualizado
    localStorage.setItem( 'golfproshop28', JSON.stringify( productosLocalStorage ));

    obtenerProdsCarrito();
    actualizarCarritoBadge();
}