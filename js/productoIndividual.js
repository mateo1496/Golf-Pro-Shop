import { obtenerUnicoProducto } from "./data/firebase.js";
import { actualizarCarritoBadge, cargarEventoProdIndividual } from "./carrito.js";

window.addEventListener( 'DOMContentLoaded', async () => {

    const idUrl = location.search.substring( 4 ).split( ' ' )[0];
    const producto = await obtenerUnicoProducto( idUrl );

    cargarDatosProductoUnico( producto.data() );

    actualizarCarritoBadge();
    
    cargarEventoProdIndividual( producto.id );

});

const cargarDatosProductoUnico = ( infoProducto ) => {
    const nombreProdU = document.getElementById( 'prod-individual-nombre' );
    nombreProdU.innerHTML = infoProducto.nombre;

    const marcaProdU = document.getElementById( 'prod-individual-marca' );
    marcaProdU.innerHTML = `<span>Marca</span> : ${ infoProducto.marca.toUpperCase() }`;

    if ( infoProducto.talle ) {
        const talleProdU = document.getElementById( 'prod-individual-talle' );
        talleProdU.innerHTML = `<span>Talle</span> : ${ infoProducto.talle.toUpperCase() }`;
    }


    if ( infoProducto.genero ) {
        const generoProdU = document.getElementById( 'prod-individual-genero' );
        generoProdU.innerHTML = `<span>Género</span> : ${ infoProducto.genero.toUpperCase() }`;
    }

    const categoriaProdU = document.getElementById( 'prod-individual-categoria' );
    categoriaProdU.innerHTML = `<span>Categoría</span> : ${ infoProducto.categoria.toUpperCase() }`;

    cargarImagenesCarrousel( infoProducto );


}

// cargar imágenes en carrousel
const cargarImagenesCarrousel = ( infoProducto ) => {
    const olCarrousel = document.getElementById( 'carrousel-imagen-producto' );
    
    const { imagen } = infoProducto;
    
    let i = 0;
    imagen.forEach( img => {
        // crea nodo div, donde va la imagen
        const divImg = document.createElement( 'div' );
        divImg.setAttribute( 'class', 'carousel-item' );
        i===0 && ( divImg.setAttribute( 'class', 'carousel-item active' ) );

        // crea imagen y agrega al div
        const imgCarrousel = document.createElement( 'img' );
        imgCarrousel.setAttribute( 'class', 'd-block w-100 imagen-carrousel' );
        imgCarrousel.setAttribute( 'src', `${ img }` )

        divImg.append( imgCarrousel );

        olCarrousel.append( divImg );

        i++
    })
    crearMiniaturasCarrousel( imagen );
}

const crearMiniaturasCarrousel = ( imagenes ) => {

    const olCarrousel = document.getElementById( 'carrousel-list' );
    
    let i = 0;
    imagenes.forEach( img => {
        // crea nodo li, donde va la imagen
        const liImg = document.createElement( 'li' );
        liImg.setAttribute( 'data-target', '#carouselExampleIndicators' );
        liImg.setAttribute( 'data-slide-to', `${ i }`);
        i===0 && ( liImg.setAttribute( 'class', 'active') );

        // crea el img y lo pega al li
        const imgTag = document.createElement( 'img' );
        imgTag.setAttribute( 'src', `${ img }`);
        imgTag.setAttribute( 'class', 'imagenMuestraCarrousel' );

        liImg.append( imgTag );

            olCarrousel.append( liImg );

        i++
    })

}