function validation(){
    function onlyDigits(element) {
        element.addEventListener('keyup', function () {
            this.value = this.value.replace(/[^0-9]+/g, '');
        });
    }
}

module.exports = validation;