function validateForm(form) {
    let inputs = form.elements;

    for (let index = 0; index < inputs.length; index++) {
        if(inputs[index].value === '' && inputs[index].type !== 'submit') {
            alert('debe completar el formulario')
        }
        
    }
}

// let formulario = document.querySelector('form')