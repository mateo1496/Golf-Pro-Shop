const ofertaContainer = 
    document.getElementsByClassName('container-oferta');

const cargarPublicOferta = ( publicOferta ) => {
    if( publicOferta ) {
        publicOferta.forEach( prod => {
            return { seccion, titulo, imagen, adicional } = prod.data();
        })

        const ofertaDivContainer = document.createElement('div');
        ofertaDivContainer.setAttribute('class', 'container');
        
        ofertaDivContainer.innerHTML = `
        <div class="row justify-content-center">
            <div class="oferta-elementos offset-lg-0 col-lg-12 text-center">
                <div class="imagen-oferta-container">
                    <img class="img-fluid" src="img/product/publicaciones/${ imagen }" alt="img" />
                </div>
                <div class="offer_content">
                    <h3 class="text-uppercase mb-40">${ seccion }</h3>
                    <h2 class="text-uppercase">${ titulo }</h2>
                    <a href="#" class="main_btn mb-20 mt-5">Descubre Ahora</a>
                    <p>${ adicional }</p>
                </div>
            </div>
        </div>
        `;
        ofertaContainer[0].append( ofertaDivContainer );
    } else {
        const seccionOferta = document.getElementsByClassName( 'container-oferta' );
        seccionOferta[0].style.display = 'none';
    }
}