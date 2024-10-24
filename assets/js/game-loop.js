  var time = new Date();
  var deltaTime = 0;
  
  if(document.readyState === "complete" || document.readyState === "interactive"){
      setTimeout(Init, 1);
  }else{
      document.addEventListener("DOMContentLoaded", Init); 
  }
  
  function Init() {
      time = new Date();
      Start();
  
      // No iniciar el loop hasta que el jugador haga clic en el botón de comenzar
      document.getElementById("start-btn").addEventListener("click", StartGame);
  }
  
  function StartGame() {
      // Ocultar pantalla de inicio
      document.getElementById("start-screen").style.display = "none";
  
      // Iniciar música de fondo
      var backgroundMusic = document.getElementById("backgroundMusic");
      backgroundMusic.volume = 0.2; 
      if (backgroundMusic.paused) {
          backgroundMusic.play().catch(function(error) {
              console.log("Error al intentar reproducir la música de fondo: ", error);
          });
      }
  
      tiempoHastaObstaculo = 3;
  
      // Iniciar el loop del juego
      Loop();
  }
  
  function Loop() {
      deltaTime = (new Date() - time) / 1000;
      time = new Date();
      Update();
      requestAnimationFrame(Loop);
  }
