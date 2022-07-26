import { guardarImagenesStorage, agregarProducto } from '/js/data/firebase.js';

const formAgregarBTN = $('#formBotonAgregar');
formAgregarBTN.click( async ( event ) => {
    event.preventDefault();

    const valorNombre = $('#formInputNombre').val();

    const valorMarca = $('#formInputMarca').val();

    const valorCategoria = $('#categoriaSelectform').val() ?  ( $('#categoriaSelectform').val() )  
                            : ( $('#categoriaSelectmodal').val() ) ? ( $('#categoriaSelectmodal').val() )
                            : ( $('#formInputCategoria').val() );

    const valorGenero = $('#generoSelectform').val() ?
                            ( $('#generoSelectform').val() )
                            : ( $('#generoSelectmodal').val() );

    const valorTalle = $('#talleSelectform').val() ? ( $('#talleSelectform').val() )
                        : $('#talleSelectmodal').val() ? ( $('#talleSelectmodal').val() )
                        : ( $('#formInputTalle').val() );

    const valorPrecio = $('#formInputPrecio').val();

    const valorPrecioAnterior = $('#formInputPrecioAnt').val();

    const prodDestacado = $('#checkDestacado').is(":checked");

    const valorImagen = $('#formInputImagen').val();

    const multipleImagenes = $('#formInputImagen')[0].files;

    const referenciaImagen = $('#formInputImagen').val().length>0 ?
                                $('#formInputImagen')[0].files[0].name
                                : (alert( 'Cargar Imagen'));

    const arrayImagenes = [];
    for ( let i=0; i<multipleImagenes.length; i++ ) {

        const imagenRef = multipleImagenes[i].name;

        const imagenStorage = await guardarImagenesStorage( imagenRef, multipleImagenes[i] );

        arrayImagenes.push( imagenStorage );
    }

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    agregarProducto( {
        'nombre': valorNombre,
        'marca': valorMarca,
        'categoria': valorCategoria,
        'genero': valorGenero,
        'talle': valorTalle ? ( valorTalle ) : ( '' ),
        'imagen': arrayImagenes,
        'precio': valorPrecio,
        'precioAnterior': valorPrecioAnterior,
        'registrado': timestamp,
        'destacado': prodDestacado
    })

});



$('#formInputImagen').keyup( ( event ) => {
    // vuelve a colocar imagen por defecto, si el valor ingresado es incorrecto
    const imagenMuestra = $( '#adminImagen' );
    imagenMuestra.attr( 'src', 'img/hangers.jpg')

    const valorActual = event.target.value;

    const url = `${ window.location.origin}/img/product/productos/${valorActual}`
    $.get( url, ( resp, estado )=>{
        if( estado==='success' ) {
            imagenMuestra.attr( 'src', `img/product/productos/${ event.target.value }` )
        } else{
            imagenMuestra.attr( 'src', 'img/hangers.jpg')
        }
    })
})
