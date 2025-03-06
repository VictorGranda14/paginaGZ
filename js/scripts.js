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

});

document.addEventListener('DOMContentLoaded', () => {
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
});