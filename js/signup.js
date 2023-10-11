// SignUpVars
var signUpName = document.getElementById("signUpName")
var signUpMail = document.getElementById("signUpMail");
var signUpPass = document.getElementById("signUpPass");
// signUpResetFields
var signUpForm = document.querySelectorAll("#signUp-form input")

var signUpBtn = document.getElementById("signUpBtn");

var resetNameBtn = document.getElementById("resetNameBtn");
var resetMailBtn = document.getElementById("resetMailBtn");
var resetPassBtn = document.getElementById("resetPassBtn");
// warningFields
var nameWarning = document.getElementById("nameWarning")
var mailWarning = document.getElementById("mailWarning")
var passWarning = document.getElementById("passWarning")
var emptyWarning = document.getElementById("emptyWarning")
var signUpSuccess = document.getElementById("signUpSuccess")
var emailExist = document.getElementById("emailExist")
// passToggler
var toggle = document.getElementById("eyeSlash")
// Regex
var nameRegex = /^[A-Z][a-zA-Z]+$/;
var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

var userDB = [];

// Disable Sign Up Button
signUpBtn.classList.add('disabled')

// Enable Sign Up Btn
function handleValidity() {
    if(nameRegex.test(signUpName.value) == true && emailRegex.test(signUpMail.value) == true && passRegex.test(signUpPass.value) == true) {
        signUpBtn.classList.remove('disabled')
    }
}

// function isFormValid() {
//     return (
//         nameRegex.test(signUpName.value) && 
//         emailRegex.test(signUpMail.value) && 
//         passRegex.test(signUpPass.value)
//     )
// }

// Reset Input Value
resetNameBtn.addEventListener('click', () => signUpName.value = '')
resetMailBtn.addEventListener('click', () => signUpMail.value = '')
resetPassBtn.addEventListener('click', () => signUpPass.value = '')

// Display Data Process
function displayData() {
    var user = {
        name: signUpName.value,
        mail: signUpMail.value,
        pass: signUpPass.value,
    }
    userDB.push(user);
    localStorage.setItem("users", JSON.stringify(userDB));
    clrForm();
    // signUpSuccess.classList.replace('d-none', 'd-block')
}

// getUsersFromLocalStorage
if(JSON.parse(localStorage.getItem("users")) != null) {
    userDB = JSON.parse(localStorage.getItem("users"))
}

// Clear Form
function clrForm() {
    for(var i=0; i < signUpForm.length; i++) {
        signUpForm[i].value = ''
    }
}

// CheckForm
function checkForm() {
    let checkEmail = false
    for(let i=0; i < userDB.length; i++) {
        if(signUpMail.value.toLowerCase() == userDB[i].mail.toLowerCase()) {
            checkEmail = true
            break;
    } }
    if(checkEmail == true) {
        signUpSuccess.classList.add("d-none");
        emptyWarning.classList.add("d-none");
        emailExist.classList.remove("d-none");
        if(signUpMail.classList.contains("is-valid")) {
            signUpMail.classList.replace("is-valid", "is-invalid")
        }
    } else {
        displayData();
    }
}

// SignUp Process
function signUp() {
    if(signUpName.value == '' || signUpMail.value == '' || signUpPass.value == '') {
        emptyWarning.classList.replace('d-none', 'd-block')
    }
    else {
        signUpSuccess.classList.remove("d-none");
        emptyWarning.classList.add("d-none");
        emailExist.classList.add("d-none");
        checkForm();
    }
}
signUpBtn.addEventListener('click', signUp);

// Regex Validation
    // NameRegex
    signUpName.addEventListener('input', function() {
        handleValidity()
        var nameInput = signUpName.value;
        if(nameRegex.test(nameInput) == true) {
            signUpName.classList.add("is-valid")
            if(signUpName.classList.contains("is-invalid")) {
                signUpName.classList.replace("is-invalid", "is-valid")
            }
            nameWarning.classList.replace("d-block", "d-none")
            return true;
        }
        else {
            signUpName.classList.add("is-invalid")
            if(signUpName.classList.contains("is-valid")) {
                signUpName.classList.replace("is-valid", "is-invalid")
            }
            nameWarning.classList.replace("d-none", "d-block")
            return false;
        }
    });

    // MailRegex
    signUpMail.addEventListener('input', function() {
        handleValidity()
        var emailInput = signUpMail.value;
        if(emailRegex.test(emailInput) == true) {
            signUpMail.classList.add("is-valid");
            if(signUpMail.classList.contains("is-invalid")) {
                signUpMail.classList.replace("is-invalid", "is-valid")
            }
            mailWarning.classList.replace("d-block", "d-none")
            // return true;
        }
        else {
            signUpMail.classList.add("is-invalid");
            if(signUpMail.classList.contains("is-valid")) {
                signUpMail.classList.replace("is-valid", "is-invalid")
            }
            mailWarning.classList.replace("d-none", "d-block")
            // return false;
        }
    });

    // PassRegex
    signUpPass.addEventListener('input', function() {
        handleValidity()
        var passInput = signUpPass.value;
        if(passRegex.test(passInput) == true) {
            signUpPass.classList.add("is-valid")
            if(signUpPass.classList.contains("is-invalid")) {
                signUpPass.classList.replace("is-invalid", "is-valid")
            }
            passWarning.classList.replace('d-block', 'd-none')
            return true;
        }
        else {
            signUpPass.classList.add("is-invalid");
            if(signUpPass.classList.contains('is-valid')) {
                signUpPass.classList.replace('is-valid', 'is-invalid')
            }
            passWarning.classList.replace('d-none', 'd-block')
            return false;
        }
    })

    // passwordEyeToggler
    toggle.addEventListener('click', function() {
        if(signUpPass.type === 'password') {
            signUpPass.type = 'text'
            document.getElementById('eye').style.color = '#86b7fe';
        }
        else {
            signUpPass.type = 'password'
            document.getElementById('eye').style.color = '#3e4577';
        }
    })