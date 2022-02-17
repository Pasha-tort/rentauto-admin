export default function catalogHome() {
    const catalogItem = document.querySelectorAll('.catalogHome__item');
    const catalogImg = document.querySelectorAll('.catalogHome__img');
    const catalogInfo = document.querySelectorAll('.catalogHome__info');
    const catalogImgBox = document.querySelectorAll('.catalogHome__img-box');

    const heightImg = +window.getComputedStyle(catalogImg[0]).height.match(/\d+/g)[0];

    catalogItem.forEach((item, i) => {
        item.addEventListener('mouseover', () => {
            catalogImg[i].style.bottom = '10px'
        });
        item.addEventListener('mouseout', () => {
            catalogImg[i].style.bottom = '0px'
        });
        // item.style.gridTemplateRows = `${heightImg - 20}px`;
    });

    if (document.documentElement.clientWidth < 768) {
        catalogInfo.forEach((item, i) => {
            catalogItem[i].removeChild(item);
            catalogItem[i].appendChild(catalogInfo[i]);
        });
    }

    catalogImgBox.forEach(item => {
        item.style.height = `${heightImg - 20}px`;
    })

    

    
}
