//Result tracker form inputs
let bodyWeightForm = document.querySelector('.bodyWeightForm');
let measurmentsForm = document.querySelector('.measurmentsForm')

let openWeightForm = () => {
    bodyWeightForm.classList.toggle('hiddenForm');
}

let openMeasForm = () => {
    measurmentsForm.classList.toggle('hiddenForm');
}


function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

//Bodyweight form
document.querySelector('.addWeight').addEventListener("click", () =>{
    
    let formDay = document.querySelector('#weightDayInput').value;
    let formWeight = document.querySelector('#bodyWeighInput').value;

    let table = document.querySelector('#weightTable tbody');
    table.innerHTML += `<tr>
                             <td> ${formDay} </td>
                             <td> ${formWeight}kg</td> 
                         </tr>`


    postAjax('/addWeight', {weightDay: formDay, bodyWeight: formWeight })
})

// Measurments form
document.querySelector('.addMeasurments').addEventListener("click", () =>{
    
    let bodyPlace = document.querySelector('#bodyPlace').value;
    let measurmentsDay = document.querySelector('#measurmentsDay').value;
    let centimetrs = document.querySelector('#centimetrs').value;

    let table = document.querySelector('.measurmentsTable tbody');
    table.innerHTML += `<tr>
                            <td> ${bodyPlace} </td>
                             <td> ${measurmentsDay} </td>
                             <td> ${centimetrs}cm</td> 
                         </tr>`

                                //inputName: inputo value-kintamaja
    postAjax('/centimetrsResult', {bodyPlace: bodyPlace,
                                    measurmentsDay: measurmentsDay,
                                     centimetrs: centimetrs })
})