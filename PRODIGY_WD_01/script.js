window.addEventListener("scroll", function() {
    let navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("active");
}
