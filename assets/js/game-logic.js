var sueloY = 22;
var velY = 0;
var impulso = 1500;
var gravedad = 1900;

var dogPosX = 42;
var dogPosY = sueloY; 

var sueloX = 0;
var velEscenario = 1280/3;
var gameVel = 1;
var score = 0;

var parado = false;
var saltando = false;

var tiempoHastaObstaculo = 3;
var tiempoObstaculoMin = 1.5;
var tiempoObstaculoMax = 3;
var obstaculoPosY = 16;
var obstaculos = [];

var tiempoHastaNube = 0.5;
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 270;
var minNubeY = 100;
var nubes = [];
var velNube = 0.5;

var contenedor;
var dog;
var textoScore;
var suelo;
var gameOver;
var restartBtn;

function Start() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dog = document.querySelector(".dog");
    restartBtn = document.getElementById("restart-btn");
    document.addEventListener("keydown", HandleKeyDown);

    // Añadir evento al botón de reinicio
    restartBtn.addEventListener("click", function() {
        location.reload(); 
    });
}

function Update() {
    if(parado) return;
    
    Moverdog();
    MoverSuelo();
    DecidirCrearObstaculos();
    DecidirCrearNubes();
    MoverObstaculos();
    MoverNubes();
    DetectarColision();

    velY -= gravedad * deltaTime;
}

function HandleKeyDown(ev){
    if(ev.keyCode == 32){
        Saltar();
    }
}

function Saltar(){
    if(dogPosY === sueloY){
        saltando = true;
        velY = impulso;
        dog.classList.remove("dog-corriendo");

        // Reproducir el sonido de salto
        var jumpSound = document.getElementById("jumpSound");
        jumpSound.play(); 
    }
}

function Moverdog() {
    dogPosY += velY * deltaTime;
    if(dogPosY < sueloY){
        TocarSuelo();
    }
    dog.style.bottom = dogPosY+"px";
}

function TocarSuelo() {
    dogPosY = sueloY;
    velY = 0;
    if(saltando){
        dog.classList.add("dog-corriendo");
    }
    saltando = false;
}

function MoverSuelo() {
    sueloX += CalcularDesplazamiento();
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
}

function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}

function MostrarPantallaVictoria() {
    parado = true; 

    // Pausar la música de fondo
    var backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.pause(); 

    // Mostrar la pantalla de victoria
    document.getElementById("win-screen").style.display = "block";

    // Reproducir el sonido de victoria
    var victorySound = document.getElementById("victorySound");
    victorySound.currentTime = 0;  
    victorySound.play().catch(function(error) {
        console.log("Error al reproducir el sonido de victoria: ", error);
    });

}

function GameOver() {
    Estrellarse();

    // Reproducir sonido de choque
    var crashSound = document.getElementById("crashSound");
    crashSound.play();

    // Añadir un delay de 500ms antes de reproducir el sonido de Game Over
    setTimeout(function() {
        var gameOverSound = document.getElementById("gameOverSound");
        gameOverSound.play();
    }, 500); 

    gameOver.style.display = "block";
    restartBtn.style.display = "block"; // Mostrar botón de reinicio
}
