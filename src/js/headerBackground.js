export default function headerBackground() {
    const nav = document.querySelector('.nav__wrapper') || document.querySelector('.nav__wrapper_mobile');
    const headerBackground = document.querySelector('.catalog__header');

    headerBackground.style.height = document.documentElement.clientHeight - +window.getComputedStyle(nav).height.match(/\d+/g)[0] + 'px';
}