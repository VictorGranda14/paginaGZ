/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Initialize EmailJS
    emailjs.init(config.emailjs.publicKey);

    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('submitSuccessMessage');
    const errorMessage = document.getElementById('submitErrorMessage');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        //Change button state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...',
        submitButton.disabled = true;

        // Send email using EmailJS
        emailjs.sendForm(config.emailjs.serviceId, config.emailjs.templateId, form)
            .then(() => {
                // Show success message
                successMessage.classList.remove('d-none');
                errorMessage.classList.add('d-none');
                form.reset();

                //Restore button state
                setTimeout(() => {
                    submitButton.innerHTML = 'Enviar';
                    submitButton.disabled = false;
                }, 2000);
            }, (error) => {
                // Show error message
                errorMessage.classList.remove('d-none');
                successMessage.classList.add('d-none');
                console.error('FAILED...', error);

                //Restore button state
                submitButton.innerHTML = 'Enviar';
                submitButton.disabled = false;
            });
    });

    const carouselConfigs = {
        // Primer carrusel
        'galleryCarousel1': {
            images: [
                "assets/img/portfolio/img/Bodas/1.webp",
                "assets/img/portfolio/img/Bodas/2.webp",
                "assets/img/portfolio/img/Bodas/3.webp",
                "assets/img/portfolio/img/Bodas/4.webp",
                "assets/img/portfolio/img/Bodas/5.webp",
                "assets/img/portfolio/img/Bodas/6.webp",
                "assets/img/portfolio/img/Bodas/7.webp",
                "assets/img/portfolio/img/Bodas/8.webp",
                "assets/img/portfolio/img/Bodas/9.webp",
                "assets/img/portfolio/img/Bodas/10.webp",
                "assets/img/portfolio/img/Bodas/11.webp",
                "assets/img/portfolio/img/Bodas/12.webp",
                "assets/img/portfolio/img/Bodas/13.webp",
                "assets/img/portfolio/img/Bodas/14.webp",
                "assets/img/portfolio/img/Bodas/15.webp",
                "assets/img/portfolio/img/Bodas/16.webp",
                "assets/img/portfolio/img/Bodas/17.webp",
                "assets/img/portfolio/img/Bodas/18.webp",
                "assets/img/portfolio/img/Bodas/19.webp",
                "assets/img/portfolio/img/Bodas/20.webp",
                "assets/img/portfolio/img/Bodas/21.webp",
                "assets/img/portfolio/img/Bodas/22.webp"
            ]
        },
        // Segundo carrusel
        'galleryCarousel2': {
            images: [
                "assets/img/portfolio/img/Cumpleaños/1.webp",
                "assets/img/portfolio/img/Cumpleaños/2.webp",
                "assets/img/portfolio/img/Cumpleaños/3.webp",
                "assets/img/portfolio/img/Cumpleaños/5.webp",
                "assets/img/portfolio/img/Cumpleaños/6.webp",
                "assets/img/portfolio/img/Cumpleaños/7.webp",
                "assets/img/portfolio/img/Cumpleaños/8.webp",
            ]
        },
        //Tercer carrusel
        'galleryCarousel3': {
            images: [
                "assets/img/portfolio/img/Empresas/1.webp",
                "assets/img/portfolio/img/Empresas/2.webp",
                "assets/img/portfolio/img/Empresas/3.webp",
                "assets/img/portfolio/img/Empresas/4.webp",
                "assets/img/portfolio/img/Empresas/5.webp",
                "assets/img/portfolio/img/Empresas/6.webp",
                "assets/img/portfolio/img/Empresas/7.webp",
                "assets/img/portfolio/img/Empresas/8.webp",
                "assets/img/portfolio/img/Empresas/9.webp",
                "assets/img/portfolio/img/Empresas/10.webp"
            ]
        }
    };
    
    // Clase para gestionar un carrusel de imágenes
    class CarouselManager {
        constructor(carouselId, images) {
            this.carouselId = carouselId;
            this.allImages = images;
            this.visibleThumbnails = 5; // Número de miniaturas visibles a la vez
            this.currentGroupIndex = 0;
            this.totalGroups = Math.ceil(this.allImages.length / this.visibleThumbnails);
            
            // Elementos DOM
            this.carousel = document.getElementById(carouselId);
            this.container = document.querySelector(`[data-thumbnails-for="${carouselId}"]`);
            
            // Inicializar
            this.init();
        }
        
        init() {
            if (!this.carousel || !this.container) {
                console.error(`No se pudieron encontrar todos los elementos para el carrusel ${this.carouselId}`);
                return;
            }
            
            // Sincronizar indicadores con el carrusel actual
            this.carousel.addEventListener('slid.bs.carousel', this.handleCarouselSlide.bind(this));
            
            // Inicializar las miniaturas
            this.updateThumbnails();
        }
        
        handleCarouselSlide(e) {
            const slideIndex = e.to;
            const groupIndex = Math.floor(slideIndex / this.visibleThumbnails);
            
            // Si el índice de diapositiva está en un grupo diferente, actualiza las miniaturas
            if (groupIndex !== this.currentGroupIndex) {
                this.currentGroupIndex = groupIndex;
                this.updateThumbnails();
            }
            
            // Actualizar la clase active en los indicadores
            const buttons = this.container.querySelectorAll('button');
            buttons.forEach(button => button.classList.remove('active'));
            
            const activeButton = this.container.querySelector(`button[data-bs-slide-to="${slideIndex}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
                activeButton.setAttribute('aria-current', 'true');
            }
        }
        
        updateThumbnails() {
            // Limpiar el contenedor
            this.container.innerHTML = '';
            
            // Índice inicial y final del grupo actual
            const startIdx = this.currentGroupIndex * this.visibleThumbnails;
            const endIdx = Math.min(startIdx + this.visibleThumbnails, this.allImages.length);
            
            // Crear nuevos botones indicadores
            for (let i = startIdx; i < endIdx; i++) {
                const button = document.createElement('button');
                button.type = 'button';
                button.setAttribute('data-bs-target', `#${this.carouselId}`);
                button.setAttribute('data-bs-slide-to', i);
                button.setAttribute('aria-label', `Slide ${i + 1}`);
                
                // Agregar clase active si es la diapositiva actual
                const activeSlideIndex = this.getActiveSlideIndex();
                if (i === activeSlideIndex) {
                    button.classList.add('active');
                    button.setAttribute('aria-current', 'true');
                }
                
                // Agregar miniatura
                const img = document.createElement('img');
                img.className = 'd-block w-100';
                img.src = this.allImages[i];
                img.alt = `Miniatura ${i + 1}`;
                img.style.height = '60px';
                img.style.objectFit = 'cover';
                
                button.appendChild(img);
                this.container.appendChild(button);
            }
        }
        
        getActiveSlideIndex() {
            const activeItem = this.carousel.querySelector('.carousel-item.active');
            const items = this.carousel.querySelectorAll('.carousel-item');
            return Array.from(items).indexOf(activeItem);
        }
    }
    
    // Inicializar todos los carruseles
    for (const [carouselId, config] of Object.entries(carouselConfigs)) {
        if (document.getElementById(carouselId)) {
            new CarouselManager(carouselId, config.images);
        }
    }
});