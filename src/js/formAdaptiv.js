export default function formAdaptiv() {
    const formWrapper = document.querySelector('.catalog__feedback__wrapper');
    const formImg = document.querySelector('.catalog__feedback__img');

    if(document.documentElement.clientWidth <= 991 && document.documentElement.clientWidth >= 576) {
        formWrapper.removeChild(formImg);
    }

    let adaptivImgUrl;

    if (document.location.pathname === '/catalog/personal' || document.location.pathname === '/catalog/personal/') {
        adaptivImgUrl = '/img/catalog/personal/feedbackMobile.webp'
    } else if (document.location.pathname === '/catalog/commercial' || document.location.pathname === '/catalog/commercial/') {
        adaptivImgUrl = '/img/catalog/commercial/feedbackMobile.webp'
    } else if (document.location.pathname === '/catalog/special' || document.location.pathname === '/catalog/special/') {
        adaptivImgUrl = '/img/catalog/special/feedbackMobile.webp'
    }

    if(document.documentElement.clientWidth <= 576) {
        formWrapper.removeChild(formImg);
        const adaptivImg = `<img src="${adaptivImgUrl}" class="catalog__feedback__img_mobile">`;
        formWrapper.insertAdjacentHTML('afterbegin', adaptivImg);
    }
}