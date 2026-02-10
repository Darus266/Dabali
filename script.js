document.addEventListener('DOMContentLoaded', function() {

    // --- Menu Hamburger pour Mobile ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- Mettre en évidence la section active dans la navigation ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.navbar .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
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

    // --- Gestion simple du formulaire de contact ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche le rechargement de la page
            
            // Ici, vous ajouteriez la logique pour envoyer les données à un serveur
            // Pour cet exemple, on affiche juste une alerte
            alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
            
            // Vider le formulaire après soumission
            contactForm.reset();
        });
    }

});