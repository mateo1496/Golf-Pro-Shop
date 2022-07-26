import { cargarEventoProdMain } from './carrito.js';


const prodsMainContainer = 
    document.getElementsByClassName( 'prods-main-container' );

export const mostrarProductos = ( productos ) => {

    let i = 0;
    productos.forEach( prod => {
    // muestra sólo 8 productos, pero se evita error si hay menor cantidad en la base de datos
        if ( i<8 ) {
            const { nombre, talle, precio, imagen, precioAnterior } = prod.data();

            const tarjetaProducto = document.createElement('div');
            tarjetaProducto.setAttribute('class', 'col-lg-3 col-md-6');

            tarjetaProducto.innerHTML = `
                <div class="single-product">
                    <div class="product-img">
                        <img class="img-fluid w-100" src="${ imagen[0] }" alt="" />
                        <div class="p_icon">
                            <a href="productoIndividual.html?id=${ prod.id }">
                                <i class="ti-eye"></i>
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
            prodsMainContainer[0].prepend( tarjetaProducto );

            cargarEventoProdMain();

            i++

        }
    })


}

    