/* =====================================================
   script.js — Para ti ♥
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollToPlugin);

    // ================================================================
    //  DATOS — EDITA AQUÍ TUS FOTOS Y TEXTOS
    // ================================================================

    /**
     * IDEAS DEL HERO
     * Cada objeto tiene:
     *   texto  → frase que aparece en el centro
     *   color  → color del texto de la frase
     *   fotos  → array de 15 rutas de imagen para el grid de fondo
     *            (5 columnas × 3 filas = 15 fotos)
     *            Si pones menos de 15 se repiten; si pones más se ignoran.
     *
     * Para cambiar las fotos de una frase, edita las rutas dentro de su array.
     */
    const IDEAS = [
        {
            texto: "idea para nuestra cita",
            color: "#e60023",
            fotos: [
                // ── FRASE 1: "idea para nuestra cita" ──────────────────
                // Pon aquí 15 fotos que vayan con esta frase.
                // Ejemplo: fotos de restaurantes, paseos, planes románticos...
                'fotos/cita/foto1.jpg',   // col 1 fila 1
                'fotos/cita/foto2.jpg',   // col 1 fila 2
                'fotos/cita/foto3.jpg',   // col 1 fila 3
                'fotos/cita/foto4.jpg',   // col 2 fila 1
                'fotos/cita/foto5.jpg',   // col 2 fila 2
                'fotos/cita/foto6.jpg',   // col 2 fila 3
                'fotos/cita/foto7.jpg',   // col 3 fila 1
                'fotos/cita/foto8.jpg',   // col 3 fila 2
                'fotos/cita/foto9.jpg   ',   // col 3 fila 3
                'fotos/cita/foto10.jpg',  // col 4 fila 1
                'fotos/cita/foto11.jpg',  // col 4 fila 2
                'fotos/cita/foto12.jpg',  // col 4 fila 3
                'fotos/cita/foto13.jpg',  // col 5 fila 1
                'fotos/cita/foto14.jpg',  // col 5 fila 2
                'fotos/cita/foto15.jpg',  // col 5 fila 3
                // ─────────────────────────────────────────────────────
            ]
        },
        {
            texto: "idea para nuestro viaje",
            color: "#c28b00",
            fotos: [
                // ── FRASE 2: "idea para nuestra cena" ─────────────────
                // Pon aquí 15 fotos que vayan con esta frase.
                // Ejemplo: fotos de comida, restaurantes, cocina en casa...
                'fotos/viaje/foto1.jpg',
                'fotos/viaje/foto2.jpg',
                'fotos/viaje/foto3.jpg',
                'fotos/viaje/foto4.jpg',
                'fotos/viaje/foto5.jpg',
                'fotos/viaje/foto6.jpg',
                'fotos/viaje/foto7.jpg',
                'fotos/viaje/foto8.jpg',
                'fotos/viaje/foto9.jpg',
                'fotos/viaje/foto10.jpg',
                'fotos/viaje/foto11.jpg',
                'fotos/viaje/foto12.jpg',
                'fotos/viaje/foto13.jpg',
                'fotos/viaje/foto14.jpg',
                'fotos/viaje/foto15.jpg',
                // ─────────────────────────────────────────────────────
            ]
        },
        {
            texto: "idea para un nuevo look",
            color: "#0047b3",
            fotos: [
                // ── FRASE 3: "idea para un nuevo look" ────────────────
                // Pon aquí 15 fotos que vayan con esta frase.
                // Ejemplo: fotos de ropa, outfits, looks favoritos...
                'fotos/look/foto1.jpg',
                'fotos/look/foto2.jpg',
                'fotos/look/foto3.jpg',
                'fotos/look/foto4.jpg',
                'fotos/look/foto5.jpg',
                'fotos/look/foto6.jpg',
                'fotos/look/foto7.jpg',
                'fotos/look/foto8.jpg',
                'fotos/look/foto9.jpg',
                'fotos/look/foto10.jpg',
                'fotos/look/foto11.jpg',
                'fotos/look/foto12.jpg',
                'fotos/look/foto13.jpg',
                'fotos/look/foto14.jpg',
                'fotos/look/foto15.jpg',
                // ─────────────────────────────────────────────────────
            ]
        },

        // ── PARA AÑADIR MÁS FRASES: copia este bloque y pégalo aquí ──
        // {
        //     texto: "tu nueva frase aquí",
        //     color: "#hex-color",
        //     fotos: [
        //         'fotos/nuevacarpeta/foto1.jpg',
        //         ... (15 fotos)
        //     ]
        // },
    ];

    /**
     * TIMELINE — Momentos de vuestra historia
     * Cada objeto tiene:
     *   titulo → título del momento
     *   fecha  → fecha en texto libre
     *   foto   → ruta a la foto de ese momento
     *
     * Para añadir más momentos, copia una línea { ... } y pégala aquí.
     */
    const TIMELINE_ITEMS = [
        { titulo: "Nuestro primer viaje",   fecha: "Agosto 2024",    foto: "fotos/timeline/viaje1.jpg"   },
        { titulo: "Aquella cena especial",  fecha: "Diciembre 2024", foto: "fotos/timeline/viaje2.jpg"   },
        { titulo: "Escapada a la nieve",    fecha: "Febrero 2025",   foto: "fotos/timeline/viaje3.jpg"   },
        // Añade más momentos aquí:
        // { titulo: "...", fecha: "...", foto: "fotos/timeline/..." },
    ];

    /**
     * FOTOS DE LA PILA (página amarilla)
     * Las tres fotos de la pila de cartas de la página 2.
     * Edítalas directamente en el HTML en los <img src="..."> dentro de #cardPile,
     * o cámbialalas aquí y se aplicarán al cargar.
     */
    const FOTOS_PILA = [
        'fotos/nosotros_1.jpg',          // tarjeta izquierda (inclinada)
        'fotos/nosotros_principal.jpg',  // tarjeta central (la grande)
        'fotos/detalle_1.jpg',           // tarjeta derecha (inclinada)
    ];

    // ================================================================
    //  FIN DE LA SECCIÓN DE DATOS
    // ================================================================


    // --- ALTURAS del grid masonry (puedes ajustarlas si quieres) ---
    const HEIGHTS = [180, 240, 160, 200, 220, 180, 260, 190, 170, 210, 190, 230, 165, 200, 175];

    // ----------------------------------------------------------------
    //  CURSOR PERSONALIZADO
    // ----------------------------------------------------------------
    const cursor    = document.getElementById('cursor');
    const ring      = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animCursor() {
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animCursor);
    }
    animCursor();

    function enlargeCursor()  { cursor.style.width = '20px'; cursor.style.height = '20px'; cursor.style.background = '#c0001e'; }
    function restoreCursor()  { cursor.style.width = '12px'; cursor.style.height = '12px'; cursor.style.background = 'var(--red)'; }

    document.querySelectorAll('button, a, .masonry-item, .tl-item, .page-dot, .dot').forEach(el => {
        el.addEventListener('mouseenter', enlargeCursor);
        el.addEventListener('mouseleave', restoreCursor);
    });

    // ----------------------------------------------------------------
    //  PARTÍCULAS CORAZONES
    // ----------------------------------------------------------------
    const canvas = document.getElementById('particles-canvas');
    const ctx    = canvas.getContext('2d');

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x       = Math.random() * canvas.width;
            this.y       = canvas.height + 20;
            this.size    = Math.random() * 10 + 4;
            this.speedY  = Math.random() * 1.2 + 0.4;
            this.speedX  = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 1 + 1;
            this.life    = 0;
            this.maxLife = 200 + Math.random() * 100;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity * (1 - this.life / this.maxLife);
            ctx.fillStyle   = '#e60023';
            ctx.font        = `${this.size}px serif`;
            ctx.fillText('♥', this.x, this.y);
            ctx.restore();
            this.x    += this.speedX;
            this.y    -= this.speedY;
            this.life++;
            if (this.life >= this.maxLife) this.reset();
        }
    }

    const particles = [];
    for (let i = 0; i < 18; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height; // posición inicial aleatoria
        particles.push(p);
    }

    function animParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.draw());
        requestAnimationFrame(animParticles);
    }
    animParticles();

    // ----------------------------------------------------------------
    //  GRID MASONRY — construye o actualiza las fotos
    // ----------------------------------------------------------------
    async function buildGrid(fotosArray) {
        const grid = document.getElementById('masonryGrid');
        grid.innerHTML = '';

        const fotos = fotosArray || [];
        let fi = 0;

        for (let c = 0; c < 5; c++) {
            const col = document.createElement('div');
            col.className = 'masonry-col';

            for (let r = 0; r < 3; r++) {
                const item = document.createElement('div');
                item.className  = 'masonry-item';
                item.style.height = HEIGHTS[fi] + 'px';

                const img = document.createElement('img');
                const fotoUrl = fotos[fi % fotos.length] || '';

                // --- LÓGICA PARA HEIC ---
                if (fotoUrl.toLowerCase().endsWith('.heic')) {
                    fetch(fotoUrl)
                        .then(res => res.blob())
                        .then(blob => heic2any({ blob, toType: "image/jpeg", quality: 0.6 }))
                        .then(conversionResult => {
                            img.src = URL.createObjectURL(conversionResult);
                        })
                        .catch(e => console.error("Error convirtiendo HEIC:", e));
                } else {
                    img.src = fotoUrl;
                }
                // ------------------------

                img.alt = '';
                img.onerror = function() {
                    this.parentElement.style.background = `hsl(${fi * 40}, 18%, 86%)`;
                    this.style.display = 'none';
                };

                item.addEventListener('mouseenter', enlargeCursor);
                item.addEventListener('mouseleave', restoreCursor);

                item.appendChild(img);
                col.appendChild(item);
                fi++;
            }
            grid.appendChild(col);
        }

        gsap.from('.masonry-item', {
            opacity: 0,
            y: 30,
            stagger: 0.04,
            duration: 0.9,
            ease: 'power2.out'
        });
    }

    // Construir el grid inicial con las fotos de la primera frase
    buildGrid(IDEAS[0].fotos);

    // ----------------------------------------------------------------
    //  TEXTO DINÁMICO — rota frases Y actualiza fotos
    // ----------------------------------------------------------------
    let ideaIndex = 0;
    const dynamicText = document.getElementById('dynamic-text');
    const heroDotsEl  = document.querySelectorAll('#dotsHero .dot');

    function rotateIdea() {
        if (currentPage !== 0) return; // solo rotar si estamos en la página hero

        ideaIndex = (ideaIndex + 1) % IDEAS.length;
        const idea = IDEAS[ideaIndex];

        // 1. Animar salida del texto
        gsap.to(dynamicText, {
            y: -15,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                // 2. Cambiar texto y color
                dynamicText.textContent = idea.texto;
                dynamicText.style.color = idea.color;

                // 3. Animar entrada del texto
                gsap.to(dynamicText, { y: 0, opacity: 1, duration: 0.35 });
            }
        });

        // 4. Actualizar dots de frase
        heroDotsEl.forEach((d, i) => d.classList.toggle('active', i === ideaIndex));

        // 5. Actualizar fotos del grid con fade suave
        const items = document.querySelectorAll('.masonry-item img');
        const nuevasFotos = idea.fotos;

        gsap.to('.masonry-item', {
            opacity: 0,
            duration: 0.3,
            stagger: 0.02,
            onComplete: () => {
                // Cambiar srcs
                items.forEach((img, i) => {
                    img.style.display = 'block';
                    img.src = nuevasFotos[i % nuevasFotos.length] || '';
                });
                // Fade in
                gsap.to('.masonry-item', {
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.02
                });
            }
        });
    }

    // Animación de entrada inicial del texto
    gsap.fromTo(dynamicText,
        { y: 15, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.8, delay: 0.5 }
    );

    // Rotar cada 4 segundos
    setInterval(rotateIdea, 4000);

    // ----------------------------------------------------------------
    //  TIMELINE — construye los items dinámicamente
    // ----------------------------------------------------------------
    function buildTimeline() {
        const row = document.getElementById('timelineRow');
        TIMELINE_ITEMS.forEach((item, i) => {
            const el = document.createElement('div');
            el.className = 'tl-item';
            el.innerHTML = `
                <div class="tl-photo">
                    <img src="${item.foto}" alt="${item.titulo}" onerror="this.parentElement.style.background='#1a1a2e'; this.style.display='none'">
                </div>
                <div class="tl-dot"></div>
                <div class="tl-info">
                    <h3>${item.titulo}</h3>
                    <span>${item.fecha}</span>
                </div>
            `;
            el.style.transitionDelay = (i * 0.12) + 's';

            // Cursor hover en items del timeline
            el.addEventListener('mouseenter', enlargeCursor);
            el.addEventListener('mouseleave', restoreCursor);

            row.appendChild(el);
        });
    }
    buildTimeline();

    // ----------------------------------------------------------------
    //  APLICAR FOTOS DE LA PILA (página amarilla)
    // ----------------------------------------------------------------
    (function applyFotosPila() {
        const cards = document.querySelectorAll('#cardPile .pile-card img');
        cards.forEach((img, i) => {
            if (FOTOS_PILA[i]) img.src = FOTOS_PILA[i];
        });
    })();

    // ----------------------------------------------------------------
    //  NAVEGACIÓN — scroll horizontal entre páginas
    // ----------------------------------------------------------------
    const scrollContainer = document.getElementById('scrollContainer');
    const pageDots        = document.querySelectorAll('.page-dot');
    const totalPages      = 4;
    let currentPage  = 0;
    let isAnimating  = false;

    function goToPage(idx) {
        if (isAnimating || idx < 0 || idx >= totalPages) return;
        isAnimating = true;
        currentPage = idx;

        gsap.to(scrollContainer, {
            scrollLeft: idx * window.innerWidth,
            duration: 0.9,
            ease: 'power3.inOut',
            onComplete: () => {
                isAnimating = false;
                triggerPageAnimations(idx);
            }
        });

        pageDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    function triggerPageAnimations(idx) {
        if (idx === 1) {
            gsap.fromTo('.pile-card',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(1.3)' }
            );
            const fadeEl = document.querySelector('#page-yellow .fade-in');
            if (fadeEl) fadeEl.classList.add('visible');
        }
        if (idx === 2) {
            document.querySelectorAll('#page-timeline .fade-in').forEach(el => el.classList.add('visible'));
            document.querySelectorAll('.tl-item').forEach(el => el.classList.add('visible'));
        }
        if (idx === 3) {
            gsap.from('.heart-big', { scale: 0, duration: 0.6, ease: 'back.out(2)' });
            gsap.from('.final-page-inner h2, .final-page-inner p, .btn-special', {
                y: 30, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out'
            });
        }
    }

    // ── Rueda del ratón ──────────────────────────────────────────────
    window.addEventListener('wheel', e => {
        e.preventDefault();
        if (isAnimating) return;
        if (e.deltaY > 25)  goToPage(currentPage + 1);
        else if (e.deltaY < -25) goToPage(currentPage - 1);
    }, { passive: false });

    // ── Touch (móvil) ────────────────────────────────────────────────
    let touchStartX = 0;
    window.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goToPage(currentPage + (diff > 0 ? 1 : -1));
    }, { passive: true });

    // ── Teclado ──────────────────────────────────────────────────────
    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  goToPage(currentPage + 1);
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    goToPage(currentPage - 1);
    });

    // ── Dots laterales ───────────────────────────────────────────────
    pageDots.forEach((dot, i) => dot.addEventListener('click', () => goToPage(i)));

    // ----------------------------------------------------------------
    //  BOTONES — AHORA FUNCIONAN
    // ----------------------------------------------------------------

    // Botón "Ver nuestra historia" (página 2) → va a página 3 (Timeline)
    document.getElementById('btnSiguiente').addEventListener('click', () => goToPage(2));

    // Botón "Nuestra historia" (navbar) → va a página 3 (Timeline)
    document.getElementById('btnHistoria').addEventListener('click', () => goToPage(2));

    // Botón "Info" (navbar) → puedes cambiar esto por lo que quieras
    document.getElementById('btnInfo').addEventListener('click', () => {
        // Ejemplo: mostrar un alert, abrir un modal, navegar a otra página...
        // Cámbialo por lo que necesites:
        alert('¡Esta página es solo para ti! ♥');
    });

    // Botón final "Para siempre tuyo" → puedes cambiarlo por lo que quieras
    document.getElementById('btnFinal').addEventListener('click', () => {
        // Ejemplo: hacer confetti, navegar a otro sitio, reproducir música...
        // Por ahora hace un efecto de pulso en el corazón grande:
        gsap.to('.heart-big', {
            scale: 1.5,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 3
        });
    });

});