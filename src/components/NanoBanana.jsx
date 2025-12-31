
import React, { useState } from 'react';
import { Search, Copy, Check, Filter } from 'lucide-react';
import './NanoBanana.css';

const initialPrompts = [
    {
        id: 1,
        title: "Photorealistic Close-Up Portrait",
        prompt: "A photorealistic close-up selfie portrait of a young mixed-ethnicity woman in her early 20s with warm medium tan skin tone and smooth complexion with subtle natural blush and freckles lightly across cheeks, long voluminous curly dark brown hair with tight ringlets... (high-resolution 4K quality with razor-sharp focus on facial details)",
        tags: ["Portrait", "Photorealistic", "Avatar"],
        image: "https://cms-assets.youmind.com/media/1767061695970_qp03fp_G9RGVetXEAAR0NV.jpg"
    },
    {
        id: 2,
        title: "Paparazzi Flash Nightlife",
        prompt: "{\n  \"generation_request\": {\n    \"output_settings\": { \"render_style\": \"photorealistic_night_paparazzi_flash\" },\n    \"creative_prompt\": {\n      \"scene_summary\": \"Photorealistic nightlife editorial: a woman leaning out of a black car door/window... Strong paparazzi-style on-camera flash lights her face...\"\n    }\n  }\n}",
        tags: ["Social Media", "Nightlife", "Flash Photography"],
        image: "https://cms-assets.youmind.com/media/1767061753471_82eruq_G9VsRvgXwAA-WkY.jpg"
    },
    {
        id: 3,
        title: "Bento Grid Infographic",
        prompt: "{\n  \"image_analysis\": {\n    \"subject\": \"Goji Berry Science Infographic, 9:16\",\n    \"style\": \"Modular Bento Grid Design / Minimalist UI Design\",\n    \"prompt_elements\": {\n       \"layout\": \"Bento box style modular grid layout, clean UI/UX interface design...\"\n    }\n  }\n}",
        tags: ["Infographic", "Design", "Educational"],
        image: "https://cms-assets.youmind.com/media/1767061773931_tywx6y_G9Q7Z2JbYAABPoc.jpg"
    },
    {
        id: 4,
        title: "2000s Nostalgic Selfie",
        prompt: "Create a 2000s Mirror Selfie of yourself using Gemini Nano Banana.\n\n{\n  \"subject\": { \"description\": \"A young woman taking a mirror selfie with very long voluminous dark waves\" },\n  \"photography\": { \"camera_style\": \"early-2000s digital camera aesthetic\", \"lighting\": \"harsh super-flash\" }\n}",
        tags: ["Aesthetic", "Y2K", "Selfie"],
        image: "https://github.com/user-attachments/assets/b71755dc-ff33-4872-8161-3f5066e0ccb6"
    },
    {
        id: 5,
        title: "Star Wars: Where's Waldo?",
        prompt: "A where is waldo image showing all Star Wars characters on Tatooine\n\nFirst one to pull this off. First take. Even Waldo is there.",
        tags: ["Creative", "Pop Culture", "Crowd"],
        image: "https://github.com/user-attachments/assets/439317c2-4be8-4b28-803f-36427ecca31e"
    },
    {
        id: 6,
        title: "Recursive Visuals (Droste)",
        prompt: "recursive image of an orange cat sitting in an office chair holding up an iPad. On the iPad is the same cat in the same scene holding up the same iPad. Repeated on each iPad.",
        tags: ["Abstract", "Creative", "Recursion"],
        image: "https://github.com/user-attachments/assets/f7ef5a84-e2bf-4d4e-a93e-38a23a21b9ef"
    },
    {
        id: 7,
        title: "Whiteboard Marker Art",
        prompt: "Create a photo of vagabonds musashi praying drawn on a glass whiteboard in a slightly faded green marker",
        tags: ["Artistic", "Sketch", "Texture"],
        image: "https://github.com/user-attachments/assets/b399c4d9-151b-4e15-9a40-f092f7a892b9"
    },
    {
        id: 8,
        title: "Coordinate Visualization",
        prompt: "35.6586° N, 139.7454° E at 19:00",
        tags: ["Experimental", "minimalist"],
        image: "https://github.com/user-attachments/assets/8629b88a-b872-43e2-a19e-855542702ac2"
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
