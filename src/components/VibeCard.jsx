import React from 'react';
import { ExternalLink, Heart, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './VibeCard.css';

const VibeCard = ({ data }) => {
    const isInternal = data.url.startsWith('/');

    return (
        <div className="vibe-card animate-fade-in">
            <div className="card-image-container">
                <img src={data.image} alt={data.title} className="card-image" />
                <div className="card-overlay">
                    {isInternal ? (
                        <Link to={data.url} className="visit-btn">
                            View Demo <ArrowRight size={16} />
                        </Link>
                    ) : (
                        <a href={data.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
                            Visit Site <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>

            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{data.title}</h3>
                    <span className="card-author">by {data.author}</span>
                </div>

                <p className="card-description">{data.description}</p>

                <div className="card-tags">
                    {data.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                    {data.tags.length > 3 && <span className="tag">+{data.tags.length - 3}</span>}
                </div>

                <div className="card-footer">
                    <button className="icon-btn">
                        <Heart size={18} />
                        <span>{data.likes}</span>
                    </button>
                    <button className="icon-btn">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VibeCard;
