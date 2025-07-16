import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
                username,
                password,
            });

            const token = res.data.access_token;
            localStorage.setItem('token', token);
            localStorage.setItem('role', res.data.role); // salva a role também

            window.location.href = '/campaigns'; // redireciona
        } catch (err) {
            setError('Login inválido');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
