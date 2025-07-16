import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

            // Remove a campanha da lista sem recarregar a página
            setCampaigns((prev) => prev.filter((c) => c._id !== id));
        } catch (error) {
            console.error('Erro ao excluir campanha:', error);
            alert('Erro ao excluir. Verifique se você tem permissão (admin).');
        }
    };


    return (
        <div style={{ padding: '2rem' }}>
            <h2>Lista de Campanhas</h2>

            <button onClick={() => navigate('/campaigns/new')} style={{ marginBottom: '1rem' }}>
                Nova Campanha
            </button>

            {campaigns.map((c) => (
                <div key={c._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
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
                    <button
                        onClick={() => handleDelete(c._id)}
                        style={{ marginTop: '0.5rem', backgroundColor: 'red', color: 'white' }}
                    >
                        Excluir
                    </button>

                </div>
            ))}

        </div>


    );
}

export default CampaignList;

