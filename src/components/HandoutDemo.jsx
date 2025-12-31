
import React, { useState } from 'react';
import { Lock, Mail, Download, ArrowRight, ShieldAlert } from 'lucide-react';
import './HandoutDemo.css';

const HandoutDemo = () => {
    const [step, setStep] = useState('login'); // login, emailSent, admin
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to verify and send email
        setTimeout(() => {
            setIsLoading(false);
            setStep('emailSent');
        }, 1500);
    };

    return (
        <div className="handout-app">
            <div className="handout-container">
                {step === 'login' && (
                    <div className="glass-card animate-fade-in">
                        <div className="card-header-center">
                            <div className="icon-wrapper">
                                <Download size={32} />
                            </div>
                            <h1>Course Materials</h1>
                            <p>Enter your details. We will email you a secure, one-time download link.</p>
                        </div>

                        <form className="login-form" onSubmit={handleLogin}>
                            <div className="input-group">
                                <Mail size={20} />
                                <input
                                    type="email"
                                    placeholder="Student Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <Lock size={20} />
                                <input type="text" placeholder="Access Code" required />
                            </div>
                            <button type="submit" className="action-btn" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Send Download Link'}
                                {!isLoading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <div className="admin-toggle">
                            <button onClick={() => setStep('admin')} className="text-link">Admin Access</button>
                        </div>
                    </div>
                )}

                {step === 'emailSent' && (
                    <div className="glass-card animate-fade-in">
                        <div className="card-header-center">
                            <div className="icon-wrapper success">
                                <Mail size={32} />
                            </div>
                            <h1>Check Your Inbox</h1>
                            <p className="success-message">
                                We've sent a one-time download link to <br />
                                <strong>{email}</strong>
                            </p>
                            <div className="info-box">
                                <p>The link will expire in 24 hours.</p>
                                <p className="sub-text">Record added to Google Sheets.</p>
                            </div>
                        </div>

                        <button onClick={() => setStep('login')} className="action-btn download-btn">
                            Back to Home
                        </button>
                    </div>
                )}

                {step === 'admin' && (
                    <div className="glass-card admin-panel animate-fade-in">
                        <div className="card-header-between">
                            <h2>Admin Dashboard</h2>
                            <button onClick={() => setStep('login')} className="close-btn">Exit</button>
                        </div>

                        <div className="admin-section">
                            <label>Google Sheets Integration</label>
                            <input type="text" className="input-field" placeholder="Paste Google Sheet ID here..." defaultValue="1BxiMvs0XRA5nSLd..." />
                            <div className="status-badge">
                                <span className="dot online"></span> Connected to "Class 2025 Records"
                            </div>
                        </div>

                        <div className="admin-section">
                            <label>Material Settings</label>
                            <input type="text" className="input-field" defaultValue="Advanced_React.pdf" />
                            <div className="checkbox-group">
                                <input type="checkbox" checked readOnly />
                                <span>One-time link only</span>
                            </div>
                        </div>

                        <div className="stats-row">
                            <div className="stat-box">
                                <span className="stat-val">142</span>
                                <span className="stat-label">Emails Sent</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-val">Synced</span>
                                <span className="stat-label">Google Sheet</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HandoutDemo;
