import modalClient from './modalWindows/modalClient';

export default async function nav() {

    const body = document.querySelector('body');
	const mainContainer = document.querySelector('.main-container');
	const containerOvh = document.querySelector('.container-ovh')
    const navWrapper = document.querySelector('.nav__wrapper');
    const smoothLinks = document.querySelectorAll('.nav__anchor');
    const navBtn = document.querySelector('.nav__btn');
    const dropMenu = document.querySelector('.nav__drop-down-menu');
    const linkDropMenu = document.querySelector('.nav__link-drop-menu');
    const iconDropMenu = document.querySelector('.nav__drop-down-menu__icon');

    if (document.documentElement.clientWidth >= 576) {
        navWrapper.classList.add('nav__wrapper_desktop');
        
        for (let smoothLink of smoothLinks) {
            smoothLink.addEventListener('click', function (e) {
				
				if (document.location.pathname === '/') {
					e.preventDefault();
					const id = smoothLink.getAttribute('id');
		
					document.querySelector(id).scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				} else {
					return
				}
            });
        };
    
        function showMenu() {
            dropMenu.classList.add('nav__drop-down-menu_active'); 
            iconDropMenu.classList.add('nav__drop-down-menu__icon_active');
            linkDropMenu.removeEventListener('click', showMenu);
            linkDropMenu.addEventListener('click', hideMenu);
        }
    
        function hideMenu() {
            dropMenu.classList.remove('nav__drop-down-menu_active'); 
            iconDropMenu.classList.remove('nav__drop-down-menu__icon_active');
            linkDropMenu.removeEventListener('click', hideMenu);
            linkDropMenu.addEventListener('click', showMenu);
        }
    
        linkDropMenu.addEventListener('click', showMenu);
    
        navBtn.addEventListener('click', (e) => {
            modalClient(e, '/mailer/feedback');
        });
    } else {
        body.removeChild(navWrapper);

        const navMobile = `
            <div class="container__nav-mobile nav__wrapper_mobile">
                <div class="nav__hamburger">
                    <span class="nav__hamburger__item"></span>
                    <span class="nav__hamburger__item"></span>
                    <span class="nav__hamburger__item"></span>
                </div>
                
                <address><a href="/" class="nav__logo__box_mobile"><img src="/icons/logoBlack.svg" class="nav__logo_mobile"/></a></address>
                
            </div>
        `

        const navMobileMenu = document.createElement('nav');
        const navMobileOvh = document.createElement('div');
        navMobileOvh.classList.add('nav__menu_mobile');
        navMobileOvh.appendChild(navMobileMenu)

        // navMobileMenu.classList.add('nav__menu_mobile');
        const menuMobile = (listPhones) => {
            return `
                <div class="container__nav-mobile nav__wrapper__menu_mobile">
                    <div class="nav__wrapper_mobile">

                        
                        <img class="nav__close_mobile" src="/icons/menuClose.svg"></>
                        <address><a href="/" class="nav__logo__box_mobile"><img src="/icons/logoBlack.svg" class="nav__logo_mobile"/></a></address>

                    </div>

                    <div class="container nav__container_mobile">
                        <ul>
                            <li class="nav__link_mobile">

                                <div class="nav__drop-down-menu__box_mobile">
                                    <a class="nav__link-drop-menu_mobile">Каталог</a>
                                    <div class="nav__drop-down-menu__icon_mobile"></div>
                                </div>

                                <ul class="nav__drop-down-menu_mobile">
                                    <li class="nav__drop-down-menu__item_mobile"><a href="/catalog/personal/">Личный автомобиль</a></li>
                                    <li class="nav__drop-down-menu__item_mobile"><a href="/catalog/commercial/">Коммерческий автомобиль</a></li>
                                    <li class="nav__drop-down-menu__item_mobile"><a href="/catalog/special/">Специальный транспорт</a></li>
                                </ul>
                            </li>
                            <div class="nav__line_mobile"></div>
                            <li class="nav__link_mobile"><a href="/#about" class="nav__anchor_mobile">О нас</a></li>
                            <div class="nav__line_mobile"></div>
                            <li class="nav__link_mobile"><a href="/#rent" class="nav__anchor_mobile">Об аренде</a></li>
                            <div class="nav__line_mobile"></div>
                        </ul>

                        <ul class="nav__phone-list_mobile">
                            ${listPhones}
                        </ul>

                        <div class="nav__btn__box_mobile">
                            <button class="btn nav__btn_mobile">Оставить заявку</button>
                        </div>
                        
                    </div>

                </div> 
            `
        }

        let phoneListServer = null;

        await fetch('/phone')
            .then(phone => phone.json())
            .then(phone => phoneListServer = phone);

        let phoneListHtml = phoneListServer.map((item, i) => {
            return `<li class="nav__phone__item_mobile"><a href="tel:${item.phone}" id="${item._id}">${item.phoneUI}</a></li>`
        });

        phoneListHtml = phoneListHtml.join('')

        navMobileMenu.innerHTML = await menuMobile(phoneListHtml);

        body.insertAdjacentHTML('afterbegin', navMobile);
        body.insertAdjacentElement('afterbegin', navMobileOvh);

        const dropMenu = document.querySelector('.nav__drop-down-menu_mobile');
        const anchorMobile = document.querySelectorAll('.nav__anchor_mobile');
        const iconDropMenu = document.querySelector('.nav__drop-down-menu__icon_mobile');
        const linkDropMenu = document.querySelector('.nav__drop-down-menu__box_mobile');
        const navHamburger = document.querySelector('.nav__hamburger');
        const navClose = document.querySelector('.nav__close_mobile');
        const navBtn = document.querySelector('.nav__btn_mobile');

		anchorMobile.forEach(item => {
			item.addEventListener('click', hideMenu);
		});

		if(document.location.pathname === '/') {
			for (let smoothLink of anchorMobile) {
				smoothLink.addEventListener('click', function (e) {
					e.preventDefault();
					const id = smoothLink.getAttribute('href').match(/\w+/g)[0];
		
					document.querySelector(`#${id}`).scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				});
			};
		}

        function showDropMenu() {
            dropMenu.classList.add('nav__drop-down-menu_mobile_active'); 
            iconDropMenu.classList.add('nav__drop-down-menu__icon_mobile_active');
            linkDropMenu.removeEventListener('click', showDropMenu);
            linkDropMenu.addEventListener('click', hideDropMenu);
        }
    
        function hideDropMenu() {
            dropMenu.classList.remove('nav__drop-down-menu_mobile_active'); 
            iconDropMenu.classList.remove('nav__drop-down-menu__icon_mobile_active');
            linkDropMenu.removeEventListener('click', hideDropMenu);
            linkDropMenu.addEventListener('click', showDropMenu);
        }

        function showMenu() {
            navMobileOvh.classList.add('nav__menu_mobile_active');
			body.classList.add('body-ovh');
        }

        function hideMenu() {
            navMobileOvh.classList.remove('nav__menu_mobile_active');
			body.classList.remove('body-ovh')
        }
    
        linkDropMenu.addEventListener('click', showDropMenu);
        navHamburger.addEventListener('click', showMenu);
        navClose.addEventListener('click', hideMenu);

        navBtn.addEventListener('click', (e) => {
            hideMenu()
            modalClient(e, '/mailer/feedback');
        });
    }

}
