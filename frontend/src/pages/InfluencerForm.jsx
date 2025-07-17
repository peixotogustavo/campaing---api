import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function InfluencerForm() {
    const [name, setName] = useState('');
    const [socialnetwork, setSocialnetwork] = useState('');
    const [followers, setFollowers] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/influencers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                setName(res.data.name || '');
                setSocialnetwork(res.data.socialnetwork || '');
                setFollowers(res.data.followers || '');
            }).catch((err) => {
                if (err.response?.status === 404) {
                    console.warn('Influencer não encontrado (404). Verifique o ID na URL.');
                } else {
                    console.error('Erro ao carregar influencer:', err);
                }
            });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const influencerData = { name, socialnetwork, followers };

        try {
            if (id) {
                await axios.put(`http://localhost:3000/influencers/${id}`, influencerData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`http://localhost:3000/influencers`, influencerData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/influencers');
        } catch (err) {
            console.error('Erro ao salvar influencer:', err);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>{id ? 'Editar' : 'Novo'} Influencer</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Redes Sociais:</label>
                    <input
                        type="text"
                        value={socialnetwork}
                        onChange={(e) => setSocialnetwork(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Total de Seguidores:</label>
                    <input
                        type="number"
                        value={followers}
                        onChange={(e) => setFollowers(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Salvar
                </button>
            </form>
        </div>
    );
}

export default InfluencerForm;
