import { cargarTemplateProductos } from "./productos-filtro.js";

const filtroContainer = document.getElementsByClassName( 'filtros-container' );
export let filtrosCargados = [];


export const crearListaFiltros = ( opciones ) => {
    filtroContainer[0].replaceChildren();

        const opcionesCategoria = [];
        const opcionesTalle = [];
        const opcionesCondicion = [];
        const opcionesMarca = [];
        const opcionesGenero = [];

        let opcionesFiltros = [];

        opciones.forEach( opcion => {

            const filtroCategoria = verificarFiltro( opcion.data().categoria, opcionesCategoria );
            filtroCategoria && ( opcionesCategoria.push( filtroCategoria ));

            const filtroTalle = verificarFiltro( opcion.data().talle, opcionesTalle );
            filtroTalle && ( opcionesTalle.push( filtroTalle ));

            // const filtroCondicion = verificarFiltro( opcion.data().condicion, opcionesCondicion );
            // filtroCondicion && ( opcionesCondicion.push( filtroCondicion ));

            const filtroMarca = verificarFiltro( opcion.data().marca, opcionesMarca );
            filtroMarca && ( opcionesMarca.push( filtroMarca ));

            const filtroGenero = verificarFiltro( opcion.data().genero, opcionesGenero );
            filtroGenero && ( opcionesGenero.push( filtroGenero ));
        })

        opcionesFiltros = [ opcionesCategoria,
                            opcionesTalle,
                            opcionesMarca,
                            opcionesGenero 
                        ]
        let i=0
        const arrayFiltros = [ 'Categoria', 'Talle', 'Marca', 'Genero' ] 
        arrayFiltros.forEach( nombreFiltro => {
            const opciones = opcionesFiltros[i];
            // filtro.length > 0 &&
            crearMenuFiltro( opciones, nombreFiltro );
            i++
        })

        tomarValoresFiltro();
}

const verificarFiltro = ( opcion, opcionesCargadas ) => {

    const indexFiltro = opcionesCargadas.findIndex( el => el === opcion )

    if( indexFiltro === -1 ) {
        return opcion;        
    }
}

const crearMenuFiltro = ( itemsFiltro, nombreFiltro ) => {

    const tituloFiltro = document.createElement( 'aside' );
    tituloFiltro.setAttribute( 'class', 'left_widgets p_filter_widgets' );

    tituloFiltro.innerHTML = `
        <div class="l_w_title">
            <h3 class="capitaliza-titulo" >${ nombreFiltro }</h3>
        </div>
        <div class="widgets_inner"> 
            <ul class="${ nombreFiltro }-lista-items list">
            </ul>
        </div>
    `;

    filtroContainer[0].append( tituloFiltro )

    agregarItemsFiltro( itemsFiltro, nombreFiltro )
}

const agregarItemsFiltro = ( itemsFiltro, nombreFiltro ) => {

    const nodoFiltro = document.getElementsByClassName( `${ nombreFiltro }-lista-items`);
    const itemLista = document.createElement( 'li' );

    itemsFiltro.forEach( item => { 
        itemLista.innerHTML += `
            <p class="capitaliza-item" 
                data-nombreFiltro=${ nombreFiltro }
            >
                ${ item }
            <p>
        `;

    });


    nodoFiltro.length>0 && ( nodoFiltro[0].append( itemLista ) );

}



const tomarValoresFiltro = () => {
    
    $( '.capitaliza-item' ).click( event => {
        let nombreFiltro = event.target.dataset.nombrefiltro;
        nombreFiltro = nombreFiltro.toLowerCase();
        const valorFiltro = event.target.innerText.toLowerCase();

        // para no poder seleccionar dos veces el mismo filtro
        const indexFiltro = filtrosCargados.findIndex( filtro => valorFiltro === filtro[ nombreFiltro ] );

        if ( indexFiltro===-1 ) {
            filtrosCargados.push({ [nombreFiltro]: valorFiltro });
        }
        
        cargarTemplateProductos();
    })
}


export const mostrarFiltrosCargados = () => {

    if ( filtrosCargados.length>0 ) {
        const asideFiltrosSel = document.createElement( 'aside' );
        asideFiltrosSel.setAttribute( 'class', 'left_widgets p_filter_widgets' );
        asideFiltrosSel.replaceChildren();
    
        //  se crea el contenedor ("ul") para agregar los filtros cargados
        asideFiltrosSel.innerHTML = `

            <div class="widgets_inner" id="contenedorFiltrosCargargados" > 
                <ul class="filtros-lista-items list" id="ulFiltros" >
                </ul>
            </div>
        `;
        filtroContainer[0].prepend( asideFiltrosSel )

        const nodoFiltrosCargados = document.getElementById( 'ulFiltros' );

        // se agrega el listado del filtros seleccionados, para mostrar
        filtrosCargados.forEach( filtro => {

            for ( const propiedad in filtro ) {
                const itemLista = document.createElement( 'li' );
    
                itemLista.innerHTML += `
                    <p >
                        ${ filtro[ propiedad ] }
                    <p>
                `;
                nodoFiltrosCargados.append( itemLista );
            }
        })

        agregarBtnLimpiarFiltros();
    }
}

const agregarBtnLimpiarFiltros = () => {
    const nodoFiltros = document.getElementById( 'contenedorFiltrosCargargados' );

    const botonLimpiar = document.createElement( 'button');
    botonLimpiar.setAttribute( 'id', 'botonLimpiar' );

    botonLimpiar.innerHTML = "x Limpiar";
    nodoFiltros.append( botonLimpiar );

    botonLimpiar.addEventListener( 'click', () => {
        location.href = 'productos.html'
    })
}
