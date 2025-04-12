// Verificar acceso al panel de administración
document.addEventListener('DOMContentLoaded', function() {
    const _0x5e4d = [
        'split',
        'map',
        'join',
        'charCodeAt',
        'fromCharCode'
    ];

    const _secretCode = [
        '7#kP9$mN2@vX5*hJ8',
        'qR4%wL6^tY3&nB1$',
        'zC8#aE5@dF7*gH2!',
        'uI9$jK4^mL6&pQ3#',
        'xW1%cM8@bN5*vR7^',
        'sT2#hY9$kU4&wZ6*'
    ].join('');

    function _0xf4c3(input) {
        return input[_0x5e4d[0]]('')
            [_0x5e4d[1]](char => String[_0x5e4d[4]](char[_0x5e4d[3]](0) + 1))
            [_0x5e4d[2]]('');
    }

    const savedAccess = localStorage.getItem('adminAccess');
    if (!savedAccess || savedAccess !== btoa(_0xf4c3(_secretCode))) {
        window.location.href = 'verify.html';
        return;
    }

    // Toggle sidebar functionality
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        mainContent.classList.toggle('shifted');
    });

    // Inicializar el panel de administración
    initializeAdminPanel();
});

// Variables globales
let editingGameId = null;

// Función para inicializar el panel de administración
function initializeAdminPanel() {
    // Cargar configuración
    loadConfig();
    
    // Renderizar la tabla de juegos
    renderGamesTable();
    
    // Actualizar estadísticas
    updateStats();
    
    // Configurar eventos para las tarjetas de acción
    setupActionCards();
}

// Función para renderizar la tabla de juegos
function renderGamesTable() {
    const tableBody = document.querySelector('.admin-table tbody');
    tableBody.innerHTML = '';
    
    gamesConfig.games.forEach(game => {
        const row = document.createElement('tr');
        row.dataset.id = game.id;
        
        row.innerHTML = `
            <td>#${game.id}</td>
            <td>${game.title}</td>
            <td>${game.status}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editGame('${game.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteGame('${game.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Función para actualizar las estadísticas
function updateStats() {
    const totalGames = gamesConfig.games.length;
    const activeGames = gamesConfig.games.filter(game => game.status === 'Activo').length;
    
    // Actualizar las tarjetas de estadísticas
    document.querySelector('.stat-card:nth-child(1) p').textContent = '1,234'; // Usuarios (simulado)
    document.querySelector('.stat-card:nth-child(2) p').textContent = '56'; // Descargas (simulado)
    document.querySelector('.stat-card:nth-child(3) p').textContent = activeGames; // Juegos activos
}

// Función para configurar las tarjetas de acción
function setupActionCards() {
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.dataset.action;
            
            switch(action) {
                case 'add-game':
                    openGameModal();
                    break;
                case 'manage-users':
                    alert('Funcionalidad de gestión de usuarios en desarrollo');
                    break;
                case 'settings':
                    alert('Funcionalidad de configuración en desarrollo');
                    break;
            }
        });
    });
}

// Función para abrir el modal de juego (nuevo o edición)
function openGameModal(gameId = null) {
    editingGameId = gameId;
    const modal = document.getElementById('gameModal');
    const modalTitle = document.getElementById('modalTitle');
    const gameForm = document.getElementById('gameForm');
    
    // Configurar el título del modal
    modalTitle.textContent = gameId ? 'Editar Juego' : 'Añadir Juego';
    
    // Limpiar el formulario
    gameForm.reset();
    
    // Si es edición, cargar los datos del juego
    if (gameId) {
        const game = gamesConfig.games.find(g => g.id === gameId);
        if (game) {
            document.getElementById('gameTitle').value = game.title;
            document.getElementById('gameDescription').value = game.description;
            document.getElementById('gameImage').value = game.image;
            document.getElementById('gameSize').value = game.size;
            document.getElementById('gamePlayLink').value = game.playLink;
            document.getElementById('gameStatus').value = game.status;
        }
    }
    
    // Mostrar el modal
    modal.classList.add('active');
}

// Función para cerrar el modal de juego
function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
    editingGameId = null;
}

// Función para editar un juego
function editGame(gameId) {
    openGameModal(gameId);
}

// Función para eliminar un juego
function deleteGame(gameId) {
    if (confirm('¿Estás seguro de que deseas eliminar este juego?')) {
        // Encontrar el índice del juego
        const index = gamesConfig.games.findIndex(game => game.id === gameId);
        
        if (index !== -1) {
            // Eliminar el juego
            gamesConfig.games.splice(index, 1);
            
            // Guardar la configuración
            saveConfig();
            
            // Actualizar la tabla y las estadísticas
            renderGamesTable();
            updateStats();
        }
    }
}

// Función para generar un nuevo ID
function generateNewId() {
    const ids = gamesConfig.games.map(game => parseInt(game.id));
    const maxId = Math.max(...ids);
    return (maxId + 1).toString().padStart(3, '0');
}

// Función para guardar un juego (nuevo o edición)
function saveGame(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const title = document.getElementById('gameTitle').value;
    const description = document.getElementById('gameDescription').value;
    const image = document.getElementById('gameImage').value;
    const size = document.getElementById('gameSize').value;
    const playLink = document.getElementById('gamePlayLink').value;
    const status = document.getElementById('gameStatus').value;
    
    // Crear objeto de juego
    const gameData = {
        title,
        description,
        image,
        size,
        playLink,
        status
    };
    
    if (editingGameId) {
        // Editar juego existente
        const index = gamesConfig.games.findIndex(game => game.id === editingGameId);
        if (index !== -1) {
            gameData.id = editingGameId;
            gamesConfig.games[index] = gameData;
        }
    } else {
        // Añadir nuevo juego
        gameData.id = generateNewId();
        gamesConfig.games.push(gameData);
    }
    
    // Guardar la configuración
    saveConfig();
    
    // Cerrar el modal
    closeGameModal();
    
    // Actualizar la tabla y las estadísticas
    renderGamesTable();
    updateStats();
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('adminAccess');
    window.location.href = 'verify.html';
} 