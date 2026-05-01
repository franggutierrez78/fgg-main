document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollToPlugin);

    // --- DATOS ---
    const secciones = [
        { texto: "idea para nuestra cita", color: "#006b6d", fotos: ['fotos/foto1.jpg', 'fotos/foto2.jpg', 'fotos/foto3.jpg', 'fotos/foto4.jpg', 'fotos/foto5.jpg', 'fotos/foto6.jpg', 'fotos/foto7.jpg', 'fotos/foto8.jpg', 'fotos/foto9.jpg', 'fotos/foto10.JPG', 'fotos/foto1.jpg', 'fotos/foto2.jpg', 'fotos/foto3.jpg', 'fotos/foto4.jpg', 'fotos/foto5.jpg'] },
        { texto: "idea para nuestra cena", color: "#c28b00", fotos: ['fotos/foto10.JPG', 'fotos/foto9.jpg', 'fotos/foto8.jpg', 'fotos/foto7.jpg', 'fotos/foto6.jpg', 'fotos/foto5.jpg', 'fotos/foto4.jpg', 'fotos/foto3.jpg', 'fotos/foto2.jpg', 'fotos/foto1.jpg', 'fotos/foto10.JPG', 'fotos/foto9.jpg', 'fotos/foto8.jpg', 'fotos/foto7.jpg', 'fotos/foto6.jpg'] },
        { texto: "idea para un nuevo look", color: "#0047b3", fotos: ['fotos/foto3.jpg', 'fotos/foto8.jpg', 'fotos/foto10.JPG', 'fotos/foto2.jpg', 'fotos/foto5.jpg', 'fotos/foto1.jpg', 'fotos/foto4.jpg', 'fotos/foto6.jpg', 'fotos/foto7.jpg', 'fotos/foto9.jpg', 'fotos/foto3.jpg', 'fotos/foto8.jpg', 'fotos/foto10.JPG', 'fotos/foto2.jpg', 'fotos/foto5.jpg'] }
    ];

    const h2Text = document.getElementById('dynamic-text');
    const grid = document.getElementById('pinterestGrid');
    const snapContainer = document.querySelector('.snap-container');
    const dots = document.querySelectorAll('.dot');
    
    let index = 0;
    let currentState = 0;
    let isAnimatingPage = false;

    // --- 1. INICIALIZAR GRID (Asegura que las fotos existan) ---
    function initGrid() {
        if (!grid) return;
        grid.innerHTML = '';
        let fotoIndex = 0;
        for (let i = 0; i < 5; i++) {
            const col = document.createElement('div');
            col.className = 'columna';
            for (let j = 0; j < 3; j++) {
                const item = document.createElement('div');
                item.className = 'item';
                const img = document.createElement('img');
                img.src = secciones[0].fotos[fotoIndex++] || '';
                img.classList.add('visible');
                item.appendChild(img);
                col.appendChild(item);
            }
            grid.appendChild(col);
        }
        // Animación de entrada sutil para todas las fotos recién creadas
        gsap.from(".item", { opacity: 0, y: 20, stagger: 0.05, duration: 0.8 });
    }

    // --- 2. EFECTO DE CAMBIO DE FOTOS (El que tenías, pero pro) ---
    function transicionFotos() {
        // Solo animar si estamos en la primera página
        if (currentState !== 0 || isAnimatingPage) return;

        index = (index + 1) % secciones.length;
        const s = secciones[index];
        const imagenes = document.querySelectorAll('.item img');

        // Animación del texto
        gsap.to(h2Text, { 
            y: -20, opacity: 0, duration: 0.4, 
            onComplete: () => {
                h2Text.innerText = s.texto;
                h2Text.style.color = s.color;
                gsap.to(h2Text, { y: 0, opacity: 1, duration: 0.4 });
            }
        });

        // Animación de las imágenes en "oleada"
        gsap.to(imagenes, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            stagger: { amount: 0.5, from: "start" },
            onComplete: () => {
                imagenes.forEach((img, i) => {
                    img.src = s.fotos[i] || img.src;
                });
                gsap.to(imagenes, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: { amount: 0.5, from: "start" }
                });
            }
        });
    }

    // --- 3. NAVEGACIÓN ---
    function goToPage(pageIdx) {
        if (isAnimatingPage || pageIdx < 0 || pageIdx > 2) return;
        isAnimatingPage = true;
        currentState = pageIdx;

        gsap.to(snapContainer, {
            scrollLeft: pageIdx * window.innerWidth,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => { 
                isAnimatingPage = false; 
                if(pageIdx === 1) animarSeccionAmarilla();
            }
        });

        dots.forEach((dot, i) => dot.classList.toggle('active', i === pageIdx));
    }

    function animarSeccionAmarilla() {
        gsap.fromTo(".card-stack", 
            { y: 100, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out" }
        );
    }

    // --- EVENTOS ---
    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (isAnimatingPage) return;
        if (e.deltaY > 30) goToPage(currentState + 1);
        else if (e.deltaY < -30) goToPage(currentState - 1);
    }, { passive: false });

    // --- INICIO ---
    initGrid();
    setInterval(transicionFotos, 5000); // Cambia cada 5 segundos
});