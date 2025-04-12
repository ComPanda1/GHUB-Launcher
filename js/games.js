document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        mainContent.classList.toggle('shifted');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
            sidebar.classList.remove('active');
            toggleBtn.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });

    // Sample games data (replace with your actual games data)
    const games = [
        {
            title: 'Ejemplo de Juego 1',
            description: 'Una descripción emocionante del primer juego.',
            image: '../assets/images/game1.jpg',
            players: '1-4',
            rating: '4.5'
        },
        {
            title: 'Ejemplo de Juego 2',
            description: 'Descripción del segundo juego con características únicas.',
            image: '../assets/images/game2.jpg',
            players: '2-8',
            rating: '4.8'
        }
    ];

    // Render games
    const gamesGrid = document.querySelector('.games-grid');
    
    if (games.length === 0) {
        gamesGrid.innerHTML = `
            <div class="no-games">
                <i class="fas fa-gamepad"></i>
                <h2>No hay juegos disponibles</h2>
                <p>Vuelve más tarde para ver nuevos juegos.</p>
            </div>
        `;
    } else {
        gamesGrid.innerHTML = games.map(game => `
            <div class="game-card">
                <img src="${game.image}" alt="${game.title}" class="game-image">
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-description">${game.description}</p>
                    <div class="game-meta">
                        <span><i class="fas fa-users"></i>${game.players} jugadores</span>
                        <span><i class="fas fa-star"></i>${game.rating}</span>
                    </div>
                    <a href="#" class="play-button">
                        <i class="fas fa-play"></i>
                        Jugar ahora
                    </a>
                </div>
            </div>
        `).join('');
    }
}); 