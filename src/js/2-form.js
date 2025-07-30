let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  formData.email = email.trim();
  formData.message = message.trim();
  saveToLS('feedback-form-state', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback-form-state');

  if (lsData && typeof lsData === 'object') {
    formData = {
      email: lsData.email || '',
      message: lsData.message || '',
    };
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
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

function getFromLS(key, defaultValue = {}) {
  try {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : defaultValue;
  } catch {
    return defaultValue;
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
