import { 
    cargarCategorias,
    cargarGeneros,
    cargarTalles } from "./admin-inputs.js";
import { modificarProducto, obtenerProductos, guardarImagenesStorage } from "../data/firebase.js";
import { detallarProductosBD } from './adminDetalleProds.js'

export const crearModalEdicion = ( prod, contenedor, querySnapshot ) => {
    const { id } = prod;
    const { nombre, marca, categoria, genero, talle, precio, precioAnterior, imagen  } = prod.data();


    // agrega modal de edición
    const modalEdicion = $( '<div/>');
    modalEdicion.attr( 'class', 'modal fade' );

    modalEdicion.attr( 'id', `modal${ id }` );
    modalEdicion.attr( 'tabindex', '-1' );
    modalEdicion.attr( 'aria-hidden', 'true' );

    modalEdicion.html(`
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" >
                    <div class="mb-3">
                        <input 
                            placeholder="" 
                            type="text" 
                            class="form-control" 
                            name="nombre" 
                            id="modalInputNombre" 
                            autofocus
                        >
                    </div>
                    <div class="mb-3">
                        <input 
                            type="text"
                            class="form-control"
                            id="modalInputMarca"
                            placeholder="Marca"
                        >
                    </div>
                    <div class="mb-3" id="modalNodoCategorias"></div>
                    <div class="mb-3" id="modalNodoGenero"></div>
                    <div class="mb-3" id="modalNodoTalle"></div>
                    <div class="mb-3">
                        <input 
                            placeholder="" 
                            type="number" 
                            class="form-control" 
                            name="precio" 
                            id="modalInputPrecio" 
                            autofocus
                        >
                    </div>
                    <div class="mb-3">
                        <input 
                            placeholder="" 
                            type="text" 
                            class="form-control" 
                            name="precioAnterior" 
                            id="modalInputPrecioAnt" 
                            autofocus
                        >
                    </div>
                    <div class="mb-3 custom-file">
                        <input type="file" class="custom-file-input" id="modalInputImagen" lang="es" multiple>
                        <label class="custom-file-label" for="customFile" id="labelImgModal">Modificar Imagen</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="modalModifGuardar" data-dismiss="modal">Guardar Cambios</button>
                </div>
            </div>
        </div>
    `);

    contenedor.prepend( modalEdicion );

    const nodoCategorias = $( '#modalNodoCategorias' );
    const nodoGenero = $( '#modalNodoGenero' );
    const nodoTalle = $( '#modalNodoTalle' );

    const dataProductos = [];
    querySnapshot.forEach( doc => {
      // agregar productos formateados al array 'productos'
        dataProductos.push( doc.data() );

    })

    $( '#modalInputNombre' ).val( nombre );
    $( '#modalInputMarca' ).val( marca );
    $( '#modalInputPrecio' ).val( precio );

    const placeholderPrecioAnt = precioAnterior ?
                                    ( precioAnterior )
                                    : ('Precio Anterior (opcional)');
    $( '#modalInputPrecioAnt' ).val( placeholderPrecioAnt );


    cargarCategorias( dataProductos, nodoCategorias, 'modal', categoria );
    cargarGeneros( nodoGenero, 'modal', genero );
    cargarTalles( dataProductos, nodoTalle, 'modal', talle );
    
    eventosBotonesModal( prod.id );
}


const eventosBotonesModal = ( id ) => {
    const modalInputImagen = $( '#modalInputImagen' );
    modalInputImagen.change( () => {
        $( '#labelImgModal' ).html( modalInputImagen.val() );
    })


    const guardarBTN = $( '#modalModifGuardar' )
    guardarBTN.click( async () => {

        const valorNombre = $('#modalInputNombre').val();
        const valorMarca = $('#modalInputMarca').val();
        const valorCategoria = $('#categoriaSelectmodal').val() ?    
                                ( $('#categoriaSelectmodal').val() )
                                : ( $('#modalInputCategoria').val() );
        const valorGenero = $('#generoSelectmodal').val();
        const valorTalle = $('#talleSelectmodal').val() ?
                            ( $('#talleSelectmodal').val() )
                            : ( $('#modalInputTalle').val() );
        const valorPrecio = $('#modalInputPrecio').val();
        const valorPrecioAnterior = $('#modalInputPrecioAnt').val();
    
        const imagen = $('#modalInputImagen')[0].files;

        const valorImagen = $('#modalInputImagen').val();

        const multipleImagenes = $('#modalInputImagen')[0].files;
    
        const referenciaImagen = $('#modalInputImagen').val().length>0 ?
                                    $('#modalInputImagen')[0].files[0].name
                                    : (alert( 'Cargar Imagen'));
    
        const arrayImagenes = [];
        for ( let i=0; i<multipleImagenes.length; i++ ) {
    
            const imagenRef = multipleImagenes[i].name;
    
            const imagenStorage = await guardarImagenesStorage( imagenRef, multipleImagenes[i] );
    
            arrayImagenes.push( imagenStorage );
        }


        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        const productoEditado = {
            'nombre': valorNombre,
            'marca': valorMarca,
            'categoria': valorCategoria,
            'genero': valorGenero,
            'talle': valorTalle,
            'precio': valorPrecio,
            'precioAnterior': valorPrecioAnterior,
            'imagen': arrayImagenes,
            'registrado': timestamp
        }

        modificarProducto( id, productoEditado );

        const querySnapshot = await obtenerProductos();
        detallarProductosBD( querySnapshot );

    })

}