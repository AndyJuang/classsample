
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
    },
    {
        id: 9,
        title: "Ukiyo-e Trading Card",
        prompt: "核心指令： 一张日式浮世绘风格的收藏级集换式卡牌设计，竖构图。插画风格需要紧密模仿《鬼灭之刃》的视觉美学，特征包括：粗细变化的墨笔轮廓线、传统木版画的配色方案，以及戏剧性的动态构图。\n\n主体描述： 卡牌主角是 {角色名字}（称号：{柱名/称号}），处于动态战斗姿势，手持 {武器描述}。 角色正在施展 {呼吸法招式名称}，周围环绕着 {视觉特效描述}（例如：巨大的火焰 / 水龙 / 旋风），这些特效需要以 传统日式水墨画（Sumi-e）风格 呈现。\n\n背景与材质： 背景需融合 纹理化的镭射闪卡（Holographic Foil）效果，在传统水墨元素下方闪烁。\n\n边框： 图片周围要有 日本传统纹样（如青海波或麻叶纹）组成的装饰性边框。底部有一个风格化的横幅，上面用古朴的日式书法写着 “{日文汉字名字}”。",
        tags: ["Artistic", "Card Design", "Ukiyo-e"],
        image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 10,
        title: "Historical Newspaper",
        prompt: "一张1080x1080像素的特写照片，双手捧着一份白色报纸，镜头向下拍摄。背景极度虚化且偏暗，使报纸清晰醒目。报纸占据了画面的大部分，其内容清晰易读。醒目的标题为“[标题]”。画面中央是一张[照片描述]的大幅黑白照片。配文列数较多，清晰易读。每次拍摄都保持相同的风格、构图、光线、人物、虚化效果、布局和报纸设计，仅更改标题和照片。",
        tags: ["Vintage", "Newspaper", "Mockup"],
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 11,
        title: "Fashion Concept Breakdown",
        prompt: "手绘风格的时尚概念分解图。\n\n中心：一位时尚自信、略带性感（但并不露骨）的女性角色的全身像，姿态自然而充满活力。\n\n周围：她的关键元素结构化布局：\n• 服装层次——展示外套、内衣、紧身裤（蕾丝、薄纱材质）、塑身衣，并放大细节图案。\n• 表情图——3-4种面部表情（中性、害羞、惊讶、专注）。\n• 特写镜头——面料褶皱纹理、肌肤细节、手势。\n• 生活方式及配饰——打开的手提包，内含日常用品：口红、香水、粉饼盒、护手霜、日记本、保健品。\n• 材质标注——每件物品旁的手写风格注释（例如，“柔软蕾丝”、“哑光皮革”、“色号#520”）。\n\n背景：柔和的米色或羊皮纸纹理，营造设计草图的氛围。\n光线：干净柔和的阴影，使画面浑然一体。\n输出：4K 高清 2D 插画，兼具性感与时尚感。\n语言：中英文标签。",
        tags: ["Fashion", "Design", "Concept Art"],
        image: "https://images.unsplash.com/photo-1537832816519-0439447f0ded?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 12,
        title: "Facial Age Analysis",
        prompt: "根据（您的照片）制作一张超逼真、高分辨率的肖像信息图。保持（您的照片）中人物的身份、发型、服装和自然肤色不变，并使用中性摄影棚背景。在整张脸上叠加一个微妙的半透明面部分析网格，类似于3D面部扫描网格：纤细柔和的白色线条沿着面部轮廓延伸，略带光泽但不遮盖皮肤细节。在脸部一侧添加一条清晰的垂直红色激光线，如同未来主义的扫描效果。所有分析线都必须柔和、简洁、优雅，如同美容科技广告一般。制作一张简洁的医学美容信息图，使用全局数据百分比评估5个衰老因素：1. 细纹和皱纹；2. 皮肤纹理和弹性；3. 面部容量和下垂；4. 眼周衰老迹象；5.肤色和色素沉着：针对每个因素，放置一个带有细线指向相应面部区域的小标签，并在旁边写上简短的标题和一个0-100%的实际百分比分数（基于全球数据），例如：“细纹和皱纹 - 18%”“皮肤纹理和弹性 - 72%”“面部容量和下垂 - 35%”“眼周衰老迹象 - 41%”“肤色和色素沉着 - 63%”。使用简洁、现代的无衬线字体和小号技术风格文本，类似于科学的面部分析用户界面。在图像底部中央，用粗体大字显示基于分析的最终估计真实年龄，例如：“估计年龄：（基于面部分析的随机数字）”。整体风格：未来主义的AI引导护肤分析，极简主义，高级编辑灯光，不提及性别，适用于任何面部。",
        tags: ["Infographic", "Medical", "Analysis"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 13,
        title: "PPT Slide Generator",
        prompt: "帮我根据下面这个文章做一套中学生都能理解的中文PPT。\n\n先写1个PPT大纲，规划出每一页的PPT的内容。\n\n然后将每一页的PPT内容分别扔给Nana Banana pro生成对应页面的PPT，需要确保风格一致。\n\nPPT的具体风格应该为请“Anthropic/Claude 风格”的“温暖学术人文主义”设计。\n\n背景：使用暖米色/奶油色 (# F3F0E9) 作为底色，模仿高级纸张质感。\n\n字体：标题使用优雅的衬线体（Serif），正文使用现代无衬线体（Sans-serif）。\n\n配色：主色调为赤陶红 (# D67052) 和芥末黄 (# F0B857)，搭配深海军蓝作为点缀。避免使用霓虹色或纯黑色。\n\n视觉元素：使用注重排版的网格布局，插图风格应为抽象的、有机的黑色手绘线条画，置于赤陶红纯色色块之上，部分关键信息使用卡片布局。\n\n图表：扁平化、极简的柱状图，强调数据对比，去除多余边框。\n\n文字和图像都由 Nano Banana Pro 生成，另外不要将PPT 变成一整张图，一页一张图。\n\n文章内容为：[]",
        tags: ["Productivity", "Presentation", "Design"],
        image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=600"
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
