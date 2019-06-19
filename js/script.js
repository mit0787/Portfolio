"use strict";
document.addEventListener("DOMContentLoaded", function () {
	const navbar = document.querySelector('.navbar'),
		arrow = document.querySelector('.bottom-arrow'),
		up = arrow.querySelector('.up'),
		down = arrow.querySelector('.down'),
		sections = document.querySelectorAll('section'),
		links = document.querySelectorAll('a[href^="#"]');

	sections.forEach(function (item, i, arr) {
		let zIndex = arr.length - i;
		item.style.zIndex = zIndex;
	});

	navbar.style.zIndex = sections.length + 1;
	arrow.style.zIndex = sections.length + 1;

	down.addEventListener('click', function () {
		pagePlus();
	});

	up.addEventListener('click', () => {
		pageMinus();
	});

	if (window.addEventListener) {
		if ('onwheel' in document) {
			// IE9+, FF17+, Ch31+
			window.addEventListener("wheel", onWheel);
		} else if ('onmousewheel' in document) {
			// устаревший вариант события
			window.addEventListener("mousewheel", onWheel);
		} else {
			// Firefox < 17
			window.addEventListener("MozMousePixelScroll", onWheel);
		}
	}

	let item = 0;

	links.forEach(function (itemL, i) {
		itemL.addEventListener('click', () => {
			sections.forEach((itemS, j, arr) => {
				if (j < i) {
					itemS.style.transform = "translatey(-100%)";
				}
				if (j > i) {
					arr[j - 1].style.transform = "translatey(0)";
				}
				arrowOn();
				item = i;
			});
		});
	});

	function onWheel() {
		let scroll = window.event.deltaY;
		if (scroll > 0) {
			pagePlus();
		} else if (scroll < 0) {
			pageMinus();
		}
	}

	function pagePlus() {
		if (item >= sections.length - 2) {
			item = sections.length - 2;
		}
		sections[item].style.transform = "translatey(-100%)";
		item++;
		arrowOn();
	}

	function pageMinus() {
		item--;
		if (item <= 0) {
			item = 0;
			up.style.stroke = "none";
		}
		sections[item].style.transform = "translatey(0)";
		arrowOn();
	}

	function arrowOn() {
		if (item > 0) {
			up.style.stroke = "black";
		}
		if (item < sections.length) {
			down.style.stroke = "black";
		}
		if (item >= sections.length - 1) {
			down.style.stroke = "none";
		}
	}

});