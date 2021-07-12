document.addEventListener('DOMContentLoaded', () => {

function onClick(event) {
  const category = event.currentTarget;
  const input = category.previousElementSibling;
  if (!input.checked) {
    category.classList.add("category-selected");
    input.checked = true;
  } else {
    category.classList.remove("category-selected");
    input.checked = false;
  };
};

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", onClick);
})

document.querySelectorAll('.password-toggle')
  .forEach(button => button.addEventListener('click', onClickPasswordToggle))
})
  
function onClickPasswordToggle(event) {
  const button = event.currentTarget;
  const input = button.previousElementSibling;
  const icon = button.querySelector('i');
  if (input.type === 'text') {
    input.type = 'password';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'text';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}


