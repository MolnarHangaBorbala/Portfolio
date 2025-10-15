const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function random() {
    let a = Math.floor((Math.random() * 5) + 1);

    if (a === 1) {
        window.location.href = "https://combined-games.netlify.app/rock-paper-scissors/rindex";
    }
    else if (a === 2) {
        window.location.href = "https://combined-games.netlify.app/tic-tac-toe/tindex";
    }
    else if (a === 3) {
        window.location.href = "https://combined-games.netlify.app/whack-a-mole/windex";
    }
    else if (a === 4) {
        window.location.href = "https://combined-games.netlify.app/snake/sindex";
    }
    else if (a === 5) {
        window.location.href = "https://combined-games.netlify.app/memory/mindex";
    }
}
