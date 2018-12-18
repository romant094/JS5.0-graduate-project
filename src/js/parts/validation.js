function validation(){
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
}

module.exports = validation;