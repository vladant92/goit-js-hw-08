import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[type="email"]');
const messageInput = feedbackForm.querySelector('textarea');

function saveFormDataToLocalStorage() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function fillFormFieldsFromLocalStorage() {
  const formDataString = localStorage.getItem('feedback-form-state');
  if (formDataString) {
    const formData = JSON.parse(formDataString);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}

function clearLocalStorage() {
  localStorage.removeItem('feedback-form-state');
}

const saveFormDataThrottled = throttle(saveFormDataToLocalStorage, 500);

feedbackForm.addEventListener('input', saveFormDataThrottled);

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const messageValue = messageInput.value;
  
    clearLocalStorage();
    emailInput.value = '';
    messageInput.value = '';
  
    console.log('Email:', emailValue);
    console.log('Message:', messageValue);
  });

fillFormFieldsFromLocalStorage();