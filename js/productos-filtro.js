import { obtenerProductos } from './data/firebase.js';
import { crearListaFiltros, mostrarFiltrosCargados, filtrosCargados } from './filtros.js';
import { actualizarCarritoBadge, cargarEventoProdMain } from './carrito.js';

window.addEventListener( 'DOMContentLoaded', () => {

    cargarTemplateProductos();

})

const prodFiltroContainer = 
    document.getElementsByClassName( 'prods-filtro' );


const mostrarProductosFiltro = ( productos ) => {

    // para vaciar el div
    document.getElementById( 'filtrosProdsContainer' ).replaceChildren();
    
    productos.forEach( prod => {
        const { nombre, talle, precio, imagen, precioAnterior } = prod.data();

        const tarjetaProdFiltro = document.createElement('div');
        tarjetaProdFiltro.setAttribute('class', 'col-lg-4 col-md-6');

        tarjetaProdFiltro.innerHTML = `
            <div class="single-product">
                <div class="product-img">
                    <img
                    class="card-img"
                    src="${ imagen[0] }"
                    alt=""
                    />
                    <div class="p_icon">
                        <a href="productoIndividual.html?id=${ prod.id }">
                            <i class="ti-eye icono-ver-prod"></i>
                        </a>
                        <a class='carrito-tarjeta-btn' id="carrito-agergar-prod" data-id='${ prod.id }'>
                            <i class="ti-shopping-cart"></i>
                        </a>
                    </div>
                </div>
                <div class="product-btm">
                    <a class="detalle-tarjeta" href="#" class="d-block">
                        <h4>${ nombre }</h4>
                        <p>
                            ${ talle!==undefined ? ( `Talle ${ talle }` ) : ( '' ) }    
                        </p>
                    </a>
                    <div class="mt-3">
                        <span class="mr-4">$${ precio }</span>
                        <del>
                            ${ precioAnterior ?
                                ( `$${ precioAnterior }` )
                                : ('') }
                        </del>
                    </div>
                </div>
            </div>
        `;
        prodFiltroContainer[0].prepend( tarjetaProdFiltro );

        cargarEventoProdMain();
    })
}

export const cargarTemplateProductos = async () => {

    const querySnapshot = await obtenerProductos( filtrosCargados[ filtrosCargados.length-1 ] );

    mostrarProductosFiltro( querySnapshot );

    crearListaFiltros( querySnapshot );

    mostrarFiltrosCargados();
    
    actualizarCarritoBadge();
}

const selectOrden = document.getElementById( 'selectOrdenar' );
selectOrden.addEventListener( 'change', () => {
    cargarTemplateProductos();
});










