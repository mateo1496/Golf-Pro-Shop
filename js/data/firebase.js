// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getFirestore,
        collection,
        getDocs,
        getDoc,
        addDoc,
        setDoc,
        deleteDoc,  
        doc,
        where,
        query,
        orderBy
    } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js';
import { getAuth, signInWithPopup, GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";
import { habilitarAdmin } from "../adminForm/admin-funciones.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyD7c9c_Zmc-m7ElCSraKz1-zSB3Km89vGE",
authDomain: "golf-pro-shop-af3f3.firebaseapp.com",
projectId: "golf-pro-shop-af3f3",
storageBucket: "golf-pro-shop-af3f3.appspot.com",
messagingSenderId: "565940182116",
appId: "1:565940182116:web:9d10cd2156cd3a14c2d371",
measurementId: "G-7R0SJ952S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//  base de datos
const db = getFirestore();


// =================== Firebase Auth =====================
// autenticación
export const auth = getAuth();
// chequear estado de login
auth.onAuthStateChanged( user => {
    const iconoLog = document.getElementById( 'iconoLog' );
    const iconoLlaveAdm = document.getElementById( 'botonLlaveAdmin' );

    if ( user ) {

        // chequear si el usuario está en "index.html"
        if ( window.location.pathname !== '/admin-form.html' ) {
            iconoLog.classList.remove( 'ti-user' );
            iconoLog.setAttribute( 'class', 'ti ti-close' );
        }
        validarAdministrador();

    } else {
        iconoLog.classList.remove( 'ti' );
        iconoLog.classList.remove( 'ti-close' );
        iconoLog.setAttribute( 'class', 'ti-user' );
        iconoLlaveAdm.style.visibility = 'hidden';
    }
})

export const autenticarConGoogle = () => {
    const estadoLog = auth.currentUser;
    
    if ( estadoLog ) {
        auth.signOut();
    } else {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });   
    }
}

// obtener administrador
export const validarAdministrador = async () => {
    const docRef = doc( db, 'adminAuth', 'x0MTIiy5NFSek0RwPXGDVjJrdbp2' );
    const docSnap = await getDoc( docRef );
    const { email, uid } = docSnap.data();

    let administrador = '';
    const user = auth.currentUser;

    if ( user ) {
        if ( user.email === email && user.uid === uid ) {
            habilitarAdmin( user, docSnap.data() );
            console.log('ADMIN')
            administrador = true;
        } else {
            console.log( 'USER' )
            administrador = false;
        }
    }

    return administrador;
}
// =================== Fin Firebase Auth =====================


// =================== Firebase Firestore =====================
// función para obtener productos
export const obtenerProductos = ( valoresFiltro ) => {

    // ordenPrecio: valor "1" = precio menor a mayor
    // ordenPrecio: valor "2" = precio mayor a menor
    let ordenPrecio = false;
    if ( document.getElementById( 'selectOrdenar' ) ) {
        const valorOrden = document.getElementById( 'selectOrdenar' ).value;
        switch( valorOrden ) {
            case '1':
                ordenPrecio = 'desc';
                break;
            case '2':
                ordenPrecio = 'asc';
                break;
            default:
                ordenPrecio = false;
                break;
        }
    }

    // verifica si no hay filtro por propiedad
    if ( !valoresFiltro ) {

        let coleccion  = collection( db, 'productos' );

        // ordena por precio
        if ( ordenPrecio ) {
            coleccion = query( coleccion, orderBy( 'precio', ordenPrecio ))
        }

        const productos = getDocs( coleccion );
        
        return productos;

    } else {

        for ( const propiedad in valoresFiltro ) {
            let coleccion  = collection( db, 'productos' );
            
            // ordena por precio
            let productosFiltrados;
            if ( ordenPrecio ) {
                productosFiltrados = query( coleccion, where( `${ propiedad }`, '==', `${ valoresFiltro[ propiedad ] }` ), orderBy( 'precio', ordenPrecio ));
            } else {
                productosFiltrados = query( coleccion, where( `${ propiedad }`, '==', `${ valoresFiltro[ propiedad ] }` ));
            }

            const productos = getDocs( productosFiltrados );
            return productos;
        }
    }
};

// función para obtener publicación destacada
export const obtenerNuevoDestacado = () => {
    const nuevoDestacado = getDocs( collection( db, 'nuevoDestacado' ));
    return nuevoDestacado;
}

export const obtenerUnicoProducto = ( id ) => {
    // consulta producto por id
    const docRef  = doc( db, 'productos', id );

    const docSnap = getDoc( docRef );

    return docSnap;
}



export const agregarProducto = async ( nuevoProducto ) => {

    await addDoc(collection(db, "productos"), {
        nombre: nuevoProducto.nombre,
        marca: nuevoProducto.marca,
        categoria: nuevoProducto.categoria,
        genero: nuevoProducto.genero,
        imagen: nuevoProducto.imagen,
        precio: nuevoProducto.precio,
        precioAnterior: nuevoProducto.precioAnterior,
        registrado: nuevoProducto.registrado,
        destacado: nuevoProducto.destacado
    });

    document.getElementById( 'formAdminPrincipal' ).reset();

}


export const modificarProducto = async ( id, prodEditado ) => {

    const { 
        nombre,
        marca,
        categoria,
        genero,
        talle,
        imagen,
        precio,
        precioAnterior,
        registrado
    } = prodEditado;

    await setDoc(doc(db, "productos", id ), {
        nombre,
        marca,
        categoria,
        genero,
        talle,
        imagen,
        precio,
        precioAnterior,
        registrado
    })
}


export const eliminarProducto = async ( id ) => {
    await deleteDoc(doc( db, "productos", id ));
}

// =================== Fin Firebase Firestore =====================

// =================== Firebase Storage =====================

export const guardarImagenesStorage = ( imagenRef, imagenFile ) => {

    const storage = getStorage();

    const referenciaImagen = ref( storage, `imagenes/${ imagenRef }` );

    const imagenURL = uploadBytes( referenciaImagen, imagenFile ).then((snapshot) => {
        return getDownloadURL( referenciaImagen )
    });

    return imagenURL;

}

// =================== Firebase Storage =====================
