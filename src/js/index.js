import nav from './nav';
import sliderHeader from './sliderHeader';
import scrollSlider from './scrollSlider';
import catalogHome from './catalogHome';
import questions from './questions';
import exchange from './exchange';
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

window.addEventListener("DOMContentLoaded", async () => {

    window.addEventListener('scroll', scrollOpenCookies);
    
        await nav();
        sliderHeader();
        catalogHome();
        exchange();
        scrollSlider();
        questions();
});