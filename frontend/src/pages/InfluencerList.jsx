import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InfluencerList() {
    const [influencers, setInfluencers] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchInfluencers();
    }, []);

    const fetchInfluencers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/influencers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInfluencers(response.data);
        } catch (error) {
            console.error('Erro ao buscar influencers:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/influencers/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este influencer?')) return;

        try {
            await axios.delete(`http://localhost:3000/influencers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchInfluencers(); // atualiza lista
        } catch (error) {
            console.error('Erro ao excluir influencer:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            {/* Botão para voltar para campanhas */}
            <button
                onClick={() => navigate('/campaigns')}
                style={{
                    marginBottom: '1rem',
                    backgroundColor: '#e0e0ff',
                    border: '1px solid #ccc',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer'
                }}
            >
                Voltar para Campanhas
            </button>

            <h2>Lista de Influencers</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Nome</th>
                        <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Redes Sociais</th>
                        <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Seguidores</th>
                        <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {influencers.map((inf) => (
                        <tr key={inf._id}>
                            <td style={{ padding: '0.5rem' }}>{inf.name}</td>
                            <td style={{ padding: '0.5rem' }}>{inf.socialnetwork}</td>
                            <td style={{ padding: '0.5rem' }}>{inf.followers}</td>
                            <td style={{ padding: '0.5rem' }}>
                                <button
                                    onClick={() => handleEdit(inf._id)}
                                    style={{
                                        marginRight: '0.5rem',
                                        backgroundColor: 'orange',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.3rem 0.6rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(inf._id)}
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.3rem 0.6rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InfluencerList;
