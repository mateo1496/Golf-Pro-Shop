import { cargarEventoDest } from './carrito.js';


export const cargarProductosDestacados = ( productos ) => {
    const prodDestContainer = document.getElementById('prods-dest-container');

    // crea array de productos destacados, para mostrar
    let prodDestacados = [];
    productos.forEach( dest => {
        const { destacado } = dest.data()
        destacado && ( prodDestacados.push( dest ));
    })

    // esconde sección de productos destacados, si no hay nada para mostrar
    if( prodDestacados.length===0 ) {
        const seccionDestacados = document.getElementsByClassName( 'section-prods-destacados' );
        seccionDestacados[0].style.display = 'none';

    } else {
        // contador "i" para mostrar sólo 3 productos destacados
        let i = 1;
        prodDestacados.forEach( prod => {

            if ( i<=3 ) {
                const { nombre, talle, imagen, precio, precioAnterior } = prod.data();

                const contenedorTarjeta = document.createElement('div');
                contenedorTarjeta.setAttribute('class', 'col-lg-4 col-md-6');

                contenedorTarjeta.innerHTML = `
                    <div class="single-product">
                        <div class="producto-destacado-img product-img">
                            <img class="img-fluid w-100" src="${ imagen[0] }" alt="img" />
                            <div class="p_icon">
                                <a href="productoIndividual.html?id=${ prod.id }">
                                    <i class="ti-eye"></i>
                                </a>
                                <a class='carrito-tarjeta-btn' id="carrito-agergar-dest" data-id='${ prod.id }'>
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
                `;

                prodDestContainer.prepend( contenedorTarjeta );

                cargarEventoDest();

                i++
            }
        })
    }
}