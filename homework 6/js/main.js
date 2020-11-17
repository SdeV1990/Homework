function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.burger_menu__button');
    let links = menu.find('.burger_menu__link');
    let overlay = menu.find('.burger_menu__overlay');
    
    button.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });
    
    links.on('click', () => toggleMenu());
    overlay.on('click', () => toggleMenu());
    
    function toggleMenu() {
        menu.toggleClass('burger_menu__active');
        if (menu.hasClass('burger_menu__active')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'visible');
        }
    }
}

burgerMenu ('.burger_menu');