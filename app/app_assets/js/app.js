let currentStep = 0;

// onload show first step
showStep(currentStep);

// on next button click
document.getElementById('next').addEventListener('click', function () {
    // Validating the form
    if (validateForm(currentStep)) {

        // incrementing the step
        currentStep += 1;

        // showing the incremented step;
        showStep(currentStep);
    }

});

// on prev button click
document.getElementById('previous').addEventListener('click', function () {

    // decrementing the step
    currentStep -= 1;

    // showing decremented step
    showStep(currentStep);
});

function showStep(step) {
    // display button
    // checking whether the current step is valid or not
    if (step === 0) {
        document.getElementById('previous').style.display = 'none'
        document.getElementById('next').style.display = 'inline';
        document.getElementById('submit').style.display = 'none';
    } else if (step === document.getElementsByClassName('step').length - 1) {
        document.getElementById('previous').style.display = 'inline'
        document.getElementById('next').style.display = 'none';
        document.getElementById('submit').style.display = 'inline';
    } else {
        document.getElementById('previous').style.display = 'inline'
        document.getElementById('next').style.display = 'inline';
        document.getElementById('submit').style.display = 'none';
    }

    // displaying question counter
    document.querySelector('#step-counter h1').textContent = step + 1;

    currentStep = step;

    document.querySelectorAll('.step').forEach((item, index) => {
        // display step
        if (index !== step) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    });

}

// for form validation 
function validateForm(step) {
    let subForm = document.querySelectorAll('.step')[step];
    let flag = true;

    // for radio button input (consent form)
    if (subForm.querySelector('input[type=radio]') != null) {
        if (subForm.querySelector("input[type=radio]").checked !== true) {
            alert("Please, agree with the terms.");
            flag = false;
        }
    }

    // for all input['number'] and select tags
    subForm.querySelectorAll("input[type=number], select").forEach((item) => {
        // console.log(item);
        if (item.value === '') {
            item.classList.add('is-invalid');
            flag = false;
        } else {
            item.classList.remove('is-invalid');
            item.classList.add('is-valid');
        }
    });

    // for all input['checkbox']
    if (subForm.querySelector('input[type=checkbox]') != null) {
        let check = false;
        subForm.querySelectorAll('input[type=checkbox]').forEach((item, index) => {
            // None can't be checked with others -> implementing other function for this
            // Can't skip the process -- show alert if user tries to do so
            if (item.checked === true)
                check = true;
        });

        if (!check) {
            alert("Please check atleast one value.")
            flag = false;
        }

    }

    return flag;
}

// form submission 
let form = document.querySelector('form');
let fd = new FormData(form);

// Adding event listener for fetching result
document.querySelector('#submit').addEventListener('click', fetchResult);

async function fetchResult(e) {
    e.preventDefault();

    if (currentStep === document.getElementsByClassName('step').length - 1 && validateForm(currentStep)) {
        console.log("Submitted");
        const URL = "https://reliefme.azurewebsites.net/api/predict";

        try {
            const res = await fetch(URL, {
                method: "POST",
                body: fd
            });
            const data = await res.json();
            console.log(data.data);
            swal({
                title: 'Result',
                text: 'Prediction is ' + data.data
            });
        } catch (err) {
            console.log(err.message);
        }
    }
}