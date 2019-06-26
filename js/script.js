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
				item = i;
				arrowOn();
			});
		});
	});

	let stopper = false;

	function onWheel() {
		if (stopper === true) {
			return;
		} else {
			let scroll = window.event.deltaY;
			if (scroll > 0) {
				pagePlus();
			} else if (scroll < 0) {
				pageMinus();
			}
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
		}
		sections[item].style.transform = "translatey(0)";
		arrowOn();
	}

	function arrowOn() {
		if (item > 0) {
			up.style.display = "block";
			setTimeout(() => {
				up.style.opacity = "1";
			}, 100);
		}
		if (item === 0) {
			up.style.opacity = "0";
			setTimeout(() => {
				up.style.display = "none";
			}, 500);
		}
		if (item < sections.length) {
			down.style.transform = "translatey(0)";
			up.style.transform = "translatey(0)";
		}
		if (item >= sections.length - 1) {
			down.style.transform = "translatey(50px)";
			up.style.transform = "translatey(30px)";
		}
	}

	const portfolio = document.querySelector(".portfolio"),
		blockSites = document.querySelector(".sites"),
		blockPractise = document.querySelector(".practise"),
		modal = document.querySelector(".modal"),
		modalCloseBtn = document.querySelector(".modal-close");

	portfolio.addEventListener("mouseover", function (event) {
		let target = event.target;
		if (blockSites.contains(target)) {
			blockSites.style.transform = "scale(1.1)";
		} else {
			blockSites.style.transform = "scale(1)";
		}
		if (blockPractise.contains(target)) {
			blockPractise.style.transform = "scale(1.1)";
		} else {
			blockPractise.style.transform = "scale(1)";
		}
	});

	portfolio.addEventListener("click", function (event) {
		let target = event.target;
		if (blockSites.contains(target)) {
			modal.style.display = "grid";
			stopper = true;
		}
		if (blockPractise.contains(target)) {
			modal.style.display = "grid";
			stopper = true;
		}
	});

	modalCloseBtn.addEventListener("click", () => {
		modal.style.display = "none";
		stopper = false;
	});
});