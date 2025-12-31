
import React from 'react';
import { Search, Sparkles, Plus } from 'lucide-react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container header-content">
                <div className="logo">
                    <Sparkles className="logo-icon" size={28} />
                    <span className="logo-text">VibeVault</span>
                </div>

                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input type="text" placeholder="Search vibe coding examples..." />
                </div>

            </div>
        </header>
    );
};

export default Header;
