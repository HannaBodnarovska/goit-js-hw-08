import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const formDataKey = 'feedback-form-state';
const handleInput = throttle(function() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(formDataKey, JSON.stringify(formData));
}, 500);

emailInput.addEventListener('input', handleInput);
messageInput.addEventListener('input', handleInput);

document.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem(formDataKey);
  if (storedData) {
    const formData = JSON.parse(storedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log('Form data submitted:', formData);

  localStorage.removeItem(formDataKey);
  emailInput.value = '';
  messageInput.value = '';
});

