import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';
const formFeedback = document.querySelector('.feedback-form');
const formData = {};

formFeedback.addEventListener('submit', onFormSubmit);
formFeedback.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  formData.email = formFeedback.elements.email.value;
  formData.message = formFeedback.elements.message.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
}

updateForm();

function updateForm() {
  const savedData = localStorage.getItem(KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    formFeedback.email.value = email;
    formFeedback.message.value = message;
    formData.email = email;
    formData.message = message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const formDataToSend = new FormData(event.currentTarget);
  formDataToSend.forEach((value, name) => {
    formData[name] = value;
  });

  event.currentTarget.reset();
  localStorage.removeItem(KEY);

  console.log(formData);
}
