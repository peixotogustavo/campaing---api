import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CampaignForm() {
    const [form, setForm] = useState({
        title: '',
        startDate: '',
        endDate: '',
        influencers: [],
    });
    const [influencers, setInfluencers] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchInfluencers = async () => {
            try {
                const res = await axios.get('http://localhost:3000/influencers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setInfluencers(res.data);
            } catch (error) {
                console.error('Erro ao buscar influencers:', error);
            }
        };

        fetchInfluencers();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (influencerId) => {
        setForm((prev) => {
            const isSelected = prev.influencers.includes(influencerId);
            return {
                ...prev,
                influencers: isSelected
                    ? prev.influencers.filter((id) => id !== influencerId)
                    : [...prev.influencers, influencerId],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/campaigns', form, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Campanha criada com sucesso!', res.data);
            navigate('/campaigns');
        } catch (error) {
            console.error('Erro ao criar campanha:', error);
            alert('Erro ao criar campanha');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            {/* Botão de Voltar */}
            <button
                onClick={() => navigate('/campaigns')}
                style={{
                    marginBottom: '1rem',
                    backgroundColor: '#e0e0ff',
                    border: '1px solid #ccc',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                }}
            >
                Voltar para Campanhas
            </button>

            <h2>Criar Nova Campanha</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label><br />
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Data de início:</label><br />
                    <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Data de término:</label><br />
                    <input
                        type="date"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Influenciadores:</label>
                    <div>
                        {influencers.map((inf) => (
                            <label key={inf._id} style={{ display: 'block', marginTop: '0.3rem' }}>
                                <input
                                    type="checkbox"
                                    value={inf._id}
                                    checked={form.influencers.includes(inf._id)}
                                    onChange={() => handleCheckboxChange(inf._id)}
                                />
                                {inf.name} ({inf.socialnetwork})
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" style={{ marginTop: '1rem', backgroundColor: '#e0e0ff' }}>
                    Salvar campanha
                </button>
            </form>
        </div>
    );
}

export default CampaignForm;
