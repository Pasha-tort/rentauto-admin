import { tns } from "tiny-slider";

export default function startSlider() {

    const detailsSlider = tns({
        container: ".details__slider",
        items: 4,
        gutter: 10,
        loop: false,
        mouseDrag: true,
        speed: 400
    });

    const tnsOvh = document.querySelector('.tns-ovh');
    const mainPhoto = document.querySelector('.details__slider__main-photo');

    if (tnsOvh) {
        const itemsSliderImg = document.querySelectorAll('.details__slider__item img');
        const slider = document.querySelector('.details__slider');
        const prevBtn = document.querySelector('.tns-controls').querySelector('[data-controls="prev"]');
        const nextBtn = document.querySelector('.tns-controls').querySelector('[data-controls="next"]');

        slider.classList.add('details__slider_active');
        
        itemsSliderImg.forEach(item => {
    
            item.addEventListener('click', (e) => {
                const src = e.target.getAttribute('src');
                mainPhoto.src = src;
            });
        });

        function customBtn(btn) {
            btn.style.position = 'absolute';
            btn.style.top = '50%';
            btn.style.transform = 'translateY(-50%)';
            btn.style.border = '0px';
            btn.style. backgroundColor = 'rgba(0,0,0,0)';
        }

        customBtn(prevBtn);
        customBtn(nextBtn);
        
        prevBtn.style.left = '0';
        nextBtn.style.right = '0';

        prevBtn.innerHTML = '<img src="/img/catalog/prevBtn.png"/>';
        nextBtn.innerHTML = '<img src="/img/catalog/nextBtn.png"/>';
    }
}

