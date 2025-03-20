document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    let columnasColocadas = 0;
    let columnas = [];
    let tanqueMostrado = false;
    let accionDetenida = false;
    
    for (let i = 0; i < 10; i++) {
        let columna = document.createElement("div");
        columna.classList.add("columna");
        columna.style.left = `${i * 80 + 40}px`;
        gameContainer.appendChild(columna);
        columnas.push(columna);

        columna.addEventListener("click", () => colocarEscalera(columna));
    }

    function colocarEscalera(columna) {
        if (columna.dataset.usada || accionDetenida) return;
        
        let escalera = document.createElement("div");
        escalera.classList.add("escalera");
        escalera.style.left = columna.style.left;
        escalera.style.bottom = "0px";
        gameContainer.appendChild(escalera);
        escalera.style.display = "block";
        
        let anciano = document.createElement("div");
        anciano.classList.add("anciano");
        anciano.style.left = columna.style.left;
        anciano.style.bottom = "60px";
        gameContainer.appendChild(anciano);
        
        setTimeout(() => {
            anciano.style.display = "block";
            anciano.style.bottom = "180px";
            setTimeout(() => {
                anciano.style.bottom = "70px";
                columnasColocadas++;
                columna.dataset.usada = true;
                if (columnasColocadas === 3 && !tanqueMostrado) mostrarTanque();
                if (columnasColocadas === 10) mostrarFinal();
            }, 2000);
        }, 500);
    }

    function mostrarTanque() {
        tanqueMostrado = true;
        accionDetenida = true;
        let tanque = document.createElement("img");
        tanque.src = "tanque.png";
        tanque.classList.add("tanque");
        gameContainer.appendChild(tanque);

        tanque.addEventListener("click", () => lanzarMolotov(tanque));
    }

    function lanzarMolotov(tanque) {
        let explosion = document.createElement("div");
        explosion.classList.add("explosion");
        gameContainer.appendChild(explosion);
        
        setTimeout(() => {
            explosion.style.display = "none";
            destruirTanque(tanque);
        }, 1000);
    }

    function destruirTanque(tanque) {
        let soldado = document.createElement("img");
        soldado.src = "soldado.png";
        soldado.classList.add("soldado-en-llamas");
        gameContainer.appendChild(soldado);

        let fuego = document.createElement("div");
        fuego.classList.add("fuego");
        gameContainer.appendChild(fuego);

        let animacionFuego = setInterval(() => {
            fuego.style.left = soldado.style.left;
        }, 50);

        setTimeout(() => {
            clearInterval(animacionFuego);
            soldado.style.display = "none";
            fuego.style.display = "none";
            tanque.style.display = "none";
            accionDetenida = false;
        }, 7000);
    }

    function mostrarFinal() {
        document.getElementById("mensaje-final").style.display = "block";
    }
});
