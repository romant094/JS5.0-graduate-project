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

module.exports = calc;