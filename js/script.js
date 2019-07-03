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

	scrollOnTouch();

	function scrollOnTouch() {

		let startY,
			endY;

		window.addEventListener('touchstart', (e) => {
			startY = e.changedTouches[0].pageY;
		});

		window.addEventListener('touchend', (e) => {
			if (stopper === true) {
				return;
			} else {
				endY = e.changedTouches[0].pageY;
				if (endY < startY && endY !== startY) {
					pagePlus();
				} else if (endY > startY && endY !== startY) {
					pageMinus();
				}
			}
		});
	}

	const portfolio = document.querySelector(".portfolio"),
		blockSites = document.querySelector(".sites"),
		blockPractise = document.querySelector(".practise"),
		modal = document.querySelector(".modal"),
		modalWrap = document.querySelector(".modal-wrapper"),
		modalBlock = document.querySelector(".modal-block"),
		modalCloseBtn = document.querySelector(".modal-close");

	portfolio.addEventListener("click", () => {
		let target = event.target;
		if (blockSites.contains(target)) {
			showModal("site");
		}
		if (blockPractise.contains(target)) {
			showModal("practise");
		}
	});

	modal.addEventListener('click', () => {
		let target = event.target;
		if (!modalWrap.contains(target)) {
			closeModal();
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
		closeModal();
	});

	function closeModal() {
		modal.style.display = "none";
		stopper = false;
		modalBlock.innerHTML = "";
		modal.style.opacity = "0";
	}

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
								<img src="img/${img}">
							</div>
							<div class="modal-text">
								<h3 class="modal-title">${name}</h3>
								<p>${descr}</p>
								<a class="modal-button"href="${url}">Перейти</a>
							</div>
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
		answer = form.querySelector(".answer"),
		contButton = document.querySelector(".contacts-button");

	contButton.addEventListener('click', () => {
		showModal();
		let form2 = form.cloneNode(true);
		form2.classList.add('modal-form');
		form2.querySelector(".form-title").style.display = "none";
		form2.style.display = "block";
		modalBlock.appendChild(form2);
	});

	form.addEventListener('submit', postData);

	function postData(e) {
		e.preventDefault();

		let str = "name=" + encodeURIComponent(form.name.value) +
			"&phone=" + encodeURIComponent(form.phone.value) +
			"&mail=" + encodeURIComponent(form.mail.value) +
			"&message=" + encodeURIComponent(form.message.value);
		fetch('mailer/smart.php', {
			method: 'POST',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
			},
			body: str
		}).then(function (response) {
			if (response.status !== 200) {
				return Promise.reject(response);
			}
			return response;
		}).then(function () {
			let input = form.querySelectorAll(".input");
			for (let i = 0; i < input.length - 1; i++) {
				input[i].value = '';
			}
			answer.innerHTML = 'Сообщение отправлено';
			setTimeout(() => {
				answer.innerHTML = '';
			}, 5000);
		}).catch(function (reason) {
			answer.innerHTML = 'Ошибка';
			setTimeout(() => {
				answer.innerHTML = '';
			}, 5000);
			console.error('error: ' + reason.status);
		});
	}

	const partner = document.querySelector('.partner'),
		defaultBanner = "<a href='https://link-host.net/billing/pl.php?16555' alt='Link-Host.net' target='_blank'><img src='https://link-host.net/billing/_rootimages/banners/468.gif' border='0'></a>",
		smallBanner = "<a href='https://link-host.net/billing/pl.php?16555' alt='Link-Host.net' target='_blank'><img src='https://link-host.net/billing/_rootimages/banners/125.gif' border='0'></a>";

	if (screen.width < 576) {
		partner.innerHTML = smallBanner;
	} else {
		partner.innerHTML = defaultBanner;
	}

	window.addEventListener('resize', () => {
		if (screen.width < 576) {
			partner.innerHTML = smallBanner;
		} else {
			partner.innerHTML = defaultBanner;
		}
	});
});