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
		modalBlock = document.querySelector(".modal-block"),
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
			showModal("site");
		}
		if (blockPractise.contains(target)) {
			showModal("practise");
		}
	});

	function showModal(type) {
		modal.style.display = "grid";
		stopper = true;
		loadWorks(type);
		setTimeout(() => {
			modal.style.opacity = "1";
		}, 100);
	}

	modalCloseBtn.addEventListener("click", () => {
		modal.style.display = "none";
		stopper = false;
		modalBlock.innerHTML = "";
		modal.style.opacity = "0";
	});

	function loadWorks(type) {
		fetch("js/sites.json")
			.then((value) => {
				if (value.status !== 200) {
					return Promise.reject(value);
				}
				return value.json();
			})
			.then((output) => {
				output.forEach((item) => {
					let name = item.name,
						descr = item.description,
						url = item.url,
						img = item.image;

					if (type === item.type) {
						modalBlock.innerHTML += `
						<div class="modal-item">
							<div class="modal-image">
								<img src="${img}">
							</div>
							<h3 class="modal-title">${name}</h3>
							<p>${descr}</p>
							<a class="modal-button"href="${url}">Перейти</a>
						</div>
					`;
					}
				});
			})
			.catch(function () {
				modalBlock.innerHTML = '<h2">Ошибка</h2">';
			});
	}

	const form = document.querySelector("#form"),
		submitBtn = form.querySelector("[type='submit']");

	submitBtn.addEventListener('click', postData);

	function postData(e) {
		e.preventDefault();

		let str = "&name=" + encodeURIComponent(form.name.value) +
			"&phone=" + encodeURIComponent(form.phone.value) +
			"&mail=" + encodeURIComponent(form.mail.value) +
			"&message=" + encodeURIComponent(form.message.value);
		console.log(str);

		fetch('smart.php', {
			method: 'POST',
			body: str
		}).then(function (response) {
			console.log(response);
			return response;
		}).then(function (data) {
			console.log(data);
		});
	}
});