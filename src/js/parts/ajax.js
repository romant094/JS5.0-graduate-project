//forms AJAX
function ajax() {
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
		onlyDigits(formInput[i]);
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
}

module.exports = ajax;