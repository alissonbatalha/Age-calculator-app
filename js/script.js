function calculate () {
	const labelDay = document.querySelector("#label-day");
	const errorDay = document.querySelector("#error-day");
	const day = document.querySelector("#day");
	const dayValue = Number(day.value);
	const dayResult = document.querySelector("#day-span");
	
	const labelMonth = document.querySelector("#label-month");
	const errorMonth = document.querySelector("#error-month");
	const month = document.querySelector("#month");
	const monthValue = Number(month.value);
	const monthResult = document.querySelector("#month-span");
	
	const labelYear = document.querySelector("#label-year");
	const errorYear = document.querySelector("#error-year");
	const year = document.querySelector("#year");
	const yearValue = Number(year.value);
	const yearResult = document.querySelector("#year-span");
	
	
	
	const data = new Date ();
	const currentYear = data.getFullYear();
	const currentMonth = data.getMonth() + 1;
	const monthLength = new Date(currentYear, currentMonth, 0).getDate();
	const monthValueLength = new Date(yearValue, monthValue, 0).getDate();
	const currentDay = data.getDate();
	
	let validDay = false;
	let validMonth = false;
	let validYear = false;
	let validDate = false;
	
	//check errors
	function isValid (day, month, year) {
		if (dayValue < 1 || dayValue > monthValueLength) {
		labelYear.classList.add('label-error');
		day.classList.add('input-error');
		errorDay.innerText = 'Must be a valid day.';
	} else {
		day.classList.remove('input-error');
		labelYear.classList.remove('label-error');
	}
		
		if (monthValue < 1 || monthValue > 12) {
			alert('Digite um mês válido');
		}
		
		if (yearValue < 1900 || yearValue > currentYear) {
			alert('Digite um ano válido');
		}
		
		if (yearValue >= currentYear && monthValue > currentMonth || yearValue >= currentYear && monthValue >= currentMonth && dayValue > currentDay) {
			
		}
	}
	
	//day validations
	if (dayValue == '') {
		labelDay.classList.add('label-error');
		day.classList.add('input-error');
		errorDay.textContent = 'This field is required.';
	} else if (dayValue < 1 || dayValue > monthValueLength) {
		labelDay.classList.add('label-error');
		day.classList.add('input-error');
		errorDay.innerHTML = 'Must be a </br> valid day.';
	} else {
		day.classList.remove('input-error');
		labelDay.classList.remove('label-error');
		errorDay.textContent = '';
		validDay = true;
	}
	
	if (monthValue == '') {
		labelMonth.classList.add('label-error');
		month.classList.add('input-error');
		errorMonth.textContent = 'This field is required.';
	} else if (monthValue < 1 || monthValue > 12) {
		labelMonth.classList.add('label-error');
		month.classList.add('input-error');
		errorMonth.innerHTML= 'Must be a </br> valid month.';
	} else {
		month.classList.remove('input-error');
		labelMonth.classList.remove('label-error');
		errorMonth.textContent = '';
		validMonth = true;
	}
	
	if (yearValue == '') {
		labelYear.classList.add('label-error');
		year.classList.add('input-error');
		errorYear.textContent = 'This field is required.';
	} else if (yearValue < 1900 || yearValue > currentYear) {
		labelYear.classList.add('label-error');
		year.classList.add('input-error');
		errorYear.innerHTML = 'Must be a </br> valid year.';
	} else {
		year.classList.remove('input-error');
		labelYear.classList.remove('label-error');
		errorYear.textContent = '';
		validYear = true;
	}
	
	//date validation
	if (yearValue >= currentYear && monthValue > currentMonth || yearValue >= currentYear && monthValue >= currentMonth && dayValue > currentDay) {
		labelDay.classList.add('label-error');
		day.classList.add('input-error');
		labelMonth.classList.add('label-error');
		month.classList.add('input-error');
		year.classList.add('input-error');
		labelYear.classList.add('label-error');
		errorMonth.textContent = 'Must be a valid date.';
	} else {
		validDate = true;
	}
	
	//age calculate's code 
  let ageYear;
  if (monthValue < currentMonth || monthValue === currentMonth && dayValue <= currentDay) {
   ageYear = currentYear - yearValue;
  } else {
      ageYear = currentYear - yearValue - 1;
  }
  
	let ageMonth; 
	if (monthValue > currentMonth) {
		ageMonth = currentMonth - monthValue + 12;
	}
	if (monthValue < currentMonth) {
		ageMonth = currentMonth - monthValue;
	}
	if (monthValue <= currentMonth && dayValue > currentDay) {
		ageMonth = currentMonth - monthValue - 1;
	} 
	if (ageMonth < 0) {
		ageMonth = 0;
	}
	if ((currentMonth - monthValue + 12) === 12 && dayValue <= currentDay) {
		  ageMonth = 0;
	}
	
	let ageDay; 
	if (dayValue > currentDay) {
		ageDay = currentDay - dayValue + monthLength;
	} else {
		ageDay = currentDay - dayValue;
	}
	if (dayValue === currentDay) {
		ageDay = 0;
	}

	//printing the results on the web page
	if (validDay && validMonth && validYear && validDate) {
		yearResult.textContent = `${ageYear}`.padStart(2,'0');
		monthResult.textContent = `${ageMonth}`.padStart(2, '0');
		dayResult.textContent = `${ageDay}`.padStart(2, '0');
		}
	}
