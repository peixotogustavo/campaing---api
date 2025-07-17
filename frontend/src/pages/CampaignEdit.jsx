import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CampaignEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [influencers, setInfluencers] = useState([]);
    const [selectedInfluencers, setSelectedInfluencers] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/campaigns/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const campaign = res.data;
                setTitle(campaign.title);
                setStartDate(campaign.startDate.slice(0, 10));
                setEndDate(campaign.endDate.slice(0, 10));
                setSelectedInfluencers(campaign.influencers.map((inf) => inf._id));
            } catch (error) {
                console.error('Erro ao buscar campanha:', error);
            }
        };

        const fetchInfluencers = async () => {
            try {
                const res = await axios.get('http://localhost:3000/influencers', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInfluencers(res.data);
            } catch (error) {
                console.error('Erro ao buscar influenciadores:', error);
            }
        };

        fetchCampaign();
        fetchInfluencers();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:3000/campaigns/${id}`,
                {
                    title,
                    startDate,
                    endDate,
                    influencers: selectedInfluencers,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate('/campaigns');
        } catch (error) {
            console.error('Erro ao atualizar campanha:', error);
            alert('Erro ao atualizar. Verifique os dados ou permissões.');
        }
    };

    const handleCheckboxChange = (influencerId) => {
        if (selectedInfluencers.includes(influencerId)) {
            setSelectedInfluencers(selectedInfluencers.filter((id) => id !== influencerId));
        } else {
            setSelectedInfluencers([...selectedInfluencers, influencerId]);
        }
    };

    return (
        <div style={{ padding: '2rem', }}>
            {/* Botão Voltar */}
            <button
                onClick={() => navigate('/campaigns')}
                style={{
                    marginBottom: '1rem',
                    backgroundColor: '#e0e0ff',
                    padding: '0.5rem 1rem',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                }}
            >
                Voltar para Campanhas
            </button>

            <h2>Editar Campanha</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Data de Início:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Data de Fim:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Influenciadores:</label>
                    <div>
                        {influencers.map((inf) => (
                            <label key={inf._id} style={{ display: 'block' }}>
                                <input
                                    type="checkbox"
                                    value={inf._id}
                                    checked={selectedInfluencers.includes(inf._id)}
                                    onChange={() => handleCheckboxChange(inf._id)}
                                />
                                {inf.name} ({inf.socialnetwork})
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" style={{ marginTop: '1rem', backgroundColor: '#e0e0ff' }}>
                    Salvar alterações
                </button>
            </form>
        </div>
    );
}

export default CampaignEdit;
