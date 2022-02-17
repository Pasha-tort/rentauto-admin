function leftBlock(title, desc, urlImg) {
    return `
        <li class="catalog__item">
            <div class="catalog__info">
                <div class="catalog__title">${title}</div>
                <div class="catalog__desc">${desc}</div>
                <button class="btn catalog__btn">Подробнее</button>
                <button class="btn-admin catalogHome__btn_admin_add">Добавить</button>
                <button class="btn-admin catalogHome__btn_admin_edit">Редавктировать</button>
            </div>
            <div class="catalog__img-box">
                <img class="catalog__img" src="${urlImg}">
            </div>
        </li>
    `
}

function rightBlock(title, desc, urlImg) {
    return `
        <li class="catalog__item">
            <div class="catalog__img-box">
                <img class="catalog__img" src="${urlImg}">
            </div>
            <div class="catalog__info">
                <div class="catalog__title">${title}</div>
                <div class="catalog__desc">${desc}</div>
                <button class="btn catalog__btn">Подробнее</button>
                <button class="btn-admin catalogHome__btn_admin_add">Добавить</button>
                <button class="btn-admin catalogHome__btn_admin_edit">Редавктировать</button>
            </div>
        </li>
    `
}

module.exports = function renderCatalog(catalogHome) {
    let resultHTML = [];

    console.log(catalogHome)
    console.log('start')

    catalogHome.forEach((item, i) => {
        const {title, desc, urlImg} = item;

        if (i % 2 === 0) {
            resultHTML.push(leftBlock(title, desc, urlImg));
            
        }
        if (i % 2 !== 0) {
            resultHTML.push(rightBlock(title, desc, urlImg));
        }
    });
    
    return resultHTML.join('');
}