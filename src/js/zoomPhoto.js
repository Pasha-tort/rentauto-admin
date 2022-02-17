import modalClientPhoto from "./modalWindows/modalClientPhoto";
import { showModal } from "./modalWindows/modalShowFind";

export default function zoomPhoto() {
    const photo = document.querySelector('.details__slider__main-photo');

    photo.addEventListener('click', (e) => {
        const src = e.target.src;
        const modal = modalClientPhoto(src);
        showModal(modal, e.target)
    });
}