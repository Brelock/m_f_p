glob.ValidationModule = (function() {
	function validate(inputElement, validationsArray) {
		const validations = validationsArray;
		let messages = [];

		function isNumber(input) {
			return !isNaN(parseFloat(input.value)) && isFinite(input.value);
		}

		function isEmail(input) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   
			return regex.test(input.value);
		}

		function isEmpty(input) {
			// if (input.classList.contains("input_mask_phone") ) {
			// 	if (input.value.replace(/\s/g,"").length == 12) {
			// 		return false;
			// 	}
			// 		return true;
			// }
			// if (input.value === '380') {
			// 	return true;
			// }
			return input.value.replace(/\s/g,"").length ? false : true;
		}

		function checkLenght(input) {
			var minSymbols = Number(input.dataset.minLength);
			console.log(input.value.replace(/\s/g,"").length)
			return input.value.replace(/\s/g,"").length < minSymbols ? false : true;
		}

		function isInpChecked(input) {
			return input.checked;
		}

		// ---------------------

		for (let i = 0; i < validations.length; i++) {

			switch (validations[i]) {
				case 'required': 
					if ( isEmpty(inputElement) ) {
						messages.push(inputElement.dataset.errorText)
					}
				break;

				case 'isNumber': 
					if ( !isNumber(inputElement) ) {
						messages.push(inputElement.dataset.errorText)
					}
				break;

				case 'isEmail': 
					if ( !isEmail(inputElement) ) {
						messages.push(inputElement.dataset.errorText);
					}
				break;

				case 'length': 
					if ( !checkLenght(inputElement) ) {
						messages.push(inputElement.dataset.errorText);
					}
				break;

				case 'requiredRadio': 
					if ( !isInpChecked(inputElement) ) {
						messages.push(inputElement.dataset.errorText)
					}
				break;

				default: console.error('invalid input data-validate value')

			}
		}
		// console.log(messages.length ? messages : null)
		return messages.length ? messages : null;
	}

	function showWarning(inputElement, messages, textColor) {
		inputElement.classList.add('js_containsError');
		let warningList = $('<ul class="js_warning-list"></ul>');

		for (let i = 0; i < messages.length; i++) {
			let listElement = $("<li></li>").text(messages[i]);
			textColor ? listElement.css('color', textColor) : null;
			warningList.append(listElement)
		}

		$(inputElement).parent().hasClass('chosen-wrapper') ?
			$(inputElement).next().after(warningList) :
			$(inputElement).after(warningList);
	}

	function isValid(formElement) {
		const form = formElement instanceof jQuery ? formElement[0] : formElement;
		const inputs = form.querySelectorAll('[data-validate]:not(:disabled)');
		// console.log('inputs', inputs);
		let errorsCounter = 0;

		for (let i = 0; i < inputs.length; i++) {
			let errorMessages = [];
			let textColor = inputs[i].dataset.textColor;

			$(inputs[i]).removeClass("js_containsError");
			$(inputs[i]).nextAll('.js_warning-list').remove();

			let validationsArray = [];
			let inputData = inputs[i].dataset.validate ? inputs[i].dataset.validate.split(' ') : false;

			// ---------
			inputs[i].value = inputs[i].value.trim();
			// ---------

			validationsArray = inputData ? inputData : null;
			// inputs[i].required ? validationsArray.push('required') : null;
			
			if (validationsArray.length) {
				let validationResult = validate(inputs[i], validationsArray);
				validationResult ? errorMessages = validationResult : null;
			}

			if (errorMessages.length) { 
				showWarning(inputs[i], errorMessages, textColor);
				errorsCounter++;
			}
		}

		return errorsCounter > 0 ? false : true;
	}

	// ---------------
	return {
		isValid: isValid,
	}
})()

// ---------Validation Script Test-------------

// $('body').on('click', 'button[type="submit"]', function(e) {
// 	// console.log('ok')
// 	e.preventDefault();

// 	// ValidationModule.isValid(this.form)
// 	if( !ValidationModule.isValid(this.form) ) {
// 		console.log('form not valid: ', this.form)
// 	} else {
// 		console.log('form valid: ', this.form)
// 	}
// })