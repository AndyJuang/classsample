
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import VibeCard from './components/VibeCard';
import HandoutDemo from './components/HandoutDemo';
import NanoBanana from './components/NanoBanana';
import { examples, tags } from './data/examples';
import './App.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredExamples = activeTab === 'All'
    ? examples
    : examples.filter(ex => ex.tags.includes(activeTab));

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Discover <span className="highlight">Vibe Coding</span> <br /> Inspiration
          </h1>
          <p className="hero-subtitle">
            A curated collection of the best AI-powered apps, prompts, and coding experiments.
          </p>
        </div>
      </section>

      <section className="gallery container">
        <div className="tabs-container">
          <div className="tabs">
            {tags.map(tag => (
              <button
                key={tag}
                className={`tab - btn ${activeTab === tag ? 'active' : ''} `}
                onClick={() => setActiveTab(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-container">
          {filteredExamples.map(example => {
            // Check if it's an internal route
            const isInternal = example.url.startsWith('/');
            return isInternal ? (
              <div key={example.id} className="vibe-card-wrapper" style={{ display: 'contents' }}>
                {/* We wrap VibeCard slightly or modify it to accept onClick. 
                       For simplicity, let's just use standard VibeCard but patch the URL behavior if needed, 
                       or update VibeCard to handle Link. 
                       Actually, let's update VibeCard to handle internal links.
                   */}
                <VibeCard data={example} />
              </div>
            ) : (
              <VibeCard key={example.id} data={example} />
            )
          })}
        </div>
      </section>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/handout" element={<HandoutDemo />} />
            <Route path="/nano-banana" element={<NanoBanana />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <p>© 2025 VibeVault. Curated with ❤️ by Antigravity.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
