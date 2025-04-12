// Sistema de verificación mejorado
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

function verifyAccess(event) {
    event.preventDefault();
    const accessCode = document.getElementById('accessCode').value;
    const errorMessage = document.getElementById('errorMessage');

    if (accessCode === _secretCode) {
        // Guardar acceso y redirigir
        localStorage.setItem('adminAccess', btoa(_0xf4c3(_secretCode)));
        window.location.href = 'admin.html';
    } else {
        // Mostrar error
        errorMessage.classList.add('active');
        document.getElementById('accessCode').value = '';
        setTimeout(() => {
            errorMessage.classList.remove('active');
        }, 3000);
    }
}

// Toggle sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        mainContent.classList.toggle('shifted');
    });

    // Verificar si ya hay acceso
    const savedAccess = localStorage.getItem('adminAccess');
    if (savedAccess && savedAccess === btoa(_0xf4c3(_secretCode))) {
        window.location.href = 'admin.html';
    }
}); 