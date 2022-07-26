import { obtenerProductos,
    validarAdministrador,
    } from '../data/firebase.js';
import cargarFormulario from './admin-inputs.js';
import detallarProductosBD from './adminDetalleProds.js';

const nodoForm = $( '#formContainer' );
const nodoTabla = $( '#tablaProductos' );
nodoTabla.hide();

window.addEventListener( 'DOMContentLoaded', async () => {
    
    const administrador = await validarAdministrador();
    
    if ( administrador ) {
        const querySnapshot = await obtenerProductos();

        // let prodDestacados = [];
        let categoriasProds = [];
        querySnapshot.forEach( doc => {
            // agregar productos formateados al array 'productos'
            categoriasProds.push( doc.data() );
        })


        cargarFormulario( categoriasProds );

        // botones funciones
        const botonCargarForm = $( '#botonCargarProds');
        botonCargarForm.click( () => {
            nodoTabla.hide();
            nodoForm.show();
        })

        const botonFormOferta = $( '#botonCargarOferta');
        botonFormOferta.click( () => cargarAdministadorOferta() );


        const botonDetalleProds = $( '#botonDetalleProds');
        botonDetalleProds.click( () => {
            nodoForm.hide();
            nodoTabla.show();
            detallarProductosBD( querySnapshot );
        })
    } else if ( !administrador && window.location.pathname === '/admin-form.html' ) {
        location.href = 'index.html'
    }
})


export const habilitarAdmin = ( user, docSnap ) => {
    // esta condición se agrega porque si se loguea el administrador 
    // y no existe el id 'botonLlaveAdmin', genera conflicto
    if ( window.location.pathname === '/index.html' 
        || window.location.pathname === '/productos.html') {
        
        const iconoLlaveAdm = document.getElementById( 'botonLlaveAdmin' );
        iconoLlaveAdm.removeAttribute( 'hidden');
        iconoLlaveAdm.style.visibility = "visible"
        funcionLlaveAdminBTN();

    } else if ( window.location.pathname === '/admin-form.html' ) {
        agregarEventoHomeBTN();
    }

} 

const funcionLlaveAdminBTN = () => {
    const botonPanelAdmin = document.getElementById( 'botonLlaveAdmin' );
    botonPanelAdmin.addEventListener( 'click', () => {
        location.href = 'admin-form.html'
    })
}

const agregarEventoHomeBTN = () => {
    const botonHomeADM = document.getElementById( 'volverIndex' );
    botonHomeADM.addEventListener( 'click', ()=> location.href = 'index.html' );
}
