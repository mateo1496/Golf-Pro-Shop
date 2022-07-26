const nuevoDestacContainer = 
    document.getElementsByClassName('productos-nuevos');

export const cargarNuevoDestacado = ( id, nuevoDestacado ) => {

    const { nombre, talle , imagen } = nuevoDestacado;

    const contNuevoDest = document.createElement('div');
    contNuevoDest.setAttribute('class', 'col-lg-6');
    
    contNuevoDest.innerHTML = `
        <div class="new_product">
            <h5>LO ÚLTIMO</h5>
            <h3 class="text-uppercase">${ nombre }</h3>
            <div class="mt-3">
                <span class="mr-4 text-uppercase">Talle ${ talle }</span>
            </div>
            <div class="product-img">
                <img class="img-fluid" src="${ imagen }" alt="img" />
            </div>
            <a href="productoIndividual.html?id=${ id }" class="main_btn">Comprá Ahora</a>
        </div>
    `;

    nuevoDestacContainer[0].prepend( contNuevoDest );
    

}

