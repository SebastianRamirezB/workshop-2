const formulario = document.querySelector('#formulario-calculadora');
const resultado = document.querySelector('#resultado');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    calcularCalorias(event);
});

function calcularCalorias(event) {
    aparecerResultado();

    const {
        nombre,
        tipoDocumento,
        numeroDocumento,
        edad,
        peso,
        estatura,
        actividad,
        femenino,
        masculino,
    } = event.target;

    if (
        !(
            nombre.value &&
            tipoDocumento.value &&
            numeroDocumento.value &&
            edad.value &&
            peso.value &&
            estatura.value &&
            actividad.value
        )
    ) {
        mostrarMensajeDeError('Todos los campos son obligatorios');
        return;
    }

    const caloriasDiarias = calcularCaloriasTotales(
        peso,
        estatura,
        edad,
        actividad,
        femenino,
        masculino
    );

    const divResultado = document.createElement('div');
    divResultado.className =
        'd-flex justify-content-center align-items-center h-100';
    divResultado.id = 'calculo';
    divResultado.style.position = 'relative';
    divResultado.innerHTML = `<span class="alert alert-light m-0" style="position:absolute;top: calc(50% - 84px);right: 12px;padding: 4px 8px;z-index:10;outline: 1px solid black;font-weight: bold">${determinarGrupoPoblacional(
        edad.value
    )}</span>`;
    divResultado.innerHTML += `<span class="alert alert-success text-center m-0" style="padding:32px 28px">El paciente <strong>${nombre.value}</strong> identificado con ${tipoDocumento.value} No. <strong>${numeroDocumento.value}</strong>, requiere un total de <strong>${caloriasDiarias}</strong> kcal para el sostenimiento de su TBM</span>`;

    resultado.appendChild(divResultado);
}

function calcularCaloriasTotales(
    peso,
    estatura,
    edad,
    actividad,
    femenino,
    masculino
) {
    let calorias =
        actividad.value * (10 * peso.value) +
        6.25 * estatura.value -
        5 * edad.value;

    if (masculino.checked) {
        calorias += 5;
    } else if (femenino.checked) {
        calorias -= 161;
    }

    return calorias;
}

function determinarGrupoPoblacional(edad) {
    if (edad >= 15 && edad <= 29) {
        return 'Joven';
    } else if (edad >= 30 && edad <= 59) {
        return 'Adulto';
    } else if (edad >= 60) {
        return 'Adulto Mayor';
    } else {
        return 'Edad no válida';
    }
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className =
        'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
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
    }, 10);
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10);
}
