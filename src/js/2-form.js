let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  formData.email = email;
  formData.message = message;
  saveToLS('feedback-form-state', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback-form-state');
  try {
    formData = lsData;
    form.elements.email.value = lsData.email;
    form.elements.message.value = lsData.message;
  } catch {}
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    form.reset();
    localStorage.removeItem('feedback-form-state');
    formData = { email: '', message: '' };
  }
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}

/////////////////////////////////////////////////////////////////
const messageInput = document.querySelector('textarea');

messageInput.addEventListener('focus', () => {
  messageInput.placeholder = 'Type area';
});

messageInput.addEventListener('blur', () => {
  messageInput.placeholder = '';
});
