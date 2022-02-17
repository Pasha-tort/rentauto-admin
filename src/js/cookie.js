export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function scrollOpenCookies () {
    if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
        
        let cookiecook = getCookie("cookiecook"),
        cookiewin = document.getElementsByClassName('cookie_notice')[0];    
        if (cookiecook != "no") {
            
            cookiewin.style.display="block"; 

            document.getElementById("cookie_close").addEventListener("click", function(){
                cookiewin.style.display="none";    
                let date = new Date();
                date.setDate(date.getDate() + 14);    
                document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();               
            });
        }

        window.removeEventListener('scroll', scrollOpenCookies);
    }
}