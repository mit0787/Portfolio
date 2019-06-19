"use strict";
document.addEventListener("DOMContentLoaded", function() {
	const arrow = document.querySelector('.bottom-arrow'),
		sections = document.querySelectorAll('section');

	arrow.addEventListener('click', () => {
		sections[0].style.display = "none";
	});
});