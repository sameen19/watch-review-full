document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (pathname.includes('review.html')) {
        fetchContacts();
        setupReviewFormSubmission();
        setupSearchFunctionality();
        setupThemeSwitcher();
    }

    setupNavMenu();
    setupScrollEffects();
    setupSwipers();
    setupThemeSwitcher();
});

const fetchContacts = async () => {
    try {
        const response = await fetch('http://localhost:1000/api/contacts');
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const contacts = await response.json();
        displayContacts(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
};

const displayContacts = (contacts) => {
    const contactsContainer = document.getElementById('contacts-container');
    contactsContainer.innerHTML = ''; // Clear existing contacts
    contacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');
        contactCard.innerHTML = `
            <div class="contact-card__img">
                <img src="${contact.imgurl || 'default-image.jpg'}" alt="${contact.watchname}">
            </div>
            <div class="contact-card__info">
                <h3 class="contact-card__name">${contact.watchname}</h3>
                <p class="contact-card__rating">Rating: ${contact.rating} / 5</p>
                <p class="contact-card__text">${contact.text}</p>
                <div class="contact-card__user-info">
                    <img src="${contact.userimg || 'default-user.jpg'}" alt="${contact.username}" class="contact-card__user-img">
                    <p class="contact-card__username">Reviewed by: ${contact.username}</p>
                </div>
                <p class="contact-card__useremail">Email: ${contact.useremail}</p>
                <p class="contact-card__phone">Phone: ${contact.phone}</p>
            </div>
        `;
        contactsContainer.appendChild(contactCard);
    });
};

const setupSearchFunctionality = () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const contactsContainer = document.getElementById('contacts-container');

    if (!searchForm || !searchInput || !contactsContainer) {
        console.error('Search form or inputs are missing');
        return;
    }

    const fetchContactsAndDisplay = async (searchTerm = '') => {
        try {
            const response = await fetch('http://localhost:1000/api/contacts');
            if (!response.ok) throw new Error('Failed to fetch contacts');
            const contacts = await response.json();
            console.log('Fetched Contacts:', contacts);

            const filteredContacts = contacts.filter(contact =>
                contact.watchname.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayContacts(filteredContacts);
        } catch (error) {
            console.error('Error fetching contacts for search:', error);
        }
    };

    // Live search while typing
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        fetchContactsAndDisplay(searchTerm);
    });

    // Search on form submission (pressing Enter)
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value;
        await fetchContactsAndDisplay(searchTerm);
    });
};



const setupReviewFormSubmission = () => {
    const reviewForm = document.getElementById('review-form');
    if (!reviewForm) {
        console.error('Review form not found');
        return;
    }

    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(reviewForm);
        const reviewData = {
            watchname: formData.get('watchname'),
            imgurl: formData.get('imgurl'),
            rating: formData.get('rating'),
            text: formData.get('text'),
            username: formData.get('username'),
            userimg: formData.get('userimg'),
            useremail: formData.get('useremail'),
            phone: formData.get('phone')
        };

        try {
            const response = await fetch('http://localhost:1000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                fetchContacts(); // Refresh the reviews list after submission
                reviewForm.reset(); // Clear the form
                alert('Review submitted successfully!');
            } else {
                console.error('Failed to submit review');
                alert('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error submitting review');
        }
    });
};

const setupNavMenu = () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    const navLink = document.querySelectorAll('.nav__link');
    navLink.forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    }));
};

const setupScrollEffects = () => {
    const scrollHeader = () => {
        const header = document.getElementById('header');
        header.classList.toggle('scroll-header', window.scrollY >= 50);
    };
    window.addEventListener('scroll', scrollHeader);

    const scrollActive = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollDown = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const sectionsClass = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

            sectionsClass.classList.toggle('active-link', scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight);
        });
    };
    window.addEventListener('scroll', scrollActive);

    const scrollUp = () => {
        const scrollUp = document.getElementById('scroll-up');
        scrollUp.classList.toggle('show-scroll', window.scrollY >= 350);
    };
    window.addEventListener('scroll', scrollUp);
};

const setupSwipers = () => {
    new Swiper(".testimonial-swiper", {
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    new Swiper(".new-swiper", {
        spaceBetween: 24,
        loop: true,
        breakpoints: {
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            1024: {
                slidesPerView: 4
            }
        }
    });
};
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}



const setupThemeSwitcher = () => {
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'bx-sun';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';
};

