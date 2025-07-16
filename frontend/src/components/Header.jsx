import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    let username = '';
    let role = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            username = decoded.username;
            role = decoded.role;
        } catch (err) {
            console.error('Token inválido:', err);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <header style={{
            backgroundColor: '#f0f0f0',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <h2>Campanhas</h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
                    Usuário: {username} | Role: {role}
                </p>
            </div>
            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: '#d9534f',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Sair
            </button>
        </header>
    );
}

export default Header;
