const cargarFormulario = ( ( dataProductos ) => {
    if ( location.href.search('admin-form.html') != -1 ) {

        const nodoCategorias = $('#divCategoria');
        cargarCategorias( dataProductos, nodoCategorias, 'form' );

        const nodoGenero = $('#divGenero');
        cargarGeneros( nodoGenero, 'form' );
        
        const nodoTalle = $('#divTalle');
        cargarTalles( dataProductos, nodoTalle, 'form' );
    }
})

export default cargarFormulario;


export function cargarCategorias( 
    dataProductos, nodoCategorias, ubicacion, categoriaSel=''
    ) {
    // crea un array que filtre categorías para que no se repitan
    const arrayCategorias = [ 'otra' ];
    dataProductos.forEach( producto => {
        const indexCat = arrayCategorias.findIndex( cat => cat===producto.categoria )
        indexCat===-1 && ( arrayCategorias.push( producto.categoria ));        
    })


    //  crea <select/> para categorías
    const selectCategorias = $('<select/>');
    selectCategorias.attr( 'class', 'custom-select capitaliza' );
    selectCategorias.attr( 'id', `categoriaSelect${ ubicacion }` );

    if ( categoriaSel.length==0 || categoriaSel==undefined ) {
        const optionDefecto = $( '<option/>' ).html( 'Categoria ');
        optionDefecto.attr( 'selected', true );
        optionDefecto.attr( 'disabled', true );
        selectCategorias.append( optionDefecto );
    }

    arrayCategorias.map( categoria => {
        const opcionCat = $( '<option/>' ).html( categoria );
        opcionCat.attr( 'value', categoria );

        if ( categoria === categoriaSel ) {
            opcionCat.attr( 'selected', true );
        }

        selectCategorias.append( opcionCat );
    })

    nodoCategorias.append( selectCategorias );

    crearInputCategoria( nodoCategorias, ubicacion );
}

export const crearInputCategoria = ( nodoCategorias, ubicacion ) => {

    const selectCategorias = $( `#categoriaSelect${ ubicacion }` );

    selectCategorias.change( () => {

        if ( selectCategorias.val()==='otra' ) {
            const divCategorias = nodoCategorias;
            divCategorias.empty();


            divCategorias.html(`
                <div class="mb-3">
                    <input 
                        placeholder="Categoria" 
                        type="text" 
                        class="form-control" 
                        name="categoria" 
                        id="${ ubicacion }InputCategoria" 
                    >
                </div>
            `)
        }

    })
}


export function cargarGeneros( nodoGenero, ubicacion, generoSel='' ) {
    const arrayGeneros = [ 'damas', 'hombres', 'niños', 'niñas', 'unisex' ];

    //  crea <select/> para categorías
    const selectGenero = $('<select/>');
    selectGenero.attr( 'class', 'custom-select capitaliza' );
    selectGenero.attr( 'id', `generoSelect${ ubicacion }` );

    if ( generoSel.length=='' || generoSel==undefined ) {
        const optionDefecto = $( '<option/>' ).html( 'Genero ');
        optionDefecto.attr( 'selected', true );
        optionDefecto.attr( 'disabled', true );
        selectGenero.append( optionDefecto );
    }

    arrayGeneros.map( genero => {
        const opcionGenero = $( '<option/>' ).html( genero );
        
        if ( genero === generoSel ) {
            opcionGenero.attr( 'selected', true );
        }
        
        selectGenero.append( opcionGenero );
    })

    nodoGenero.append( selectGenero );

}


export function cargarTalles( 
    dataProductos, nodoTalle, ubicacion, talleSel='' ) {
        const arrayTalles = [ 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'otro',  ];

        // filtre talles para que no se repitan, por si se agregan
        dataProductos.map( producto => {
            if( producto.talle!==undefined ) {
                const indexTalle = arrayTalles.findIndex( talle => talle===producto.talle )
                indexTalle===-1 && ( arrayTalles.push( producto.talle ));        
            }
        })

    //  crea <select/> para categorías
    const selectTalle = $('<select/>');
    selectTalle.attr( 'class', 'custom-select capitaliza' );
    selectTalle.attr( 'id', `talleSelect${ ubicacion }` );

    if ( talleSel.length=='' || talleSel==undefined ) {
        const optionDefecto = $( '<option/>' ).html( 'Talle ');
        optionDefecto.attr( 'selected', true );
        optionDefecto.attr( 'disabled', true );
        selectTalle.append( optionDefecto );
    }

    arrayTalles.map( talle => {
        const opcionTalle = $( '<option/>' ).html( talle );
        opcionTalle.attr( 'class', 'mayusculas' );
        
        if ( talle === talleSel ) {
            opcionTalle.attr( 'selected', true );
        }

        selectTalle.append( opcionTalle );
    })

    nodoTalle.append( selectTalle );

    crearInputTalles( nodoTalle, ubicacion );
}

const crearInputTalles = ( nodoTalle, ubicacion ) => {
    const selectCategorias = document.getElementById( `talleSelect${ ubicacion }` );
    selectCategorias.addEventListener( 'change', () => {
        if ( selectCategorias.value==='otro' ) {
            const divCategorias = nodoTalle;
            divCategorias.empty();

            divCategorias.html(`
                <div class="mb-3">
                    <input 
                        placeholder="Talle" 
                        type="text" 
                        class="form-control" 
                        name="talle" 
                        id="${ ubicacion }InputTalle" 
                    >
                </div>
            `)
        }

    })
}


const formInputImagen = $( '#formInputImagen' );
formInputImagen.change( () => {
    $( '#labelImgForm' ).html( formInputImagen.val() );
})

