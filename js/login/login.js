import { autenticarConGoogle } from '../data/firebase.js';

const loginBTN = document.querySelector( '#loginUsuario' );
loginBTN.addEventListener( 'click', ()=> {
    autenticarConGoogle();
})


