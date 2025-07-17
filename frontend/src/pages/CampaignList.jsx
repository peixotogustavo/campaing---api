import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import { jwtDecode } from 'jwt-decode';
import * as jwt_decode from 'jwt-decode';

function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://localhost:3000/campaigns', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCampaigns(res.data);
            } catch (error) {
                console.error('Erro ao buscar campanhas:', error);
            }
        };

        fetchCampaigns();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta campanha?')) return;

        try {
            const token = localStorage.getItem('token');

            await axios.delete(`http://localhost:3000/campaigns/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCampaigns((prev) => prev.filter((c) => c._id !== id));
        } catch (error) {
            console.error('Erro ao excluir campanha:', error);
            alert('Erro ao excluir. Verifique se você tem permissão (admin).');
        }
    };

    const token = localStorage.getItem('token');
    let role = '';

    if (token) {
        try {
            const decoded = jwt_decode.jwtDecode(token);
            role = decoded.role;
        } catch (err) {
            console.error('Token inválido:', err);
        }
    }

    return (
        <div>
            <Header />



            <h2>Lista de Campanhas</h2>

            {/* Botões de ação */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button
                    onClick={() => navigate('/campaigns/new')}
                    style={{ backgroundColor: '#e0e0ff' }}
                >
                    Nova Campanha
                </button>

                <button
                    onClick={() => navigate('/influencers')}
                    style={{ backgroundColor: '#e0e0ff' }}
                >
                    Listar Influencers
                </button>
            </div>

            {campaigns.map((c) => (
                <div
                    key={c._id}
                    style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
                >
                    <h3>{c.title}</h3>
                    <p><strong>Início:</strong> {new Date(c.startDate).toLocaleDateString()}</p>
                    <p><strong>Fim:</strong> {new Date(c.endDate).toLocaleDateString()}</p>

                    <p><strong>Influenciadores:</strong></p>
                    <ul>
                        {c.influencers.map((inf) => (
                            <li key={inf._id}>
                                {inf.name} ({inf.socialnetwork})
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => navigate(`/campaigns/edit/${c._id}`)}
                            style={{
                                backgroundColor: 'orange',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Editar
                        </button>

                        {role === 'admin' && (
                            <button
                                onClick={() => handleDelete(c._id)}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Excluir
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>

    );
}

export default CampaignList;
