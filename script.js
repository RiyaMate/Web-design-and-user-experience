
    // Accessing form item by id
    // const name = document.getElementById('name');

    // Accessing form and its element by name
    // const name = document.myForm.name;
    // const email = document.myForm.email;
    // const phoneNumber = document.myForm.phoneNumber;
    // const comment = document.myForm.comment;

    // Event Listener
    // const printValue = event => {
    //     alert(event.target.value);
    // };

    // Need to add event listener in every input item - too much code
    // name.addEventListener('input', printValue);
    // email.addEventListener('input', printValue);
    // phoneNumber.addEventListener('input', printValue);
    // comment.addEventListener('input', printValue);

    // Event Delegation - One handler for all form input
    // const myForm = document.myForm;
    // myForm.addEventListener('input', printValue);

    // regular expressions for name, email and phone
   
    var valid = false;
	document.getElementById("firstName").addEventListener("keyup", function() {
    var firstName = this.value;
    var specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
    
    if (firstName.length < 4 || specialCharacters.test(firstName) || firstName.length>10) {
		this.style.color = "red";
		valid = false;
    } else {
       
		this.style.color = "black";
		valid = true;
    }
});


document.getElementById("lastName").addEventListener("keyup", function() {
    var lastName = this.value;
    var specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
    if (lastName.length < 3 || specialCharacters.test(lastName) || lastName.length>10) {
		this.style.color = "red";
		valid = false;
    } else {
       
		this.style.color = "black";
		valid = true;
    }
});



document.getElementById("emailId").addEventListener("keyup", function() {
    var email = this.value;
	var emailregex = /[A-Za-z0-9._%+-]+@northeastern\.edu$/;
    if (!emailregex.test(email)) {
		this.style.color = "red";
		valid = false;
    } else {
       
		this.style.color = "black";
		valid = true;
    }
});



document.getElementById("phoneNumber").addEventListener("keyup", function() {
    var number = this.value;
	var numberregex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!numberregex.test(number)) {
		this.style.color = "red";
		valid = false;
    } else {
       
		this.style.color = "black";
		valid = true;
    }
});



document.getElementById("streetAddress-1").addEventListener("keyup", function() {
    var address = this.value;
	
    if (address.length > 30 || address.length < 10) {
		this.style.color = "red";
		valid = false;
    } else {
       
		this.style.color = "black";
		valid = true;
    }
});

document.getElementById("city").addEventListener("keyup", function() {
    var city = this.value;
	
    if (city.length > 15 || city.length < 4) {
		this.style.color = "red";
		valid = false;
    } else {
       
		this.style.color = "black";
		valid = true;
    }
});



document.getElementById("zipcode").addEventListener("keyup", function() {
    var zip = this.value;
	var zipregex=/^\d{5}(?:[-\s]\d{4})?$/;
    if (!zipregex.test(zip)) {
		this.style.color = "red";
		valid = false;
    } else {
       
		this.style.color = "black";
		valid = true;
    }
});
document.getElementById("state").addEventListener("change", function () {

    document.getElementById("statemsg").style.display = "none";
});
document.getElementById("rating").addEventListener("change", function () {

    document.getElementById("ratingmsg").style.display = "none";
});
var source = document.querySelectorAll('input[name="source"]');
source.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        
        document.getElementById("sourcemsg").style.display = "none";
    });
});

function createCheckboxes() {
            var rating = document.getElementById("rating");
            var checkboxesContainer = document.getElementById("checkboxesContainer");
            checkboxesContainer.innerHTML = "";

            var ratingvalue = rating.value;

            if (ratingvalue === "1 star") {
                
                createCheckbox("foodisbad", "Quality suggestions");
                createCheckbox("serviceisbad", "Service feedback");
				

            }
			else if(ratingvalue === "2 stars") {
				createCheckbox("noambience", "Ambiance ");
				createCheckbox("foodisnotgood", "Food is ok");


			}
			else if(ratingvalue ==="3 stars"){
				createCheckbox("Canimprove", "Any Improvements?");
				createCheckbox("improveservice", "Staff Suggestions");
			}
			else if(ratingvalue ==="4 stars"){
				createCheckbox("good", "Good food");
				createCheckbox("peacefull", "Best Ambience");
			}


			else if(ratingvalue ==="5 stars"){
				createCheckbox("excellent", "Food is Excellent");
				createCheckbox("great", "Great Hospitality");
			}
        }

        function createCheckbox(id, labelContent) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "comments";
    checkbox.id = id;

    var label = document.createElement("label");
    label.htmlFor = id;
    label.appendChild(document.createTextNode(labelContent));

    var textBox = document.createElement("input");
    textBox.type = "text";
    textBox.name = "commentText";
    textBox.id = id + "-text"; 
    textBox.placeholder = "Add your comment here";
    textBox.style.display = "none"; 

    checkboxesContainer.appendChild(checkbox);
    checkboxesContainer.appendChild(label);
    checkboxesContainer.appendChild(textBox); 

    checkboxesContainer.appendChild(document.createElement("br"));

    
    checkbox.addEventListener("change", function () {
        var textId = this.id + "-text";
        var textBox = document.getElementById(textId);
        textBox.style.display = this.checked ? "inline-block" : "none";
    });
}
	
function displayFormData() {
    var tableContainer = document.getElementById("tableContainer");
    var formDataTable = document.getElementById("formData").getElementsByTagName('tbody')[0];

    var newRow = formDataTable.insertRow();

    var name = document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
    var email = document.getElementById("emailId").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var address1 = document.getElementById("streetAddress-1").value;
    var address2 = document.getElementById("streetAddress-2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zipcode = document.getElementById("zipcode").value;
    var howYouHear = Array.from(document.querySelectorAll('input[name="source"]:checked')).map(checkbox => checkbox.value).join(', ');
    var rating = document.getElementById("rating").value;
    var comments = document.getElementById("comments").value;

    
    var selectedCheckboxes = Array.from(document.querySelectorAll('#checkboxesContainer input[type="checkbox"]:checked'));
    var selectedComments = selectedCheckboxes.map(checkbox => {
        var textInputId = checkbox.id + "-text";
        return document.getElementById(textInputId).value;
    });

  
    var selectedOptionsString = selectedCheckboxes.map((checkbox, index) => {
        return checkbox.nextElementSibling.textContent + ": " + selectedComments[index];
    }).join(', ');

    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = email;
    newRow.insertCell(2).innerHTML = phoneNumber;
    newRow.insertCell(3).innerHTML = address1;
    newRow.insertCell(4).innerHTML = address2;
    newRow.insertCell(5).innerHTML = city;
    newRow.insertCell(6).innerHTML = state;
    newRow.insertCell(7).innerHTML = zipcode;
    newRow.insertCell(8).innerHTML = howYouHear;
    newRow.insertCell(9).innerHTML = rating;
    newRow.insertCell(10).innerHTML = comments + '<br>' + selectedOptionsString;

    tableContainer.style.display = "block";
}



document.getElementById("submitButton").addEventListener("click", function (event) {
    event.preventDefault();
    displayFormData();
	document.getElementById("form").reset();
    document.getElementById("submitButton").disabled=true;

});
function updateSubmitButton() {
        var submitButton = document.getElementById("submitButton");
        var form = document.getElementById("form");

        if (form.checkValidity() && valid) { 
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
	function checkInputValidity(input) {
    if (input.style.color === "red") {
        return false;
    }
    return true;
}



    
    var formElements = document.querySelectorAll("input, select, textarea");
    formElements.forEach(function (element) {
        element.addEventListener("input", updateSubmitButton);
    });


		
	

