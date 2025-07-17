import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CampaignForm() {
    const [form, setForm] = useState({
        title: '',
        startDate: '',
        endDate: '',
        influencers: [],
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const res = await axios.post('http://localhost:3000/campaigns', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
                    <label>Influencers (IDs separados por vírgula):</label><br />
                    <input
                        type="text"
                        name="influencers"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                influencers: e.target.value.split(',').map((id) => id.trim()),
                            })
                        }
                        placeholder="Ex: 123abc, 456def"
                    />
                </div>

                <button type="submit" style={{ marginTop: '1rem' }}>
                    Salvar campanha
                </button>
            </form>
        </div>
    );
}

export default CampaignForm;
