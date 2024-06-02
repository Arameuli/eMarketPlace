document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    var formData = new FormData();
    formData.append('login-password', password);
    formData.append('login-email', email);

    try {
        const response = await fetch('/acc/login', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            localStorage.setItem('logInEmail', email);
            document.getElementById('loginForm').reset();
            window.location.href = 'index.html?login=true';
        } else {
            response.text().then(text => alert(text));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    var username = document.getElementById('register-username').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    console.log('Register Form:', { username, email, password });

    const newAccount = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch('/acc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAccount)
        });

        if (response.ok) {
            localStorage.setItem('registerUsername', username);
            document.getElementById('registerForm').reset();
            window.location.href = 'index.html?register=true';
        } else if (response.status === 409) {
            const conflictMessage = await response.text();
            if (conflictMessage.includes('Username and email')) {
                alert('Both username and email already exist. Please choose a different username and email.');
                document.getElementById('registerForm').reset();
            } else if (conflictMessage.includes('Username')) {
                alert('Username already exists. Please choose a different username.');
                document.getElementById('registerForm').reset();
            } else if (conflictMessage.includes('Email')) {
                alert('Email already exists. Please choose a different email.');
                document.getElementById('registerForm').reset();
            }
        } else {
            alert('An error occurred. Please try again.');
            document.getElementById('registerForm').reset();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function toggleForm(formType) {
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    var loginToggle = document.getElementById('login-toggle');
    var registerToggle = document.getElementById('register-toggle');

    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        loginToggle.classList.remove('active');
        registerToggle.classList.add('active');
    }
}

toggleForm('login');

function guestAccess() {
    console.log('Guest access granted');
    window.location.href = 'index.html?guest=true';
}
