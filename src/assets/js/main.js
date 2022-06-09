
document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('.burger');
	// const menu = document.querySelector('.menu');
	// const form = document.querySelector('.form');
	// const telSelector = document.querySelector('.form-contacts__input-tel');


	burger.addEventListener('click', burgerToggler());

	function burgerToggler() {
		if (!menu.classList.contains('active')) {
			burger.classList.add('active');
			menu.classList.add('active');
			document.body.classList.add('no-scroll')
		} else {
			burger.classList.remove('active');
			menu.classList.remove('active');
			document.body.classList.remove('no-scroll')
		}
	}
});



