let vidaJugador = 100
let vidaCPU = 100

let jugador = "jugador"
let cpu = "cpu"

let agua = "agua"
let electricidad = "electricidad"
let fuego = "fuego"

let escudo = "escudo"
let gas = "gas"
let balas = "balas"

let aguaPos = 0
let electricidadPos = 1
let fuegoPos = 2

let escudoPos = 0
let gasPos = 1
let balasPos = 2

let juego = [];
for (let i = 0; i < 3; i++) {
    juego[i] = [];
}

juego[aguaPos][escudoPos] = 10;
juego[aguaPos][gasPos] = 20;
juego[aguaPos][balasPos] = 0;

juego[electricidadPos][escudoPos] = 0;
juego[electricidadPos][gasPos] = 10;
juego[electricidadPos][balasPos] = 20;

juego[fuegoPos][escudoPos] = 20;
juego[fuegoPos][gasPos] = 0;
juego[fuegoPos][balasPos] = 10;

let turno = 0

const ataques = [agua, electricidad, fuego]
const defensas = [escudo, gas, balas]


ocultarDefensa()

function atacarUsuario(ataque) {
    obtenerResultadoAtaque(ataque, obtenerDefensaAleatorio(), jugador)
}

function atacarCpu(defensa) {
    obtenerResultadoAtaque(obtenerAtaqueAleatorio(), defensa, cpu)
}


function obtenerResultadoAtaque(ataque, defensa, player) {
    let resultado = 0
    console.log(ataque)
    if(ataque == agua) {
        if(defensa == escudo) {
            resultado = juego[aguaPos][escudoPos]
        } else if(defensa == gas) {
            resultado = juego[aguaPos][gasPos]
        } else if(defensa == balas) {
            resultado = juego[aguaPos][balasPos]
        }
    }
    else if(ataque== electricidad) {
        if(defensa == escudo) {
            resultado = juego[electricidadPos][escudoPos]
        } else if(defensa == gas) {
            resultado = juego[electricidadPos][gasPos]
        } else if(defensa == balas) {
            resultado = juego[electricidadPos][balasPos]
        }
    } else if(ataque== fuego) {
        if(defensa == escudo) {
            resultado = juego[fuegoPos][escudoPos]
        } else if(defensa == gas) {
            resultado = juego[fuegoPos][gasPos]
        } else if(defensa == balas) {
            resultado = juego[fuegoPos][balasPos]
        }
    }


    if(player == cpu) {
        vidaJugador -= resultado
        turno = 0
        cambiarTurno("Turno del Jugador, selecciona un ataque")
        agregarJugada(defensa, ataque, resultado, vidaJugador, vidaCPU)
        ocultarDefensa()
    } else {
        vidaCPU-= resultado
        turno = 1
        cambiarTurno("Turno de la CPU, selecciona una defensa")
        agregarJugada(ataque, defensa, resultado, vidaJugador, vidaCPU)
        ocultarAtaque()
    }

    validarVida()
}

function validarVida() {
    if(vidaJugador <= 0) {
        preguntaTerminarJuego("CPU")
    }
    else if(vidaCPU <= 0) {
        preguntaTerminarJuego("Jugador Uno")
    }
}

function obtenerAtaqueAleatorio() {
    let aleatorio = Math.floor(Math.random() * ataques.length);
    let ataque = ataques[aleatorio];
    console.log("El ataque aleatorio "+ ataque)
    return ataque
}

function obtenerDefensaAleatorio() {
    let aleatorio = Math.floor(Math.random() * defensas.length);
    let defensa = defensas[aleatorio];
    console.log("La defensa aleatoria "+ defensa)
    return defensa
}


function mostrarResultado(texto) {
    document.getElementById("resultado").innerHTML = texto
}

function cambiarTurno(texto) {
    document.getElementById("turno").innerHTML = texto
}

function agregarJugada(jugador, cpu, resultado, vidaJugador, vidaCpu) {
    let tabla = document.getElementById("resultados");

    var fila = document.createElement("tr");
    var jugadorCelda = document.createElement("td");
    var cpuCelda = document.createElement("td");
    var resultadoCelda = document.createElement("td");
    var vidaJugadorCelda = document.createElement("td");
    var vidaCpuCelda = document.createElement("td");


    jugadorCelda.textContent = jugador
    cpuCelda.textContent = cpu
    resultadoCelda.textContent = resultado
    vidaJugadorCelda.textContent = vidaJugador
    vidaCpuCelda.textContent = vidaCPU

    fila.appendChild(jugadorCelda)
    fila.appendChild(cpuCelda)
    fila.appendChild(resultadoCelda)
    fila.appendChild(vidaJugadorCelda)
    fila.appendChild(vidaCpuCelda)

    tabla.appendChild(fila)
}


function ocultarAtaque() {
    document.getElementById("jugador").style.display = "none"
    document.getElementById("defensa").style.display = "block"
}

function ocultarDefensa() {
    document.getElementById("jugador").style.display = "block"
    document.getElementById("defensa").style.display = "none"
}

function preguntaTerminarJuego(ganador) {
    var result = confirm("El ganador del juego es "+ganador +" ¿Quieres iniciar una nueva partida?");
    if (result) {
        vidaCPU = 100
        vidaJugador = 100
    } else {
        alert("El usuario quiere salir")
    }
}