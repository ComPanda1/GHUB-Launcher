const config = {
    sections: {
        accion: {
            enabled: true,
            title: "Acción",
            games: [
                {
                    title: "Counter-Strike 2",
                    description: "Juego de disparos táctico en primera persona.",
                    image: "../assets/game1.jpg",
                    size: "25 GB",
                    playLink: "#"
                },
                {
                    title: "Call of Duty",
                    description: "Experimenta intensas batallas multijugador.",
                    image: "../assets/game2.jpg",
                    size: "85 GB",
                    playLink: "#"
                }
            ]
        },
        aventura: {
            enabled: true,
            title: "Aventura",
            games: [
                {
                    title: "Minecraft",
                    description: "Explora, construye y sobrevive en un mundo abierto.",
                    image: "../assets/game3.jpg",
                    size: "2.5 GB",
                    playLink: "#"
                }
            ]
        },
        estrategia: {
            enabled: false, // Esta sección no mostrará juegos
            title: "Estrategia",
            games: []
        },
        rpg: {
            enabled: true,
            title: "RPG",
            games: [
                {
                    title: "The Witcher 3",
                    description: "Embárcate en una épica aventura de fantasía.",
                    image: "../assets/game4.jpg",
                    size: "50 GB",
                    playLink: "#"
                }
            ]
        }
    }
};

// Configuración de juegos
const gamesConfig = {
    games: [
        {
            id: "001",
            title: "Minecraft",
            description: "Juego de construcción y aventura en un mundo infinito",
            image: "../assets/games/minecraft.jpg",
            size: "2.5 GB",
            status: "Activo",
            playLink: "https://www.minecraft.net/es-es"
        },
        {
            id: "002",
            title: "Fortnite",
            description: "Battle Royale donde 100 jugadores luchan por ser el último en pie",
            image: "../assets/games/fortnite.jpg",
            size: "26 GB",
            status: "Activo",
            playLink: "https://www.fortnite.com/"
        },
        {
            id: "003",
            title: "Among Us",
            description: "Juego de deducción social donde debes encontrar al impostor",
            image: "../assets/games/amongus.jpg",
            size: "250 MB",
            status: "Inactivo",
            playLink: "https://www.innersloth.com/games/among-us/"
        }
    ]
};

// Guardar configuración en localStorage
function saveConfig() {
    localStorage.setItem('gamesConfig', JSON.stringify(gamesConfig));
}

// Cargar configuración desde localStorage
function loadConfig() {
    const savedConfig = localStorage.getItem('gamesConfig');
    if (savedConfig) {
        Object.assign(gamesConfig, JSON.parse(savedConfig));
    }
}

// Inicializar configuración
loadConfig(); 