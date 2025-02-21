const API_URL = 'http://localhost:8080/auth';
//inicio de sesión
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const token = await response.text(); 
                // Obtener el token como texto plano
                localStorage.setItem('jwt', token); 
                // Guardar el token en localStorage
                window.location.href = 'protected.html'; 
                // Redirigir a la página protegida
            } else {
                const errorMessage = await response.text();
                document.getElementById('error-message').textContent = `Error en el login ${errorMessage}`;
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
}
// Función de logout
function logout() {
    // Eliminar el token JWT del localStorage
    localStorage.removeItem('jwt');

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
}
