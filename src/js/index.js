import nav from './nav';
import sliderHeader from './sliderHeader';
import scrollSlider from './scrollSlider';
import catalogHome from './catalogHome';
import questions from './questions';
import headerBackground from './headerBackground';
import forms from './forms';
import formAdaptiv from './formAdaptiv';
import submitForm from './submitForm';
import catalog from './catalog';
import detailsSlider from './detailsSlider';
import details from './details';
import zoomPhoto from './zoomPhoto';
import bodyBackgroundOff from './bodyBackgroundOff';
import exchange from './exchange';
// import deleteMachines from './modalWindows/deleteMachines';
import { scrollOpenCookies } from './cookie';

// import adminModalQuestions from './modalWindows/adminModalQuestions';
// // import adminModalPhone from './modalWindows/adminModalPhone';
// import adminModalAdvantages from './modalWindows/adminModalAdvantages';
// import adminModalCatalogHome from './modalWindows/adminModalCatalogHome';
// import adminModalExchange from './modalWindows/adminModalExchange';

// import adminModalSpecificationsMachines from './modalWindows/adminModalSpecificationsMachins';
// import adminModalMachine from './modalWindows/adminModalMachine';
// import adminModalPhoto from './modalWindows/adminModalPhoto';
// import adminModalCatalogTitle from './modalWindows/adminModalCataloTitle';

window.addEventListener("DOMContentLoaded", () => {

    window.addEventListener('scroll', scrollOpenCookies);
	
	nav();
	sliderHeader();
	catalogHome();
	exchange();
	// setTimeout(() => {
	// 	scrollSlider()
	// }, 500)
	scrollSlider();
	questions();

    // const url = document.location.pathname;
    
	
	// if (url === '/') {
        


    //     if (document.querySelector('.phone__btn_admin_add')) {
    //         const {default: adminModalPhone} = await import('./modalWindows/adminModalPhone');
    //         adminModalPhone();
    //     }
    //     if (document.querySelector('.exchange-auto__btn-admin_edit')) {
    //         const {default: adminModalExchange} = await import('./modalWindows/adminModalExchange');
    //         adminModalExchange();
    //     }
    //     if (document.querySelector('.questions__btn_admin_add')) {
    //         const {default: adminModalQuestions} = await import('./modalWindows/adminModalQuestions');
    //         adminModalQuestions();
    //     }
    //     if (document.querySelector('.advantages__btn_admin_edit')) {
    //         const {default: adminModalAdvantages} = await import('./modalWindows/adminModalAdvantages');
    //         adminModalAdvantages();
    //     }
    //     if (document.querySelector('.catalogHome__btn_admin_edit')) {
    //         const {default: adminModalCatalogHome} = await import('./modalWindows/adminModalCatalogHome');
    //         adminModalCatalogHome();
    //     }
        
    // } else if (url === '/auth/login') {
    //     bodyBackgroundOff();
    // } else if(url === '/catalog/personal/' || url === '/catalog/commercial/' || url === '/catalog/special/' || url === '/catalog/personal' || url === '/catalog/commercial' || url === '/catalog/special') {
        

    //     if (document.querySelectorAll('.catalog-admin__btn_machine_delete')) {
    //         const {default: deleteMachines} = await import('./modalWindows/deleteMachines');
    //         deleteMachines();
    //     }
    //     if (document.querySelector('.phone-admin__btn-box')) {
    //         const {default: adminModalPhone} = await import('./modalWindows/adminModalPhone');
    //         adminModalPhone();
    //     }
    //     if (document.querySelector('.catalog-admin__add-specification')) {
    //         const {default: adminModalSpecificationsMachines} = await import('./modalWindows/adminModalSpecificationsMachins');
    //         adminModalSpecificationsMachines();
    //     }
    //     if (document.querySelector('.catalog-admin__add-machine')) {
    //         const {default: adminModalMachine} = await import('./modalWindows/adminModalMachine');
    //         adminModalMachine();
    //     }
    //     if (document.querySelector('.catalog-admin__btn_edit-title')) {
    //         const {default: adminModalCatalogTitle} = await import('./modalWindows/adminModalCataloTitle');
    //         adminModalCatalogTitle();
    //     }
    // } else {
        

    //     if (document.querySelector('.phone-admin__btn-box')) {
    //         const {default: adminModalPhone} = await import('./modalWindows/adminModalPhone');
    //         adminModalPhone();
    //     }
    //     if (document.querySelector('.details__added-photo')) {
    //         const {default: adminModalPhoto} = await import('./modalWindows/adminModalPhoto');
    //         adminModalPhoto();
    //     }    
    // }
});