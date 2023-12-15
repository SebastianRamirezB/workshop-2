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
        documento,
        numeroDocumento,
        edad,
        peso,
        altura,
        actividad,
        femenino,
        masculino,
    } = event.target;


    const {esFormularioValido, mensajeError} = validarFormulario(
        nombre,
        documento,
        numeroDocumento,
        edad,
        peso,
        altura,
        actividad
    );

    if(!esFormularioValido) {
        mostrarMensajeDeError(`Los siguientes campos no pueden estar vacíos ${mensajeError.join(', ')}`);
        return;
    }

    const caloriasPorDia = calcularCaloriasPorDia(
        femenino,
        masculino,
        actividad,
        peso,
        altura,
        edad
    );


    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
               <p>
                    El paciente ${nombre.value} identificado con  ${
        documento.value
    }
                    NO. ${
                        numeroDocumento.value
                    }, requiere un total de  ${Math.floor(
        caloriasPorDia
    )} kcal para el sostenimiento de su TBM
               </p>
               <p>Grupo Poblacional: ${grupoPoblacional(edad.value)}</p>
            </div>
        </div>
    `;

    formulario.reset();
}

function calcularCaloriasPorDia(
    femenino,
    masculino,
    actividad,
    peso,
    altura,
    edad
) {
    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5,
    };

    if (masculino.checked) {
        return (
            actividad.value *
                (multiplicadorTMB.peso * peso.value +
                    multiplicadorTMB.altura * altura.value -
                    multiplicadorTMB.edad * edad.value) +
            5
        );
    } else if (femenino.checked) {
        return (
            actividad.value *
                (multiplicadorTMB.peso * peso.value +
                    multiplicadorTMB.altura * altura.value -
                    multiplicadorTMB.edad * edad.value) -
            161
        );
    }
}

function grupoPoblacional(edad) {
    if (edad >= 15 && edad <= 29) {
        return 'Joven';
    } else if (edad >= 30 && edad <= 59) {
        return 'Adulto';
    } else {
        return 'Adulto mayor';
    }
}

function validarFormulario(
    nombre,
    documento,
    numeroDocumento,
    edad,
    peso,
    altura,
    actividad
) {
    const mensajeError = [];
    let esFormularioValido = false;

 

    if(nombre.value.length <= 0) {
        mensajeError.push('nombre'); 
    }
    if(documento.value.length <= 0) {
        mensajeError.push('Tipo de documento'); 
    }
    if(numeroDocumento.value.length <= 0) {
        mensajeError.push('número de documento')
    }
    if(edad.value.length <= 0) {
        mensajeError.push('edad')
    }
    if(peso.value.length <= 0) {
        mensajeError.push('peso')
    }
    if(altura.value.length <= 0) {
        mensajeError.push('altura')
    }
    if(actividad.value.length <= 0) {
        mensajeError.push('actividad física'); 
    }


    if(mensajeError.length === 0) {
        esFormularioValido = true;
    }


    return {
        esFormularioValido,
        mensajeError
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
