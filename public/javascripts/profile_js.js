
let validateForm = () => {

    let inputs = document.querySelectorAll('.profile-form input');
    let date = true;

    for(let i = 0; i < 11; i++){

        let newInput = inputs[i];
       
       if(newInput.value == ''){
  
            newInput.style.border = '1px solid red';
            document.querySelector('.alert').style.display = 'block';
       
            if(date == true){
                date = false;
            }
        }
       }
       return date;
}

 let inputFocus = (element) => {
    element.style.border = '1px solid white';
    element.style.borderBottom = '1px solid rgba(46, 188, 254, 0.9)';
 }

let inputFocusOut = (element) => {
    element.style.border = '1px solid black';
    if(element.value == ''){
        element.style.border = '1px solid red';
    }else{
        element.style.border = '1px solid black';
    }
}






