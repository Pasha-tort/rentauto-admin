import adminModalPhone from './modalWindows/adminModalPhone';
import adminModalSpecificationsMachines from './modalWindows/adminModalSpecificationsMachins';
import adminModalMachine from './modalWindows/adminModalMachine';
import adminModalCatalogTitle from './modalWindows/adminModalCataloTitle';
import adminModalRentTerms from './modalWindows/adminModalRentTerms';
import deleteMachines from './modalWindows/deleteMachines';

window.addEventListener("DOMContentLoaded", async () => {
	adminModalPhone();
	deleteMachines();
	adminModalSpecificationsMachines();
	adminModalMachine();
	adminModalCatalogTitle();
	adminModalRentTerms();
});