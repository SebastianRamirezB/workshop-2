const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (event) => {
    event.preventDefault();
    calcularCalorias();
})

function calcularCalorias() {

    aparecerResultado();

    const nombre = document.querySelector('#nombre');
    const documento = document.querySelector('input[name="documento"]:checked');
    const num_document = document.querySelector('#num_document');
    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso');
    const altura = document.querySelector('#altura');
    const actividad = document.querySelector('#actividad');
    const genero = document.querySelector('input[name="genero"]:checked');
    const grupoPoblacional = determinarGrupoPoblacional(edad.value);

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }
    if (!(nombre.value && documento.value && num_document.value && edad.value && peso.value && altura.value && actividad.value)) {
        mostrarMensajeDeError('Todos los campos son obligatorios');
        return;
    }

    let calcularCalorias = 0;
    if (genero.value === "M") {

        calcularCalorias = actividad.value * (multiplicadorTMB.peso * peso.value +
            multiplicadorTMB.altura * altura.value -
            multiplicadorTMB.edad * edad.value) + 5;
    } else {
        calcularCalorias = actividad.value * (multiplicadorTMB.peso * peso.value +
            multiplicadorTMB.altura * altura.value -
            multiplicadorTMB.edad * edad.value) - 161;
    }

    resultado.innerHTML = `
        <div class="card-body d-flex flex-column align-items-center justify-content-center h-100" id="calculo">

                <h5 class="card-title" style="font-size: 2.5rem;">Calorias requeridas</h5>
            <div class="mb-3 w-100 d-flex flex-column justify-content-center align-items-center">

                <p style="font-size: 1.5rem;">El paciente <span class="fw-bold">${nombre.value}</span>, identificado con <span class="fw-bold">${documento.value}</span> NO. <span class="fw-bold">${num_document.value}</span>, requiere un total de 
                <span class="fw-bold" style="background-color: rgb(0, 45, 0);
                color: #fff; 
                border-radius: 10px; padding: 5px">${Math.floor(calcularCalorias)}</span> kcal para el sostenimiento de su TBM</p>

                <br>

                <span class="fw-bold" style="font-size: 1.5rem;">Grupo poblacional: ${grupoPoblacional}</span>
            </div>
        </div>
    `;

    formularioCalculadora.reset();

}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';

    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}
function determinarGrupoPoblacional(edad) {
    if (edad >= 15 && edad <= 29) {
        return "Joven";
    } else if (edad >= 30 && edad <= 59) {
        return "Adulto";
    } else if (edad >= 60) {
        return "Adulto Mayor";
    } else {
        return "Edad no válida";
    }
}
