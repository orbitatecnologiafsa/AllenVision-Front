document.querySelectorAll('.toggle-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const arrowIcon = this.querySelector('.toggle-arrow');

        // Alterna a classe show para o conteúdo e a classe rotate para a seta
        content.classList.toggle('show');
        arrowIcon.classList.toggle('rotate');
    });
});

document.getElementById('menu-toggle').addEventListener('click', function() {
    const navBarRight = document.getElementById('nav-bar-right');
    const content = document.getElementById('cameras-content');
    content.classList.toggle('open');
    navBarRight.classList.toggle('open');
});

document.getElementById('for-group1').addEventListener('click', function() {
    
    const grid = document.querySelector('.grid-for-cams');
    const arrowIcon = this.querySelector('.toggle-arrow');

    grid.classList.toggle('collapsed');
    grid.classList.toggle('expanded');
    arrowIcon.classList.toggle('rotate-right');
})
