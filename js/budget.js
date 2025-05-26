let lastPosScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    let scrollCima = window.pageYOffset || document.documentElement.scrollCima;
    
    if (scrollCima > lastPosScroll) {
    navbar.style.top = "-80px";
    } else {
    navbar.style.top = "0";
    }

    lastPosScroll = scrollCima <= 0 ? 0 : scrollCima;
});