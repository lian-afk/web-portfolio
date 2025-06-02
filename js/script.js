let lastPosScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    let scrollCima = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollCima > lastPosScroll) { // baixo
    navbar.style.top = "-80px";
    } else { // cima
    navbar.style.top = "0";
    }

    lastPosScroll = scrollCima <= 0 ? 0 : scrollCima; // evita valores negativos conflitantes
});