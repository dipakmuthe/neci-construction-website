/* AOS: disable on small screens to avoid overflow from off-canvas animations */
if(typeof AOS !== 'undefined'){
    AOS.init({
        duration:1000,
        once:true,
        disable:function(){
            return window.innerWidth < 768;
        }
    });
}

/* Navbar: close mobile menu after link click + smooth collapse */
(function(){
    var navCollapse=document.getElementById('navbarNav');
    if(!navCollapse || typeof bootstrap === 'undefined'){
        return;
    }

    var collapseInstance=bootstrap.Collapse.getOrCreateInstance(navCollapse,{
        toggle:false
    });

    document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link){
        link.addEventListener('click',function(){
            if(window.innerWidth < 992 && navCollapse.classList.contains('show')){
                collapseInstance.hide();
            }
        });
    });

    /* Re-check AOS when resizing across breakpoint */
    var resizeTimer;
    window.addEventListener('resize',function(){
        clearTimeout(resizeTimer);
        resizeTimer=setTimeout(function(){
            if(typeof AOS !== 'undefined'){
                AOS.refresh();
            }
        }, 200);
    });
})();
