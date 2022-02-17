import modalClient from "./modalWindows/modalClient";

export default function details() {
    const detailsBtn = document.querySelector('.details__btn');
    const detailsInfo = document.querySelector('.details__info');
    const detailsPrice = document.querySelector('.details__price');

    detailsInfo.removeChild(detailsBtn);
    detailsPrice.insertAdjacentElement('afterend', detailsBtn)

    detailsBtn.addEventListener('click', (e) => {
        modalClient(e, '/mailer/machine');
    });

    const lineDetails = '<div class="details__line_mobile"></div>';

    detailsBtn.insertAdjacentHTML("afterend", lineDetails);
}