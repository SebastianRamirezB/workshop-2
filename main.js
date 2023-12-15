const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
  evento.preventDefault();
  calcularCalorias();
});

function calcularCalorias() {
  const nombreInput = document.getElementById('nombre');
  const tipoDocumentoInput = document.getElementById('tipo-documento');
  const numeroDocumentoInput = document.getElementById('numero-documento');
  const edadInput = document.getElementById('edad');
  const pesoInput = document.getElementById('peso');
  const estaturaInput = document.getElementById('estatura');
  const actividadInput = document.getElementById('actividad');
  const sexoInput = document.querySelector('input[name="genero"]:checked');

  const nombre = nombreInput.value;
  const tipoDocumento = tipoDocumentoInput.value;
  const numeroDocumento = numeroDocumentoInput.value;
  const edad = parseInt(edadInput.value);
  const peso = parseFloat(pesoInput.value);
  const estatura = parseInt(estaturaInput.value);
  const actividad = parseFloat(actividadInput.value);
  const sexo = sexoInput.value;

  const informacionPaciente = {
    nombre,
    tipoDocumento,
    numeroDocumento
  };

  const datosPaciente = {
    edad,
    peso,
    estatura,
    actividad,
    sexo
  };

  const calorias = calcularCaloriasTotales({ datosPaciente });

  mostrarResultado({ informacionPaciente, calorias, edad });
}

function calcularCaloriasTotales({ datosPaciente }) {
  const { edad, peso, estatura, actividad, sexo } = datosPaciente;

  let calorias = actividad * (10 * peso) + 6.25 * estatura - 5 * edad;

  if (sexo === 'masculino') {
    calorias += 5;
  } else {
    calorias -= 161;
  }

  return calorias;
}

function mostrarResultado({ informacionPaciente, calorias, edad }) {
  resultado.innerHTML = '';

  let grupoPoblacional = '';
  const { nombre, tipoDocumento, numeroDocumento } = informacionPaciente;
  const numeroCalorias = new Intl.NumberFormat().format(calorias);

  if (edad < 30) {
    grupoPoblacional = 'Joven';
  } else if (edad < 60) {
    grupoPoblacional = 'Adulto';
  } else {
    grupoPoblacional = 'Adulto mayor';
  }

  const divResultado = document.createElement('div');
  divResultado.className =
    'd-flex justify-content-center align-items-center h-100';
  divResultado.id = 'calculo';
  divResultado.style.position = 'relative';
  divResultado.innerHTML = `<span class="alert alert-light m-0" style="position:absolute;top: calc(50% - 84px);right: 12px;padding: 4px 8px;z-index:10;outline: 1px solid black;font-weight: bold">${grupoPoblacional}</span>`;
  divResultado.innerHTML += `<span class="alert alert-success text-center m-0" style="padding:32px 28px">El paciente <strong>${nombre}</strong> identificado con ${tipoDocumento} No. <strong>${numeroDocumento}</strong>, requiere un total de <strong>${numeroCalorias}</strong> kcal para el sostenimiento de su TBM</span>`;

  resultado.appendChild(divResultado);

  aparecerResultado();
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

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

function aparecerResultado() {
  resultado.style.top = '100vh';
  resultado.style.display = 'block';

  const distancia = 100;
  let resta = 0.3;

  const interval = setInterval(() => {
    resta *= 1.1;

    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(interval);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  const interval = setInterval(() => {
    distancia *= 2;

    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      resultado.style.display = 'none';
      resultado.style.top = 0;

      clearInterval(interval);
    }
  }, 10);
}
