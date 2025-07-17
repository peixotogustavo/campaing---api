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
            localStorage.setItem('role', res.data.role);

            window.location.href = '/campaigns';
        } catch (err) {
            setError('Login inválido');
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f3f4f6',
                fontFamily: 'Arial, sans-serif',
                boxSizing: 'border-box',
                padding: '1rem',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '350px',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
                {error && (
                    <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
                        {error}
                    </p>
                )}
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '0.6rem',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#b30000')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'red')}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
