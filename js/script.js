// Animación suave del scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// Efecto parallax en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Animación del logo SVG
const logo = document.querySelector('.logo-svg');
logo.addEventListener('mouseover', () => {
    logo.style.transform = 'rotate(360deg)';
});

// Efecto hover en los botones de descarga
document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Añadir clase active al enlace de navegación actual
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animación de carga inicial
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Efecto de typing en el título
const title = document.querySelector('.hero-content h1');
const text = title.textContent;
title.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Iniciar el efecto de typing cuando la página cargue
window.addEventListener('load', typeWriter);

// Efectos para el CMD
const cmdLines = document.querySelectorAll('.cmd-line');
const cmdTexts = document.querySelectorAll('.cmd-text.typing');

// Función para simular el efecto de escritura
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Iniciar la animación de escritura para cada línea
cmdTexts.forEach((text, index) => {
    const originalText = text.textContent;
    text.style.opacity = '0';
    
    setTimeout(() => {
        text.style.opacity = '1';
        typeWriter(text, originalText);
    }, index * 2000);
});

// Efecto de cursor parpadeante
const cursor = document.querySelector('.cmd-cursor');
setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
}, 500);

// Simular comandos al hacer clic en el botón
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    const newLine = document.createElement('div');
    newLine.className = 'cmd-line';
    newLine.innerHTML = `
        <span class="cmd-prompt">C:\\Users\\GHUB></span>
        <span class="cmd-text typing">Iniciando GHUB Launcher...</span>
    `;
    
    document.querySelector('.cmd-body').appendChild(newLine);
    typeWriter(newLine.querySelector('.cmd-text'), 'Iniciando GHUB Launcher...');
}); 