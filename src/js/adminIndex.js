import adminModalQuestions from './modalWindows/adminModalQuestions';
import adminModalPhone from './modalWindows/adminModalPhone';
import adminModalAdvantages from './modalWindows/adminModalAdvantages';
import adminModalCatalogHome from './modalWindows/adminModalCatalogHome';
import adminModalExchange from './modalWindows/adminModalExchange';

window.addEventListener("DOMContentLoaded", async () => {
	adminModalPhone();
	adminModalExchange();
	adminModalQuestions();
	adminModalAdvantages();
	adminModalCatalogHome();
});