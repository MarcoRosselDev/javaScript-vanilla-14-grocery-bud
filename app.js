// ****** SELECT ITEMS **********
//grocery-container  class-que-de-debe-agregar
// edit option

const form = document.querySelector('.grocery-form');
const alert = document.querySelector('.alert');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

//edit option

let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);

// clear items
clearBtn.addEventListener('click', clearItems);




// ****** FUNCTIONS **********
function addItem(e) {

  e.preventDefault();/* se que era importante pero no se por que
  
  era para que no se autorecetee por que asi viene por defecto*/
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {

    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container"> 
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>

          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');

    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
        // append child
        list.appendChild(element);
        
        // display alert
        displayAlert('item added to the list', 'success');

        // show container
        container.classList.add('show-container');

        // add to local storage
        addToLocalStorage(id, value);

        // set back to default
        setBackToDefault();
  } else if(value && editFlag) {

    editElement.innerHTML = value;
    displayAlert('value changed', 'success');
    //edit local storage
    editLocalStorage(editID);
    setBackToDefault();

  } else {

    displayAlert('pleace enter value', 'danger')
  }
}
//display alert
function displayAlert(text, action){

  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //remove alert
  setTimeout(function(){

    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);

  },1000);
}
//clear items
function clearItems(){

  const items = document.querySelectorAll('.grocery-item');

  if(items.length > 0){

    items.forEach(function(item){

      list.removeChild(item);

    });

  }
  container.classList.remove('show-container');
  displayAlert('empty list', 'danger');
  setBackToDefault();
  /* localStorage.removeItem('list'); */
};
//delete function
function deleteItem(e){

  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove('show-container');
  }
  displayAlert('item removed', 'danger');
  setBackToDefault();
  //remove from local storage
  removeFromLocalStorage(id);
}
//edit function
function editItem(e){
  const element = e.currentTarget.parentElement.parentElement;
// set edit item
editElement = e.currentTarget.parentElement.previousElementSibling;

// set form value
grocery.value = editElement.innerHTML;
editFlag = true;
editID = element.dataset.id;
submitBtn.textContent = 'edit';

/* 
let editElement;
let editFlag = false;
let editID = "";
 */
}

// set back to default
function setBackToDefault(){
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
};

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
  const grocery = {id,value};
  let items = localStorage.getItem('list')
  ? JSON.parse(localStorage.getItem('list'))
  : [];
  console.log(items);

  items.push(grocery);
  localStorage.setItem('list', JSON.stringify(items));
};

function removeFromLocalStorage(id){};
function editLocalStorage(id, value){};
// localStorage API
// setItem
// getItem
// removeItem
// save as strings

/* localStorage.setItem('orange', JSON.stringify(['item', 'item2']));
const oranges = JSON.parse(localStorage.getItem('orange'));
console.log(oranges);
localStorage.removeItem('orange'); */

// ****** SETUP ITEMS ********** 