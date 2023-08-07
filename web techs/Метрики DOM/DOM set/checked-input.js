
let checkedInputs = document.querySelectorAll(`.checkBoxClass:checked`);

let checkbox = document.querySelector('.checkBoxClass:checked');
console.log(checkbox.checked); // выдает true если input в состоянии checked


// Снимаем галочки с чекбокса
    checkedInputArray.forEach((element) => {
      element.checked = false;
    });
