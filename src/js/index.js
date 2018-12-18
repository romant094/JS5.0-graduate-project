let d = document,
	popupEngineerBtn = d.querySelector('.popup_engineer_btn'),
	popupEngineer = d.querySelector('.popup_engineer'),
	popupEngineerContent = d.querySelector('.popup_engineer .popup_content'),
	phoneLink = d.querySelectorAll('.phone_link'),
	popup = d.querySelector('.popup'),
	popupContent = d.querySelector('.popup .popup_content'),
	popupClose = d.querySelectorAll('.popup_close');

// Modals
function showInSixtySeconds() {
	setTimeout(() => {
		showHideModal(popup)
	}, 60000);
}

showInSixtySeconds();

popupEngineerBtn.addEventListener('click', () => {
	showHideModal(popupEngineer);
});

phoneLink.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		showHideModal(popup);
	});
});

function hideModal(modalContainer, modalContent, closeButton, event) {
	let t = event.target;
	if (t.tagName == 'STRONG') {
		t = t.parentNode;
	}
	if ((t == modalContainer || t == closeButton) && t != modalContent) {
		showHideModal(modalContainer);
	}
}

function showHideModal(modal) {
	modal.classList.toggle('display-none');
	d.body.classList.toggle('overflow-hidden');
}

// tabs
let tabTriggers = d.querySelectorAll('.glazing_block'),
	tabBlocks = d.querySelectorAll('.glazing .row'),
	tabDecorTriggers = d.querySelectorAll('.no_click'),
	tabDecorBlocks = d.querySelectorAll('.decoration .decor-block');

tabsAction(tabTriggers, tabBlocks, 'active');
tabsAction(tabDecorTriggers, tabDecorBlocks, 'after_click');

function tabsAction(triggers, contents, activeClass) {
	for (let i = 0; i < triggers.length; i++) {
		triggers[i].addEventListener('click', function (event) {
			event.preventDefault();
			
			for (let j = 0; j < triggers.length; j++) {
				if (i != j) {
					triggers[j].classList.remove(activeClass);
					contents[j].classList.add('display-none');
				}
			}
			
			this.classList.add(activeClass);
			contents[i].classList.remove('display-none');
		});
	}
}

// pictures popup
let imgPopupWrap = d.createElement('div'),
	imgPopup = d.createElement('img'),
	imgLink = d.querySelectorAll('.works a'),
	imgPopupWrapCss = {
		'position': 'fixed',
		'top': 0 + 'px',
		'left': 0 + 'px',
		'width': 100 + '%',
		'height': 100 + '%',
		'background-color': 'rgba(0,0,0,.75)',
		'z-index': 100,
		'display': 'flex',
		'align-items': 'center',
		'justify-content': 'center'
	};

for (let prop in imgPopupWrapCss) {
	imgPopupWrap.style.cssText += `${prop}:${imgPopupWrapCss[prop]}`;
}

imgPopup.style.maxHeight = 90 + '%';
imgPopupWrap.classList.add('animated', 'fadeIn');

imgLink.forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		let href = this.getAttribute('href');
		imgPopup.setAttribute('src', href);
		imgPopupWrap.appendChild(imgPopup);
		d.body.appendChild(imgPopupWrap);
		d.body.classList.toggle('overflow-hidden');
	});
});

d.addEventListener('click', (event) => {
	let t = event.target;
	if (t == imgPopupWrap && t != imgPopup) {
		d.body.removeChild(imgPopupWrap);
		d.body.classList.toggle('overflow-hidden');
	}
});

// timer
let deadline = '2019-07-04';

function getTimeRemaining(endtime) {
	let t = Date.parse(endtime) - Date.parse(new Date()),
		seconds,
		minutes,
		hours,
		days;
	
	if (t > 0) {
		days = Math.floor(t / (1000 * 60 * 60 * 24));
		hours = Math.floor((t - (days * 24 * 3600 * 1000)) / (1000 * 60 * 60));
		minutes = Math.floor((t / 1000 / 60) % 60);
		seconds = Math.floor((t / 1000) % 60);
	} else {
		seconds = 0;
		minutes = 0;
		hours = 0;
		days = 0;
	}
	
	return {
		'total': t,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds,
		'days': days
	};
}

function setTimer(id, endtime) {
	let timer = d.querySelector('#timer'),
		days = timer.querySelector('#days'),
		hours = timer.querySelector('#hours'),
		minutes = timer.querySelector('#minutes'),
		seconds = timer.querySelector('#seconds'),
		timeInterval = setInterval(updateTimer, 1000);
	
	function formatTime(x) {
		if (x < 10) x = '0' + x;
		return x;
	}
	
	function updateTimer() {
		let t = getTimeRemaining(endtime);
		
		days.textContent = formatTime(t.days);
		hours.textContent = formatTime(t.hours);
		minutes.textContent = formatTime(t.minutes);
		seconds.textContent = formatTime(t.seconds);
		
		if (t.total < 0) {
			clearInterval(timeInterval);
		}
	}
}

setTimer('timer', deadline);

//calc

let calcStart = d.querySelectorAll('.popup_calc_btn'),
	popupCalc = d.querySelector('.popup_calc'),
	popupCalcContent = d.querySelector('.popup_calc_content'),
	popupCalcClose = d.querySelector('.popup_calc_close'),
	popupCalcProfile = d.querySelector('.popup_calc_profile'),
	popupCalcProfileContent = d.querySelector('.popup_calc_profile_content'),
	popupCalcProfileClose = d.querySelector('.popup_calc_profile_close'),
	popupCalcEnd = d.querySelector('.popup_calc_end'),
	popupCalcEndContent = d.querySelector('.popup_calc_end .popup_content'),
	popupCalcEndClose = d.querySelector('.popup_calc_end_close'),
	balconType = d.querySelectorAll('.balcon_icons a img'),
	balconTypeImg = d.querySelectorAll('.big_img img'),
	calcCost = {};

calcStart.forEach((button) => {
	button.addEventListener('click', () => {
		showHideModal(popupCalc);
		calcCost.balconyForm = 0;
	});
});

tabsAction(balconType, balconTypeImg, 'do_image_more');

for (let i = 0; i < balconType.length; i++) {
	balconType[i].addEventListener('click', () => {
		calcCost.balconyForm = i;
	})
}

let calcWidth = d.querySelector('#width'),
	calcHeight = d.querySelector('#height');

onlyDigits(calcWidth, 0);
onlyDigits(calcHeight, 0);

function onlyDigits(element, phone) {
	element.addEventListener('keyup', function () {
		if (phone == 1) {
			if (this.value.length > 10) {
				this.value = this.value.substring(0, 11);
			}
		}
		this.value = this.value.replace(/[^0-9]+/g, '');
	});
}

let popupCalcButton = d.querySelector('.popup_calc_button');

popupCalcButton.addEventListener('click', () => {
	if (calcWidth.value == '' || calcHeight == '') {
		alert('Значения ширины и высоты не могут быть пустыми!')
	} else {
		calcCost.width = +calcWidth.value;
		calcCost.height = +calcHeight.value;
		showHideModal(popupCalc);
		showHideModal(popupCalcProfile);
	}
});

let viewType = d.querySelector('#view_type'),
	coldImg = popupCalcProfile.querySelector('img'),
	coldCheckbox = popupCalcProfile.querySelector('label');


viewType.addEventListener('change', () => {
	calcCost.type = viewType.options[viewType.selectedIndex].value;
	if (viewType.options[viewType.selectedIndex].value === 'plastic') {
		coldImg.classList.add('display-none');
		coldCheckbox.classList.add('display-none');
	} else {
		coldImg.classList.remove('display-none');
		coldCheckbox.classList.remove('display-none');
	}
});

let profileCold = d.querySelector('#profile__cold'),
	profileWarm = d.querySelector('#profile__warm');

profileCold.addEventListener('change', () => {
	onlyOneSelected(profileCold, profileWarm);
	if (profileCold.checked) {
		calcCost.profileType = 'cold';
	}
});

profileWarm.addEventListener('change', () => {
	onlyOneSelected(profileWarm, profileCold);
	if (profileWarm.checked) {
		calcCost.profileType = 'warm';
	}
});

function onlyOneSelected(first, second) {
	if (first.checked) {
		if (second.checked) {
			second.checked = false;
		}
	}
}

let popupCalcProfileButton = d.querySelector('.popup_calc_profile_button');

popupCalcProfileButton.addEventListener('click', () => {
	calcCost.type = 'tree';
	if (!profileCold.checked && !profileWarm.checked) {
		alert('Выберите тип профиля!')
	} else {
		showHideModal(popupCalcProfile);
		showHideModal(popupCalcEnd);
	}
	
});

d.addEventListener('click', (event) => {
	hideModal(popupEngineer, popupEngineerContent, popupClose[1], event);
	hideModal(popup, popupContent, popupClose[0], event);
	hideModal(popupCalc, popupCalcContent, popupCalcClose, event);
	hideModal(popupCalcProfile, popupCalcProfileContent, popupCalcProfileClose, event);
	hideModal(popupCalcEnd, popupCalcEndContent, popupCalcEndClose, event);
});

popupCalcClose.addEventListener('click', () => {
	clearData();
});

popupCalcProfileClose.addEventListener('click', () => {
	clearData();
});

popupCalcEndClose.addEventListener('click', () => {
	clearData();
});

function clearData() {
	calcCost = {};
	calcWidth.value = '';
	calcHeight.value = '';
	profileWarm.checked = false;
	profileCold.checked = false;
	viewType.selectedIndex = 0;
	for (let i = 0; i < balconType.length; i++) {
		if (i == 0) {
			balconType[i].classList.add('do_image_more');
		} else {
			balconType[i].classList.remove('do_image_more');
		}
	}
}

//forms AJAX

let mainForms = d.querySelectorAll('.main_form'),
	formInput = d.querySelectorAll('.form_input'),
	message = {
		sending: 'Выполняется отправка...',
		success: 'Данные успешно отправлены!',
		failure: 'Что-то пошло не так...'
	},
	statusMessage = d.createElement('div'),
	popupForm = d.querySelector('.popup .form'),
	popupEngineerForm = d.querySelector('.popup_engineer .form'),
	calcEndForm = d.querySelector('.popup_calc_end .form');
statusMessage.classList.add('status-message');

for (let i = 0; i < formInput.length; i++) {
	if (formInput[i].getAttribute('name') === 'user_phone') {
		onlyDigits(formInput[i], 1);
	}
}

mainForms.forEach((form) => {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		ajaxSend(form, null);
	})
});

popupForm.addEventListener('submit', (event) => {
	event.preventDefault();
	ajaxSend(popupForm, popup);
});

popupEngineerForm.addEventListener('submit', (event) => {
	event.preventDefault();
	ajaxSend(popupEngineerForm, popupEngineer);
});

calcEndForm.addEventListener('submit', (event) => {
	event.preventDefault();
	ajaxSend(calcEndForm, popupCalcEnd, 'calc');
});

function ajaxSend(form, container, calc) {
	let ajaxSendForm = form,
		ajaxSendFormInput = ajaxSendForm.querySelectorAll('input');
	
	ajaxSendForm.appendChild(statusMessage);
	
	let formData = new FormData(ajaxSendForm);
	
	function postData() {
		return new Promise(function (resolve, reject) {
			let request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			
			
			let obj = {};
			formData.forEach(function (value, key) {
				obj[key] = value;
			});
			if (calc) {
				for (let prop in calcCost) {
					obj[prop] = calcCost[prop];
				}
			}
			
			let json = JSON.stringify(obj);
			request.send(json);
			
			request.addEventListener('readystatechange', function () {
				if (request.readyState < 4) {
					resolve();
				} else if (request.readyState === 4 && request.status == 200) {
					resolve();
				} else {
					reject();
				}
			});
		});
	}
	
	function clearInput() {
		ajaxSendFormInput.forEach((input) => {
			input.value = '';
		});
	}
	
	postData()
		.then(() => statusMessage.innerHTML = message.sending)
		.then(() => statusMessage.innerHTML = message.success)
		.then(() => {
			if (container != null) {
				setTimeout(() => {
					showHideModal(container);
					clearData();
					form.removeChild(statusMessage);
				}, 2000);
			}
		})
		.catch(() => statusMessage.innerHTML = message.failure)
		.then(clearInput);
}