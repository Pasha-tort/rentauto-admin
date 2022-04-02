import nav from './nav';
import detailsSlider from './detailsSlider';
import details from './details';
import zoomPhoto from './zoomPhoto';
import { scrollOpenCookies } from './cookie';


window.addEventListener("DOMContentLoaded", async () => {

    window.addEventListener('scroll', scrollOpenCookies);

	await nav();
	details();
	zoomPhoto();
	detailsSlider();

});


