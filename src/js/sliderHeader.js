"use strict";

export default function sliderHeader() {
    
    const sliderWrapper = document.querySelector('.slider-header__wrapper');

    let slides = document.querySelectorAll(".slider-header__slide__background");
    
    const slidesData = [];

    for (let i = 0; i < slides.length; ++i) {
    
        slidesData[i] = slides[i];
        slides[i].remove();
    }

	const widthClient = document.documentElement.clientWidth;
	const heightClient = document.documentElement.clientHeight;

	let classNameImg;

	if (widthClient / heightClient >= 1) {
		classNameImg = 'slider-header__slide__img_horizontal';
	} else {
		classNameImg = 'slider-header__slide__img_vertical';
	}

    const slideHtmlPersonal = `
                                <div class="slider-header__slide__box">
                                    <img class="slider-header__slide__img ${classNameImg}" alt="header_auto" src="/img/headerBackground/machinePersonal.png"/>
                                </div>
                                `;

    const slideHtmlCommercial = `
                                <div class="slider-header__slide__box">
                                    <img class="slider-header__slide__img ${classNameImg}" alt="header_auto" src="/img/headerBackground/machineCommercial.png"/>
                                </div>
                                `;

    const slideHtmlSpecial = `
                                <div class="slider-header__slide__box">
                                    <img class="slider-header__slide__img ${classNameImg}" alt="header_auto" src="/img/headerBackground/machineSpecial.png"/>
                                </div>
                                `;
    
    let step = 0;
    
    function drow(offset) {

        const slide = document.createElement('li');
        slide.classList.add('slider-header__slide__background');

        if (step === 0) {
            slide.style.background = "url('/img/headerBackground/backgroundPersonal.jpg') no-repeat center center/cover";
            slide.innerHTML = slideHtmlPersonal;
        } else if (step === 1) {
            slide.style.background = "url('/img/headerBackground/backgroundCommercial.jpg') no-repeat center center/cover";
            slide.innerHTML = slideHtmlCommercial;
        } else if (step === 2) {
            slide.style.background = "url('/img/headerBackground/backgroundSpecial.jpg') no-repeat center center/cover";
            slide.innerHTML = slideHtmlSpecial;
        }

        sliderWrapper.appendChild(slide);
        
        slide.style.left = offset * document.documentElement.clientWidth + "px";

        if (step + 1 === slidesData.length) {   
            step = 0;
        } else {
            step = step + 1;
        }
    }

    drow(0); 
    sliderWrapper.classList.add('slider-header__wrapper_active')
    drow(1);
    drow(2);

    function left() {
        let slidesNow = document.querySelectorAll(".slider-header__slide__background");
        
        for (let i = 0; i < slidesNow.length; i++) {
            slidesNow[i].style.left = slidesNow[i].style.left.match(/\d+/g)[0] - document.documentElement.clientWidth + "px";
			if(i === 1) {
				slidesNow[i].style.width = '100vw';
				slidesNow[i].style.left = '0px'
			}
        } 
        
        setTimeout(function () {
            slidesNow[0].remove();

            setTimeout(() => {
                drow(2);
            });

        }, 400);
    }

    let intervalSlider = setInterval(() => left(), 5000);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden){
           clearInterval(intervalSlider); 
        } else {
            intervalSlider = setInterval(() => left(), 5000);
        }
    });
    
};