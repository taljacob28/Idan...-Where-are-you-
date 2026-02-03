'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [answer, setAnswer] = useState('טוען...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/location')
      .then(res => res.json())
      .then(data => {
        setAnswer(data.location);
        setLoading(false);
      })
      .catch(() => {
        setAnswer('לא ידוע 🤷');
        setLoading(false);
      });
  }, []);

  return (
    <main className="container">
      <div className="card">
        <h1 className="question">איפה עידן גרה?</h1>
        <div className={`answer ${loading ? 'loading' : ''}`}>
          {answer}
        </div>
        <p className="subtitle">התשובה הרשמית והמעודכנת</p>
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
          padding: 60px 80px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .question {
          font-size: 2.5rem;
          color: #e2e8f0;
          margin-bottom: 30px;
          font-weight: 300;
        }
        
        .answer {
          font-size: 4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          transition: opacity 0.3s ease;
        }
        
        .answer.loading {
          opacity: 0.5;
        }
        
        .subtitle {
          color: #64748b;
          font-size: 1rem;
        }
        
        @media (max-width: 600px) {
          .card {
            padding: 40px 30px;
          }
          .question {
            font-size: 1.8rem;
          }
          .answer {
            font-size: 2.5rem;
          }
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
