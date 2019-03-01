

/* Floating Label Fix */
document.querySelector('#create .modal-content').addEventListener("click", event => {

    document.querySelectorAll('fieldset').forEach(element => {
        element.classList.remove("is-focused");
    });

    if (event.target.classList.contains("form-group")) {
        event.target.classList.add("is-focused");

    } else if (event.target.parentNode.classList.contains("form-group")) {
        event.target.parentNode.querySelector('label').classList.add("bmd-label-static");
        event.target.parentNode.classList.add("is-focused");

    }
});
document.querySelector('#edit .modal-content').addEventListener("click", event => {

    document.querySelectorAll('fieldset').forEach(element => {
        element.classList.remove("is-focused");
    });
    if (event.target.classList.contains("form-group")) {
        event.target.classList.add("is-focused");
    } else if (event.target.parentNode.classList.contains("form-group")) {
        event.target.parentNode.classList.add("is-focused");
    }
});


/* Edit Modal */
document.querySelectorAll('td').forEach(element => {

    element.addEventListener("click", event => {

        if (!event.target.classList.contains('oi')) {
            $('#edit').modal('show');
            let editID = event.target.parentNode.dataset.id;
            const editForm = document.querySelector('#editForm');
            let selected = fromDBArray.filter(element => element._id == editID);
            editForm.querySelector('.form-control[name="_id"]').value = selected[0]._id;
            editForm.querySelector('.form-control[name="name"]').value = selected[0].name;
        }
    });
});





function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) {
            success(xhr.responseText);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

