import { obtenerUnicoProducto } from './data/firebase.js';

// cargar funciones para boton cargarAdministadorOferta
export const cargarEventoProdMain = () => {
    const carritoBTN = document.getElementById( 'carrito-agergar-prod' );
    carritoBTN.addEventListener( 'click', () => {
        cargarCarrito( carritoBTN );
    })
}

export const cargarEventoDest = () => {
    const carritoBTN = document.getElementById( 'carrito-agergar-dest' );
    carritoBTN.addEventListener( 'click', () => {
        cargarCarrito( carritoBTN );
    })
}

export const cargarEventoNuevos = () => {
    const carritoBTN = document.getElementById( 'carrito-agergar-nuevo' );
    carritoBTN.addEventListener( 'click', () => {
        cargarCarrito( carritoBTN );
    })
}

export const cargarEventoProdIndividual = ( id) => {
    const carritoBTN = document.getElementById( 'carrito-agergar-indiv' );
    carritoBTN.addEventListener( 'click', () => {
        cargarCarrito( id );
    })
}

const cargarCarrito = ( elemento ) => {

    const productosCargados = localStorage.getItem( 'golfproshop28' );

    // id del producto clickeado
    const idProd =  elemento.dataset ? ( elemento.dataset.id)
                                        : ( elemento );


    if ( productosCargados===null || productosCargados.length===0 ) {
        localStorage.setItem( 'golfproshop28', JSON.stringify( [ idProd ] ) );
        actualizarCarritoBadge();
        
    } else {
        const prodsParseados = JSON.parse( productosCargados );
        const indexProdsCarrito = prodsParseados.findIndex( id => id === idProd )
        
        if ( indexProdsCarrito===-1 ) {
            localStorage.setItem( 'golfproshop28', JSON.stringify( [ ...prodsParseados, idProd ] ) );

            actualizarCarritoBadge();
        }
    }

}


export const actualizarCarritoBadge = () => {

    const prodsLocalStorage = localStorage.getItem( 'golfproshop28' );
    const prodsParseados = JSON.parse( prodsLocalStorage );


    if ( prodsParseados !== null ) {
        
        if ( prodsParseados.length>0 ) {
            const contCarritoBTN = document.getElementById( 'contenedor-carrito' );
            contCarritoBTN.setAttribute( 'style', 'pointer-events: auto' );

            const carritoNavBar = document.getElementById( 'badge-carrito' );
            carritoNavBar.innerHTML = prodsParseados.length;

        } else {
            const contCarritoBTN = document.getElementById( 'contenedor-carrito' );
            contCarritoBTN.setAttribute( 'style', 'pointer-events: none' );

        }
    } else {
        const contCarritoBTN = document.getElementById( 'contenedor-carrito' );
        contCarritoBTN.setAttribute( 'style', 'pointer-events: none' );
    }
}

export const cargarEventofinalizarCompra = () => {
    const botonFinalizarCompra = $( '#botonFinalizarCompra' );
    botonFinalizarCompra.click( () => {
        finalizarCompra();
    })
}

const finalizarCompra = () => {

    const productosCargados = localStorage.getItem( 'golfproshop28' );
    const idsParseados = JSON.parse( productosCargados );
    
    let detalleDeCompra = `Hola, quiero comprar estos productos:%0A`

    let i = 1;
    let subtotal = 0;
    idsParseados.forEach( async id => {

        const productoUnico = await obtenerUnicoProducto( id );

        const nombre = productoUnico.data().nombre.toUpperCase();
        const marca = productoUnico.data().marca.toUpperCase();
        const talle = productoUnico.data().talle.toUpperCase();
        const precio = productoUnico.data().precio.toUpperCase();

        detalleDeCompra += `-${ id }. ${ nombre }, marca: ${ marca }, talle: ${ talle }, precio: $${ precio }%0A`
    
        subtotal += parseInt( precio );

        // para que no envíe el mensaje hasta no haber cargado todos los productos
        if ( i===idsParseados.length ) {

            const total = new Intl.NumberFormat("es-ES").format(parseFloat( subtotal ))
            detalleDeCompra += `Total: $${ total }`;

            const mensaje = detalleDeCompra.split( ' ' ).join( '%20' );

            enviarMensajeWhatsapp( mensaje );
        }
        i++
    })
}

const enviarMensajeWhatsapp = ( mensaje ) => {
    window.open(`https://wa.me/5493513430638?text=${ mensaje }`);
}
