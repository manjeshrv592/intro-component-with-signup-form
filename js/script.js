const inputs = document.querySelectorAll('.input');
const form = document.querySelector('form');
const successMsg = document.querySelector('.form-success-msg');

// Regex pattern to test email
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,5}$/;

const hideSuccessMsg = () => successMsg.classList.add('d-none');
const showSuccessMsg = () => successMsg.classList.remove('d-none');

const validate = el => {
  hideSuccessMsg();
  const value = el.value;
  const formGroup = el.closest('.form-group');
  const type = el.getAttribute('type');
  const placeholder = el.getAttribute('placeholder');

  if (value.length === 0) {
    formGroup.setAttribute('data-error', `${placeholder} cannot be empty`);
  } else {
    formGroup.removeAttribute('data-error');
  }

  if (type === 'text') return;

  if (type === 'email' && value.length !== 0) {
    if (!value.match(emailPattern)) {
      formGroup.setAttribute('data-error', 'Email is not valid');
    } else {
      formGroup.removeAttribute('data-error');
    }
  }

  if (type === 'email') return;

  if (type === 'password' && value.length !== 0) {
    if (value.length < 6) {
      formGroup.setAttribute(
        'data-error',
        'Password should be atleast six characters long'
      );
    } else {
      formGroup.removeAttribute('data-error');
    }
  }

  return;
};

inputs.forEach(input => {
  input.addEventListener('input', function (e) {
    validate(e.target);
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputs.forEach(input => validate(input));

  const numError = document.querySelectorAll('.form-group[data-error]');

  if (numError.length !== 0) return;
  form.reset();
  showSuccessMsg();
});
