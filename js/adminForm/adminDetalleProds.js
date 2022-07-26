import { eliminarProducto, obtenerProductos } from '../data/firebase.js';

import { crearModalEdicion } from './modalEdicion.js';


export const detallarProductosBD = ( querySnapshot ) => {
    const contenedorTabla = $( '#tablaProductos' )
    contenedorTabla.empty();
    const nombreTabla = $( '<h3/>' ).html( 'Detalle de Productos' );
    contenedorTabla.prepend( nombreTabla );

    const tablaDetalle = $('<table/>');
    tablaDetalle.attr('class', 'table table-active capitaliza');
    
    // crear encabezados 
    const filaEncabezado = $("<tr/>");
    filaEncabezado.attr( 'class', 'table-success' );
    const arrayEncabezado = [
        'ID',
        'nombre',
        'marca',
        'categoria',
        'género',
        'talle',
        'precio',
        'precio anterior',
        'destacado',
        'imagen',
        'acciones'
    ]

    // cargar productos
    arrayEncabezado.map( elem => {
        const tituloEncabezado = $( "<th/>" ).html( elem );
        tituloEncabezado.attr( 'id', 'encabezadoTablaProds' );
        tituloEncabezado.attr( 'class', 'table-primary encabezado-detalle-style' );

        filaEncabezado.append( tituloEncabezado );
        tablaDetalle.append( filaEncabezado );
    })
    tablaDetalle.append( filaEncabezado );


    // agrega productos a la tabla
    querySnapshot.forEach( prod => {

        const { nombre,
            marca,
            categoria, 
            genero,
            talle,
            precio,
            precioAnterior,
            destacado,
            imagen
        } = prod.data();

        const filaProducto = $( '<tr/>' );
        filaProducto.attr( 'class', 'fila-detalle-styles')

        const celdaID = $( '<td/>' ).html( prod.id );
        const celdaNombre = $( '<td/>' ).html( nombre );
        const celdaMarca = $( '<td/>' ).html( marca );
        const celdaCategoria = $( '<td/>' ).html( categoria );
        const celdaGenero = $( '<td/>' ).html( genero );
        const celdaTalle = $( '<td/>' ).html( talle );
        celdaTalle.attr( 'class', 'mayusculas' );
        const celdaPrecio = $( '<td/>' ).html( precio );
        const celdaPrecioAnt = $( '<td/>' ).html( precioAnterior );
        celdaPrecioAnt.attr( 'class', 'tachado' );
        const celdaDestacado = $( '<td/>' ).html( destacado ? ( 'Sí' ) : ( 'No' ) );
        const celdaImagen = $( '<td/>' ).html(`
            <img
                src='${ imagen[0] }'
                alt="img"
                id='imagenDetalle'
            >
        ` );

        filaProducto.append( celdaID );
        filaProducto.append( celdaNombre );
        filaProducto.append( celdaMarca );
        filaProducto.append( celdaCategoria );
        filaProducto.append( celdaGenero );
        filaProducto.append( celdaTalle );
        filaProducto.append( celdaPrecio );
        filaProducto.append( celdaPrecioAnt );
        filaProducto.append( celdaDestacado );
        filaProducto.append( celdaImagen );

        // agrega botones "editar" y "borrar"
        agregarBotones( filaProducto, prod.id );

        tablaDetalle.append( filaProducto );

    });

    contenedorTabla.append( tablaDetalle );

    agregarFuncionalidadBTNs( querySnapshot, tablaDetalle );

}

export default detallarProductosBD;

const agregarBotones = ( filaProducto, id ) => {
    const botonEditar = $( '<button/>' );
    botonEditar.attr( 'class', `botones-func-detalle` );
    botonEditar.attr( 'id', `editar${ id }` );
    botonEditar.html(`
            <img
                src='/fonts/pencil-square.svg'
                alt="Editar"
                class='icono-admin'
            >
    `);
    const botonEliminar = $( '<button/>' );
    botonEliminar.attr( 'id', `borrar${ id }` );
    botonEliminar.html(
        `
            <img
                src='/fonts/trash.svg'
                alt="Eliminar"
                class='icono-admin'
            >
        ` 
    );

    filaProducto.append( botonEditar );
    filaProducto.append( botonEliminar );

}


const agregarFuncionalidadBTNs = ( querySnapshot, contenedor ) => {

    querySnapshot.forEach( el => {
        const { id } = el;
        const btnEditar = $( `#editar${ id }` );
        btnEditar.attr( 'type', 'button' );
        btnEditar.attr( 'data-toggle', 'modal' );
        btnEditar.attr( 'data-target', `#modal${ id }` );
        btnEditar.click( () => {
            // crea el modal de edición
            crearModalEdicion( el, contenedor, querySnapshot );
        });
    
        const btnEliminar = $( `#borrar${ id }` )
        btnEliminar.click( async () => {
            eliminarProducto( id );

            // para actualizar la tabla
            const querySnapshot = await obtenerProductos();
            detallarProductosBD( querySnapshot );
        })
    });

}

