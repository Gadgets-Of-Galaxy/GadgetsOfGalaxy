//copy menu for mobile
function copyMenu() {
    //  copy inside .dpt-cat to .departments
    var dptCategory = document.querySelector('.dpt-cat');
    var dptPlace = document.querySelector('.departments');
    dptPlace.innerHTML = dptCategory.innerHTML;
    //copy inside nav to nav
    var mainNav = document.querySelector('.header-nav nav');
    var navPlace = document.querySelector('.off-canvas nav');
    navPlace.innerHTML = mainNav.innerHTML;
    //copy .header-top .wrapper to .thetop-nav
    var topNav = document.querySelector('.header-top .wrapper');
    var topPlace = document.querySelector('.off-canvas .thetop-nav');
    topPlace.innerHTML = topNav.innerHTML;
}
copyMenu();



// slider
const carousel = document.querySelector('.carousel');
            const slides = document.querySelector('.carousel-slides');
            const slideWidth = carousel.clientWidth;
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            let currentSlide = 0;

            // Set the initial position of the slides
            slides.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

            // Go to the previous slide
            prevBtn.addEventListener('click', () => {
                if (currentSlide === 0) {
                    currentSlide = slides.children.length - 1;
                } else {
                    currentSlide--;
                }
                slides.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            });

            // Go to the next slide
            nextBtn.addEventListener('click', () => {
                if (currentSlide === slides.children.length - 1) {
                    currentSlide = 0;
                } else {
                    currentSlide++;
                }
                slides.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            });

            // Automatically advance to the next slide every 3 seconds
            setInterval(() => {
                if (currentSlide === slides.children.length - 1) {
                    currentSlide = 0;
                } else {
                    currentSlide++;
                }
                slides.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            }, 3000);


//Single Page show dpt menu
const dptButton = document.querySelector('.dpt-cat .dpt-trigger'),
    dptClass = document.querySelector('.site');
dptButton.addEventListener('click', function () {
    dptClass.classList.toggle('showdpt')
})

// image selector
const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}
window.addEventListener('resize', slideImage);
