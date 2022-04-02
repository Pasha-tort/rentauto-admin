export default function scrollSlider() {

    const scrollContainer = document.getElementsByClassName('advantage')[0];
    const boxOverflow = document.querySelector('.scroll__overflow_horizontal');
    const scrollVertical = document.querySelector('.scroll__vertical');

	const widthClient = document.documentElement.clientWidth;
	let nav;

	if (widthClient < 576) {
		nav = document.querySelector('.nav__wrapper_mobile');
	} else {
		nav = document.querySelector('.nav__wrapper');
	}
	
    let heightNav;

    if (window.getComputedStyle(nav).height.match(/\d+\.\d+/g)) {
        heightNav = +window.getComputedStyle(nav).height.match(/\d+\.\d+/g)[0].split('.')[0];
    } else {
        heightNav = +window.getComputedStyle(nav).height.match(/\d/g).join('');
    }

    if (document.documentElement.clientWidth < 992) {
        scrollContainer.style.width = `${document.documentElement.clientWidth}px`;
        scrollVertical.style.width = `${(document.documentElement.clientWidth / 2) - +window.getComputedStyle(scrollContainer).columnGap.match(/\d/g).join('')}px`
    }
    
    const offsetTop = scrollContainer.offsetTop + heightNav;

    const scrollHorizontalBox = document.getElementsByClassName('scroll__horizontal-box')[0]
    const scrollVerticalBox = document.getElementsByClassName('scroll__vertical-box')[0]

    const arrItems = document.querySelectorAll('.scroll__horizontal-item');

    let widthBoxOverfow;


    if (window.getComputedStyle(boxOverflow).width.match(/\d+\.\d+/g)) {
        widthBoxOverfow = +window.getComputedStyle(boxOverflow).width.match(/\d+\.\d+/g)[0].split('.')[0];
    } else {
        widthBoxOverfow = +window.getComputedStyle(boxOverflow).width.match(/\d/g).join('');
    }

    const horizontalItemSize = widthBoxOverfow;

    arrItems.forEach(item => {
        item.style.width = `${widthBoxOverfow}px`;
    });

    const verticalBox = scrollVerticalBox.offsetHeight 
    const horizontalBox = scrollHorizontalBox.offsetWidth

    let attitude =  (horizontalBox - horizontalItemSize) / (verticalBox - document.documentElement.clientHeight)

    let offsetHorizontal = 0;

    let event = null;

    const stopScroll = (e) => {
        
        if (e > 0) {
            offsetHorizontal = scrollContainer.getBoundingClientRect().top * attitude
            scrollHorizontalBox.style.left = `${offsetHorizontal}px`
        }

        if (e < 0) {
            offsetHorizontal = scrollContainer.getBoundingClientRect().top * attitude
            scrollHorizontalBox.style.left = `${offsetHorizontal}px`
        }

    }

    if (document.documentElement.clientWidth >= 1024) {
        document.addEventListener('wheel', (e) => {
            event = e.deltaY
        });
    } else if (document.documentElement.clientWidth < 1024) {

        document.addEventListener('wheel', (e) => {
            event = e.deltaY
        });
        
        let startPoint={};
        let nowPoint;
        
        document.addEventListener('touchstart', function(e) {
            startPoint.y=e.changedTouches[0].pageY;
        }, false);
        
        document.addEventListener('touchmove', function(e) {
            let otk={};
            nowPoint=e.changedTouches[0].pageY;
            otk.y=nowPoint-startPoint.y;
            event = otk.y;
        }, false);
        
        document.addEventListener('touchend', function(e) {
            
            nowPoint=e.changedTouches[0].pageY;
            let yAbs = nowPoint - startPoint.y;
            event = yAbs;
            
        }, false);
    }

    document.addEventListener('scroll', () => {

        if (document.documentElement.scrollTop >= offsetTop && scrollContainer.getBoundingClientRect().bottom >= document.documentElement.clientHeight) {
            stopScroll(event)
        }

        if (document.documentElement.scrollTop < offsetTop) {
            offsetHorizontal = 0;
            scrollHorizontalBox.style.left = `${offsetHorizontal}px`
        }

        if (scrollContainer.getBoundingClientRect().bottom < document.documentElement.clientHeight) {
            offsetHorizontal = horizontalItemSize - horizontalBox;
            scrollHorizontalBox.style.left = `${offsetHorizontal}px`
        }
    });
}