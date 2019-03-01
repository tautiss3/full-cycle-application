$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

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

let selectOptions = "";
let exerciseData;

const fetchAsync = async url => await (await fetch(url)).json();

fetchAsync("/exercises/findAll")
  .then(data => {
    let selectElements = document.querySelectorAll('select[name="exercise"]');
    let tempOptions = '<option value="" selected disabled hidden></option>';

    if (Object.keys(data).length) {
      for (let i = 0; i < data.length; ++i) {
        tempOptions += `<option value="${data[i]._id}">${
          data[i].name
        }</option>`;
      }

      // selectElements.forEach(element => {
      //     element.innerHTML = tempOptions;
      // });

      // selectElements.innerHTML = tempOptions;
      exerciseData = data;

      selectOptions = tempOptions;
    }
  })
  .catch(reason => console.log(reason.message));



document.querySelectorAll("button.add").forEach(element => {
  element.addEventListener("click", (event) => {
    let forma = event.target.parentNode.parentNode.querySelector("form");
    let node = document.createElement("div");
    node.classList.add("row");
    node.innerHTML = `
      <fieldset class="form-group bmd-form-group col">
        <label for="exercise" class="bmd-label-floating">Exercise</label>
        <select name="exercise" class="form-control" onchange="genExerciseBlock(this)">
          ${selectOptions}
        </select>
      </fieldset>`;
    forma.appendChild(node);
  })
});

let genExerciseBlock = element => {

  let exerciseTitle = element.options[element.selectedIndex].text;
  let exerciseValue = element.value;
  let fragment = document.createDocumentFragment();
  let node = document.createElement("div");
  node.classList.add("exerciseContainer", "bg-secondary", "text-white", "row");

  node.innerHTML = `
   
        <div class="exerciseHeader pl-3 pt-2 pr-2 container" data-id="${exerciseValue}"><h6 class="float-left">${exerciseTitle}</h6><span class="trash oi oi-trash float-right" style="font-size: 1rem;" onclick="deleteExercise(this)"></span></div>
        <table class="table table-sm table-hover table-light">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Sets</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Weight</th>
                        
                    </tr>
                </thead>
                <tbody>
                   <tr>
                       <td scope="row">
                       <select name="sets" onchange="genExerciseSet(this)">
                       <option value="1" selected>1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                       <option value="6">6</option>
                       
                       </select>
                       </td>
                       <td><input type="number" name="reps" min="1" max="1000" value="8"></td>
                       <td><input type="number" name="weight" min="0" max="999" value="50"></td>
                   </tr>
                   <tfoot>
                   <tr>
                    <td colspan="3" class="text-secondary text-right">Total: <span class="total">50</span></td>
                   </tr>
                   </tfoot>
                   


                </tbody>
            </table>
 
    `;

  fragment.appendChild(node);
  element.parentNode.parentNode.parentNode.appendChild(fragment);
  element.parentNode.parentNode.remove();
};

let genExerciseSet = element => {
  console.log(element.value);
  let tbody = element.parentNode.parentNode.parentNode;
  console.log(tbody);
  let total = 0;
   
  let fragment = document.createDocumentFragment();

  if (element.value > tbody.querySelectorAll("tr").length) {
    console.log("tr length" + tbody.querySelectorAll("tr").length);
    for (let i = 0; i < element.value - tbody.querySelectorAll("tr").length; i++) {
      let node = document.createElement("tr");
      node.innerHTML += `
                       <td scope="row"></td>
                       <td><input type="number" name="reps" min="1" max="1000" value="${
                         tbody.querySelector('input[name="reps"]').value
                       }"></td>
                       <td><input type="number" name="weight" min="0" max="999" value="${
                         tbody.querySelector('input[name="weight"]').value
                       }"></td>
                   `;
      fragment.appendChild(node);
      
    }

    // tbody.innerHTML += tempSets;
    tbody.appendChild(fragment);
  } else if (element.value < tbody.querySelectorAll("tr").length) {
    for (let i = tbody.querySelectorAll("tr").length; i > element.value; i--) {
      tbody.querySelectorAll("tr")[i - 1].remove();
    }
  }

  tbody.parentNode.querySelector('span.total').innerText = calculateTotal(tbody);
};

let deleteExercise = element => {
  element.parentNode.parentNode.remove();
};

let calculateTotal = (element) => {
  console.log("calculate total");
  console.log(element);
 
    
  let total = 0;
  
    for (let i = 0; i < element.querySelectorAll('tr').length; i++){
      total += Number(element.querySelectorAll('tr')[i].querySelector('input[name="reps"]').value)*Number(element.querySelectorAll('tr')[i].querySelector('input[name="weight"]').value);
    }
    
    console.log(total);
    
    return total;
  
  
}

/* Add new Ajax Post requestas */
function postAjax(url, data, success) {
  var params =
    typeof data == "string" ?
    data :
    Object.keys(data)
    .map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    })
    .join("&");

  var xhr = window.XMLHttpRequest ?
    new XMLHttpRequest() :
    new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("POST", url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState > 3 && xhr.status == 200) {
      success(xhr.responseText);
    }
  };
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(params);
  return xhr;
}


/* Saving new */
document.querySelector("button.addNew").addEventListener("click", () => {

  let dataForDb = {};

  console.log(
    document.querySelector('form#createForm input[name="name"]').value
  );

  dataForDb.name = document.querySelector(
    'form#createForm input[name="name"]'
  ).value;
  dataForDb.status = true;
  dataForDb.exercises = [];


  document
    .querySelectorAll(".exerciseContainer")
    .forEach((container, index) => {
      dataForDb.exercises.push({});
      console.log(container.querySelector(".exerciseHeader").dataset.id);

      dataForDb.exercises[index]._id = container.querySelector(
        ".exerciseHeader"
      ).dataset.id;
      dataForDb.exercises[index].sets = [];

      for (let i = 0; i < container.querySelectorAll("tbody>tr").length; i++) {

        dataForDb.exercises[index].sets.push({
          reps: container
            .querySelectorAll("tbody>tr")[i].querySelector('input[name="reps"]').value,
          weight: container
            .querySelectorAll("tbody>tr")[i].querySelector('input[name="weight"]').value
        });
      }
    });

  console.log("datafordb:");

  console.log(dataForDb);

  postAjax("workouts", {
    data: JSON.stringify(dataForDb)
  }, function (data) {
    location.reload(true);
    console.log("callback");

  });
});

document.querySelector("button.edit").addEventListener("click", () => {

  let dataForDb = {};
  const editForm = document.querySelector('form#editForm');
  dataForDb._id = editForm.querySelector('input[name="_id"]').value;
  dataForDb.name = editForm.querySelector('input[name="name"]').value;
  dataForDb.status = true;
  dataForDb.exercises = [];
  


  editForm
    .querySelectorAll(".exerciseContainer")
    .forEach((container, index) => {
      dataForDb.exercises.push({});
      console.log(container.querySelector(".exerciseHeader").dataset.id);

      dataForDb.exercises[index]._id = container.querySelector(
        ".exerciseHeader"
      ).dataset.id;
      dataForDb.exercises[index].sets = [];

      for (let i = 0; i < container.querySelectorAll("tbody>tr").length; i++) {

        dataForDb.exercises[index].sets.push({
          reps: container
            .querySelectorAll("tbody>tr")[i].querySelector('input[name="reps"]').value,
          weight: container
            .querySelectorAll("tbody>tr")[i].querySelector('input[name="weight"]').value
        });
      }
    });

  console.log("datafordb:");

  console.log(dataForDb);

  postAjax("workouts/edit", {
    data: JSON.stringify(dataForDb)
  }, function (data) {
    location.reload(true);
    console.log("callback");

  });
});




/* Edit Modal */
document.querySelectorAll('td').forEach(element => {
  element.addEventListener("click", event => {
    if (!event.target.classList.contains('oi')) {
      $('#edit').modal('show');
      let editID = event.target.parentNode.dataset.id;


      let selected = workoutArray.filter(workout => workout._id == editID);
      document.querySelector('#editForm').innerHTML = "";
      console.log("selected");


      let tempExercises = `
      <div class="row">
              <input type="text" class="form-control" name="_id" value="${selected[0]._id}" hidden>
              <fieldset class="form-group bmd-form-group input-group-lg col">
                <label for="name" class="bmd-label-static">Workout Name</label>
                <input type="text" class="form-control" name="name" value="${selected[0].name}" />
                <span class="bmd-help">example: Chest Day I</span>
              </fieldset>
            </div>
      `;

      for (let i = 0; i < selected[0].exercises.length; i++) {
        let total = 0;
        tempExercises += `
        <div class="exerciseContainer bg-secondary text-white row">
        <div class="exerciseHeader pl-3 pt-2 pr-2 container" data-id="${selected[0].exercises[i]._id}"><h6 class="float-left">${exerciseData.filter(exercise => exercise._id == selected[0].exercises[i]._id)[0].name}</h6><span class="trash oi oi-trash float-right" style="font-size: 1rem;" onclick="deleteExercise(this)"></span></div>
        <table class="table table-sm table-hover table-light">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Sets</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Weight</th>
                        
                    </tr>
                </thead>
                <tbody>
        
        
        `;

        for (let ii = 0; ii < selected[0].exercises[i].sets.length; ii++) {
          if (ii == 0) {
            tempExercises += `<tr>
            <td scope="row">
            <select name="sets" onchange="genExerciseSet(this)">`;
            for (let iii = 1; iii <= 6; iii++) {
              if (selected[0].exercises[i].sets.length == iii) {
                tempExercises += `<option value="${iii}" selected>${iii}</option>`;
              } else {
                tempExercises += `<option value="${iii}">${iii}</option>`;
              }
            }



            tempExercises += `
              </select>
              </td>
              <td><input type="number" name="reps" min="1" max="1000" value="${
             selected[0].exercises[i].sets[ii].reps
            }"></td>
            <td><input type="number" name="weight" min="0" max="999" value="${
             selected[0].exercises[i].sets[ii].weight
            }"></td>
        </tr>`;
        total +=  (selected[0].exercises[i].sets[ii].reps * selected[0].exercises[i].sets[ii].weight);
          } else {
            tempExercises += `<tr>
            <td scope="row"></td>
            <td><input type="number" name="reps" min="1" max="1000" value="${
             selected[0].exercises[i].sets[ii].reps
            }"></td>
            <td><input type="number" name="weight" min="0" max="999" value="${
             selected[0].exercises[i].sets[ii].weight
            }"></td>
        </tr>`;
        total +=  (selected[0].exercises[i].sets[ii].reps * selected[0].exercises[i].sets[ii].weight);

          }
        }
        tempExercises += `
        </tbody>
        <tfoot>
                   <tr>
                    <td colspan="3" class="text-secondary text-right">Total Weight: <span class="total">${total}</span></td>
                   </tr>
                   </tfoot>
        </table>
        </div>
        `;

      }
      document.querySelector('#editForm').innerHTML += tempExercises;
    }
    document.querySelectorAll('input[name="reps"]').forEach(reps => {
      
      reps.addEventListener("change", event => {
        let tbody = event.target.parentNode.parentNode.parentNode;
        tbody.parentNode.querySelector('span.total').innerText = calculateTotal(tbody);
        
      });
    })
    document.querySelectorAll('input[name="weight"]').forEach(reps => {
      
      reps.addEventListener("change", event => {
        let tbody = event.target.parentNode.parentNode.parentNode;
        tbody.parentNode.querySelector('span.total').innerText = calculateTotal(tbody);
        
      });
    })
  });
});


let deleteRow = (element) => {
  $('#edit').modal('hide');
  console.log(element.parentNode.parentNode.dataset.id);
  
  postAjax('/workouts/delete', {
      _id: element.parentNode.parentNode.dataset.id
  }, function (data) {});
  element.parentNode.parentNode.remove();
  location.reload(true);
}