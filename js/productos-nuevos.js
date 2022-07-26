import { cargarEventoNuevos } from "./carrito.js";
import { cargarNuevoDestacado } from './prod-nuevo-destacado.js';

const prodNvosContainer = 
    document.getElementsByClassName('tarjetas-prods-nuevos');

export const cargarProdsNuevos = ( productos ) => {

    const arrayProductos = [];
    productos.forEach( item => {
        arrayProductos.push( [ item.id, item.data() ]);
    })

    const prodsOrdenados = arrayProductos.sort( ( a, b ) => {
        return b[1].registrado - a[1].registrado;
    })

    // renderiza el producto más nuevo
    cargarNuevoDestacado( prodsOrdenados[ 0 ][ 0 ], prodsOrdenados[ 0 ][ 1 ] );
    
    // renderiza los siguientes cuatro productos más nuevos
    for( let i=1; i<=4; i++ ) {

        const { nombre, talle, precio, imagen, precioAnterior } = prodsOrdenados[ i ][ 1 ];

        const contenedorTarjeta = document.createElement('div');
        contenedorTarjeta.setAttribute('class', 'col-lg-6 col-md-6');
        
        contenedorTarjeta.innerHTML = `
            <div class="single-product">
                <div class="product-img">
                    <img class="img-fluid w-100" src="${ imagen[0] }" alt="" />
                    <div class="p_icon">
                        <a href="productoIndividual.html?id=${ prodsOrdenados[ i ][ 0 ] }">
                            <i class="ti-eye"></i>
                        </a>
                        <a class='carrito-tarjeta-btn' id="carrito-agergar-nuevo" data-id='${ prodsOrdenados[ i ][ 0 ] }' >
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
        prodNvosContainer[0].prepend( contenedorTarjeta );

        cargarEventoNuevos();
    }
}   