'use client';

import { useState, useEffect } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/location')
      .then(res => res.json())
      .then(data => setCurrentLocation(data.location))
      .catch(() => {});
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // הסיסמה נבדקת בצד השרת, אבל נשמור אותה לשימוש ב-API
    setIsAuthenticated(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ התשובה עודכנה בהצלחה!');
        setCurrentLocation(location);
        setLocation('');
      } else {
        setMessage(`❌ ${data.error || 'שגיאה בעדכון'}`);
        if (data.error === 'סיסמה שגויה') {
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      setMessage('❌ שגיאה בחיבור לשרת');
    }

    setLoading(false);
  };

  return (
    <main className="container">
      <div className="card">
        <h1>🔐 ניהול</h1>
        
        {!isAuthenticated ? (
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">כניסה</button>
          </form>
        ) : (
          <>
            <div className="current">
              <span>התשובה הנוכחית:</span>
              <strong>{currentLocation}</strong>
            </div>
            
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="התשובה החדשה..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'מעדכן...' : 'עדכן'}
              </button>
            </form>
            
            {message && <p className="message">{message}</p>}
          </>
        )}
        
        <a href="/" className="back">← חזרה לעמוד הראשי</a>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 20px;
        }
        
        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 50px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 400px;
        }
        
        h1 {
          color: #e2e8f0;
          margin-bottom: 30px;
          font-weight: 400;
        }
        
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        input {
          padding: 15px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          text-align: center;
          direction: rtl;
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        input:focus {
          outline: none;
          border-color: #00d9ff;
        }
        
        button {
          padding: 15px 30px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          color: #1a1a2e;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
        }
        
        button:hover {
          transform: scale(1.02);
        }
        
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .current {
          background: rgba(0, 217, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 25px;
          color: #e2e8f0;
        }
        
        .current span {
          display: block;
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 5px;
        }
        
        .current strong {
          font-size: 1.3rem;
          color: #00d9ff;
        }
        
        .message {
          margin-top: 20px;
          color: #e2e8f0;
        }
        
        .back {
          display: inline-block;
          margin-top: 30px;
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .back:hover {
          color: #e2e8f0;
        }
      `}</style>
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          direction: rtl;
        }
      `}</style>
    </main>
  );
}
