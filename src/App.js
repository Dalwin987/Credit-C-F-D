import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const headerRef = useRef(null);
    const cardRef = useRef(null);
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const resultRef = useRef(null);

    useEffect(() => {
        // Header entrance animation
        gsap.from(headerRef.current, {
            y: -50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
        });

        // Card entrance with glow
        gsap.from(cardRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            delay: 0.3,
        });

        // Form entrance
        gsap.from(formRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.6,
        });

        // Button pulse animation
        gsap.to(buttonRef.current, {
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        return () => {
            gsap.killTweensOf('*');
        };
    }, []);

    useEffect(() => {
        if (message && resultRef.current) {
            gsap.from(resultRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.2)',
            });
        }
    }, [message]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://creditcarddetectorserver.onrender.com/predict",
                { input: input }
            );

            const { prediction, result, probability } = response.data;

            let msg = result || (prediction === 1
                ? "⚠️ This transaction is predicted to be FRAUDULENT."
                : "✅ This transaction is predicted to be NON-FRAUDULENT.");

            if (probability) {
                msg += `\n\n📊 Probability:\n`;
                msg += `Non-Fraud: ${(probability[0] * 100).toFixed(2)}%\n`;
                msg += `Fraud: ${(probability[1] * 100).toFixed(2)}%`;
            }

            setMessage(msg);

        } catch (error) {
            console.error(error);
            if (error.response) {
                setMessage(`❌ ${error.response.data.error || 'Server error'}`);
            } else {
                setMessage("❌ Unable to connect to the server.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            {/* Main Card */}
            <div className="card" ref={cardRef}>
                <div className="share">
                    <a href="https://github.com/LavKalsi" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                    </a>
                    <a href="https://x.com/KalsiLav" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/lavkalsi/" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/lavkalsi/" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                        </svg>
                    </a>
                </div>

                <header className="App-header" ref={headerRef}>
                    <h1>💳 Fraud Detection</h1>
                    <p className="subtitle">Enter transaction data for analysis</p>

                    <form onSubmit={handleSubmit} ref={formRef}>
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Enter comma-separated values (e.g., 0.5, 1.2, -0.3, ...)"
                            rows="4"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            ref={buttonRef}
                            disabled={isLoading || !input.trim()}
                            className={isLoading ? 'loading' : ''}
                        >
                            <div className="svg-wrapper-1">
                                <div className="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/>
                                    </svg>
                                </div>
                            </div>
                            <span>{isLoading ? 'Analyzing...' : 'Check Data'}</span>
                        </button>
                    </form>

                    {message && (
                        <div className="result-message" ref={resultRef}>
                            <pre>{message}</pre>
                        </div>
                    )}
                </header>
            </div>
        </div>
    );
}

export default App;