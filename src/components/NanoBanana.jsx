
import React, { useState } from 'react';
import { Search, Copy, Check, Filter } from 'lucide-react';
import './NanoBanana.css';

const initialPrompts = [
    {
        id: 1,
        title: "Cyberpunk City",
        prompt: "Futuristic city with neon lights, raining, cyberpunk style, high detail, 8k resolution, cinematic lighting --ar 16:9",
        tags: ["Sci-Fi", "Environment"],
        image: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 2,
        title: "Portrait of a Warrior",
        prompt: "Portrait of a female warrior, intricate armor, fantasy style, digital painting, sharp focus, dramatic lighting --ar 2:3",
        tags: ["Character", "Fantasy"],
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 3,
        title: "Watercolor Landscape",
        prompt: "Peaceful landscape, mountains and lake, watercolor style, soft colors, artistic, masterpiece",
        tags: ["Artistic", "Environment"],
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 4,
        title: "Cute Robot",
        prompt: "Cute small robot holding a flower, pixar style, 3d render, octane render, bright colors, friendly",
        tags: ["3D", "Character"],
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 5,
        title: "Space Station",
        prompt: "Orbital space station, earth in background, realistic, hard sci-fi, detailed textures, 4k",
        tags: ["Sci-Fi", "Space"],
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 6,
        title: "Oil Painting Flow",
        prompt: "Abstract oil painting, impasto thick brush strokes, vibrant colors, swirling patterns, emotional",
        tags: ["Artistic", "Abstract"],
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600"
    }
];

const NanoBanana = () => {
    const [prompts, setPrompts] = useState(initialPrompts);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredPrompts = prompts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="nano-app">
            <div className="nano-header">
                <div className="nano-title-section">
                    <h1 className="nano-title">Nano Banana <span className="highlight-yellow">Prompts</span></h1>
                    <p>Curated collection of high-quality AI generation prompts.</p>
                </div>

                <div className="nano-search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search prompts, tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="nano-grid container">
                {filteredPrompts.map(item => (
                    <div key={item.id} className="prompt-card animate-fade-in">
                        <div className="prompt-image-wrapper">
                            <img src={item.image} alt={item.title} />
                            <div className="prompt-tags">
                                {item.tags.map(tag => <span key={tag} className="tag-badge">{tag}</span>)}
                            </div>
                        </div>
                        <div className="prompt-content">
                            <h3>{item.title}</h3>
                            <div className="prompt-text-box">
                                <p>{item.prompt}</p>
                                <button
                                    className={`copy-btn ${copiedId === item.id ? 'copied' : ''}`}
                                    onClick={() => handleCopy(item.prompt, item.id)}
                                    title="Copy Prompt"
                                >
                                    {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NanoBanana;
