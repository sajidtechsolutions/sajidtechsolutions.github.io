// Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Contact Form Submission with AJAX to Google Apps Script
    const contactForm = document.querySelector('#contact-form');
    const modal = document.querySelector('#success-modal');
    const modalClose = document.querySelector('#modal-close');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbw0_QLhOnskVbZx6mPY3c0owIA4siCjdR9QRCEAUO6Q8OrWeTahA2psNWr_GYd7ob7Y/exec'; // Replace with your Web App URL

            fetch(scriptUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                if (data === 'success') {
                    modal.style.display = 'flex'; // Show the modal
                    contactForm.reset(); // Reset the form
                } else {
                    console.error('Submission failed:', data);
                    modal.style.display = 'flex'; // Show modal with error (optional)
                    modal.querySelector('h2').textContent = 'Submission Failed';
                    modal.querySelector('p').textContent = 'Please try again later.';
                }
            })
            .catch(error => {
                console.error('Detailed Error:', error);
                modal.style.display = 'flex'; // Show modal with error
                modal.querySelector('h2').textContent = 'An Error Occurred';
                modal.querySelector('p').textContent = 'Please try again. Check the console for details.';
            });
        });
    }

    // Close the modal when the close button is clicked
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close the modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
