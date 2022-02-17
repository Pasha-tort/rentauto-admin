import modalExchange from './modalWindows/modalExchange';

export default function exchange() {
    const btn = document.querySelector('.exchange-auto__btn');
    
    btn.addEventListener('click', (e) => {
        modalExchange(e)
    });
}