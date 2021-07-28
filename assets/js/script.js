const hamburger = document.querySelector('.header__mobile');
const header_navbar = document.querySelector('.header__navbar');
const navbar_links = document.querySelectorAll('.header__menu a');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolio = document.querySelector('.grid');
const skill_wrap = document.querySelector('.skill__wrap');
const skill_bars = document.querySelectorAll('.skill-progress');
const record_wrap = document.querySelector('.record__wrap');
const record_numbers = document.querySelectorAll('h3.number');
const footer_input = document.querySelector('.footer-input');
const back_btn = document.querySelector('.back-btn');


// Mobile Menu Toggle
function closeMenu() {
    header_navbar.classList.remove("open");
    document.body.classList.remove("stop-scrolling");
}

hamburger.addEventListener('click', () => {
    if (!header_navbar.classList.contains("open")) {
        header_navbar.classList.add("open");
        document.body.classList.add("stop-scrolling");
    } else {
        closeMenu();
    }
});

navbar_links.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    })
})


/* Portfolio Filter */
filterBtns.forEach((btn) =>
  
    btn.addEventListener("click", () => {
        filterBtns.forEach((button) => button.classList.remove("active"));
        btn.classList.add("active");

        let filterValue = btn.dataset.filter; 
        
        let iso = new Isotope( portfolio, {
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            filter: filterValue,
        });

        // $('.grid').isotope({ filter: filterValue });
    })
);


/* Scroll Function */
window.addEventListener("scroll", () => {
    skillEffect();
    countUp();
})

/* Check Scroll */
function checkScroll(el) {
    let rect = el.getBoundingClientRect();

    if(window.innerHeight >= rect.top + el.offsetHeight) {
        return true;
    }
    
    return false;
}

/* Skill Effect */
function skillEffect() {
    if (checkScroll(skill_wrap)) {
        skill_bars.forEach((bar) => {
            bar.style.width = bar.dataset.progress;
        });
    }
}


// Counter Up Function
function countUp() {
    if (!checkScroll(record_wrap)) return;

    record_numbers.forEach((number) => {
        const updateCount = () => {
            let currentNum = +number.innerText;
            let maxNum = +number.dataset.num;
            let speed = 100;
            const increment = Math.ceil(maxNum / speed);

            if (currentNum < maxNum) {
                number.innerText = maxNum + increment;
                setTimeout(updateCount, 1000);
            } else {
                number.innerText = maxNum;
            }            
        }
        setTimeout(updateCount, 400);   
    });
}

// Testimonial Carousel
const mySwiper = new Swiper('.swiper-container', {
    speed: 750,
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

/* Footer Input Focus */
footer_input.addEventListener('focus', () => {
    footer_input.classList.add('focus');
});

footer_input.addEventListener('blur', () => {
    if (footer_input.value != "") return;
    
    footer_input.classList.remove('focus');
});

