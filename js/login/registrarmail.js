import { autenticarConGoogle } from '../data/firebase.js';


export const eventoRegistrarMailFooter = () => {

    const registrarMailBTN = $( '#botonRegistrarMail' );
    registrarMailBTN.click( () => {
        autenticarConGoogle();
    })
}