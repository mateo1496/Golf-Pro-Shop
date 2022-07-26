import { obtenerProductos,
        obtenerNuevoDestacado,
        } from './data/firebase.js';
import { cargarProductosDestacados } from './productos-destacados.js';
import { cargarProdsNuevos } from './productos-nuevos.js';
import { mostrarProductos } from './productos-main.js';
import { actualizarCarritoBadge } from './carrito.js';
import { eventoRegistrarMailFooter } from './login/registrarmail.js';


window.addEventListener( 'DOMContentLoaded', async () => {
    
    const querySnapshot = await obtenerProductos();

    // carga productos destacados
    cargarProductosDestacados( querySnapshot );

    // Productos Nuevos
    cargarProdsNuevos( querySnapshot );

    // productos main
    mostrarProductos( querySnapshot );

    // actulizar icono carrito
    actualizarCarritoBadge();

    // agrega evento para registrar mail
    eventoRegistrarMailFooter();


});
