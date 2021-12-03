function isInViewport(el){
    const rect = el.getBoundingClientRect();
    return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight|| document.documentElement.clientHeiht) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    }
    const bottomNav = document.getElementById("bottomNav");
    const cart = document.getElementById("mainCart");
    document.addEventListener("scroll", function () {
    if(!isInViewport(cart)){
    bottomNav.style.display = "block";
    }
    else{
    bottomNav.style.display = "none";
    }
    });