document.addEventListener('DOMContentLoaded', function() {

    // --- Hamburger Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navbar.classList.toggle("active");
    });

    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navbar.classList.remove("active");
    }));

    // --- Scroll Active Link Update ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.navbar .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').slice(1) === current) {
                li.classList.add('active');
            }
        });
    });

    // --- Intersection Observer (Scroll Reveal Animation) ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    function observeElements() {
        document.querySelectorAll('.reveal, .reveal-up').forEach(el => {
            revealOnScroll.observe(el);
        });
    }
    
    // Initial observe
    observeElements();


    // --- Dynamic DB Rendering & Menu Filtering ---
    const fullMenu = document.getElementById('full-menu');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderDishes(filterValue = 'all') {
        const allDishes = window.DabaliDB ? window.DabaliDB.getDishes() : [];
        if(!fullMenu) return;

        fullMenu.innerHTML = '';
        
        const filteredDishes = filterValue === 'all' 
            ? allDishes 
            : allDishes.filter(d => d.category === filterValue);

        filteredDishes.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'menu-card glass reveal-up active'; // add active directly for filtered ones if already scrolled
            card.setAttribute('data-category', dish.category);
            
            // Image error handler to avoid broken images if the file doesn't exist
            card.innerHTML = `
                <div class="img-wrapper">
                    <img src="${dish.img}" alt="${dish.name}" onerror="this.src='manioc.jpg'">
                    <div class="hover-overlay">
                        <p class="description">${dish.desc}</p>
                    </div>
                </div>
                <div class="card-content">
                    <h4>${dish.name}</h4>
                    <div class="price-action">
                        <span class="price">${dish.price}</span>
                        <button class="add-btn"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            `;
            fullMenu.appendChild(card);
        });
        
        // Re-observe newly added elements
        observeElements();
    }

    if (fullMenu) {
        // Initial Render
        renderDishes('all');

        // Filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                renderDishes(filterValue);
            });
        });
    }

    // --- Form Handling ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Envoi en cours...';
            
            setTimeout(() => {
                alert('Merci ! Votre demande Premium a été envoyée avec succès.');
                contactForm.reset();
                btn.innerText = originalText;
            }, 1000);
        });
    }
});