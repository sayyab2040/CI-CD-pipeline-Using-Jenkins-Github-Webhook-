// Dynamic backend API URL
// Backend container listens on port 3000 internally,
// but EC2 host exposes backend on port 5000.
const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:5000`;

// Tab Switching Logic
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTabBtn = document.getElementById('loginTab');
    const registerTabBtn = document.getElementById('registerTab');
    const indicator = document.getElementById('tabIndicator');
    const responseMsg = document.getElementById('responseMessage');

    responseMsg.style.display = 'none';
    responseMsg.textContent = '';
    responseMsg.className = 'response-message';

    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');

        loginTabBtn.classList.add('active');
        registerTabBtn.classList.remove('active');

        indicator.style.transform = 'translateX(0)';
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');

        registerTabBtn.classList.add('active');
        loginTabBtn.classList.remove('active');

        indicator.style.transform = 'translateX(100%)';
    }
}

// Show response message
function showMessage(type, text) {
    const msgDiv = document.getElementById('responseMessage');
    msgDiv.className = `response-message ${type}`;
    msgDiv.textContent = text;
    msgDiv.style.display = 'block';
}

// Button loading state
function setLoading(btnId, isLoading) {
    const btn = document.getElementById(btnId);
    const text = btn.querySelector('.btn-text');
    const loader = btn.querySelector('.btn-loader');

    if (isLoading) {
        text.style.display = 'none';
        loader.style.display = 'block';
        btn.disabled = true;
    } else {
        text.style.display = 'block';
        loader.style.display = 'none';
        btn.disabled = false;
    }
}

// Safe JSON response handler
async function parseResponse(response) {
    try {
        return await response.json();
    } catch (error) {
        return {
            message: 'Invalid server response.'
        };
    }
}

// Handle Register
async function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;

    if (!name || !email || !password) {
        showMessage('error', 'Please fill all registration fields.');
        return;
    }

    if (password.length < 6) {
        showMessage('error', 'Password must be at least 6 characters long.');
        return;
    }

    setLoading('registerBtn', true);
    document.getElementById('responseMessage').style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await parseResponse(response);

        if (response.ok) {
            showMessage('success', data.message || 'Registration successful! Please sign in.');
            document.getElementById('registerForm').reset();

            setTimeout(() => {
                switchTab('login');
            }, 1500);
        } else {
            showMessage('error', data.message || 'Registration failed.');
        }
    } catch (error) {
        showMessage('error', 'Network error. Cannot connect to backend API.');
        console.error('Register error:', error);
    } finally {
        setLoading('registerBtn', false);
    }
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showMessage('error', 'Please enter email and password.');
        return;
    }

    setLoading('loginBtn', true);
    document.getElementById('responseMessage').style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await parseResponse(response);

        if (response.ok) {
            const userName = data.user && data.user.name ? data.user.name : 'User';
            showMessage('success', `Welcome back, ${userName}! Login successful.`);
            document.getElementById('loginForm').reset();
        } else {
            showMessage('error', data.message || 'Invalid email or password.');
        }
    } catch (error) {
        showMessage('error', 'Network error. Cannot connect to backend API.');
        console.error('Login error:', error);
    } finally {
        setLoading('loginBtn', false);
    }
}

// Backend Health Check
async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);

        if (response.ok) {
            console.log('Backend health check passed.');
        } else {
            console.warn('Backend responded, but health check failed.');
        }
    } catch (error) {
        console.warn('Backend not reachable. Make sure Docker Compose is running.', error);
    }
}

// Run health check when page loads
window.onload = () => {
    checkBackendHealth();
};