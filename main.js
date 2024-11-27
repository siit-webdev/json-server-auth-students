const loginBtn = document.querySelector('#login-button');
const logoutBtn = document.querySelector('#logout-button');
const loginComponent = document.querySelector('#login-component');
const profileComponent = document.querySelector('#profile-component');

// 
loginBtn.addEventListener('click', () => {
    loginComponent.style.display = 'none';
    profileComponent.style.display = 'initial';
});

// 
logoutBtn.addEventListener('click', () => {
    profileComponent.style.display = 'none';
    loginComponent.style.display = 'initial';
});