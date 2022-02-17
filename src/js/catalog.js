export default function catalog() {
    const mainContainer = document.querySelector('.main-container');
    mainContainer.style.background = 'linear-gradient(0deg, #D6D6D6, #fff)';

    if (document.documentElement.clientWidth < 576) {
        const catalogItem = document.querySelectorAll('.catalog__item');
        const btns = document.querySelectorAll('.catalog__item__btn');
        const itemInfo = document.querySelectorAll('.catalog__item__info');

        itemInfo.forEach((item, i) => {
            item.removeChild(btns[i]);
            catalogItem[i].appendChild(btns[i]);
        });
    }
}