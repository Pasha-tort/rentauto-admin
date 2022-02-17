import nav from './nav';
import headerBackground from './headerBackground';
import forms from './forms';
import formAdaptiv from './formAdaptiv';
import submitForm from './submitForm';
import catalog from './catalog';
import { scrollOpenCookies } from './cookie';


window.addEventListener("DOMContentLoaded", async () => {

    window.addEventListener('scroll', scrollOpenCookies);

	await nav();
	headerBackground();
	catalog();
	forms();
	formAdaptiv();
	submitForm('.form-client', '/mailer/feedback');

});

