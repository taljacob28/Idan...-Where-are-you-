'use client';

import { useState, useEffect } from 'react';

const questions = [
  {
    question: "עם מי עידן לא יצאה?",
    answers: ["ינון", "עודד", "דין", "רועי"],
    correct: 3
  },
  {
    question: "איזה חיית מחמד יש לעידן?",
    answers: ["תוכי", "כלב", "חתול", "אין לה חיית מחמד"],
    correct: 2
  },
  {
    question: "באיזה עיר גדלה עידן?",
    answers: ["אשדוד", "באר שבע", "אשקלון", "קריית גת"],
    correct: 1
  },
  {
    question: "מה תאריך הלידה של עידן?",
    answers: ["10/03/1990", "14/04/1990", "28/12/1991", "14/03/1991"],
    correct: 0
  },
  {
    question: "איך עידן קוראת לטל?",
    answers: ["daddy", "אהובי", "טלטולון", "כל התשובות נכונות"],
    correct: 3
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [location, setLocation] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    fetch('/api/location')
      .then(res => res.json())
      .then(data => setLocation(data.location))
      .catch(() => setLocation('תל אביב 🏠'));
  }, []);

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameStarted(false);
  };

  const passedGame = score >= 3;

  return (
    <main className="container">
      {!gameStarted ? (
        <div className="card">
          <h1 className="title">🏠 איפה עידן גרה?</h1>
          <p className="subtitle">כדי לגלות את התשובה, את/ה צריך/ה להוכיח שאת/ה באמת מכיר/ה את עידן!</p>
          <p className="rules">ענה נכון על לפחות 3 מתוך 5 שאלות</p>
          <button className="start-btn" onClick={() => setGameStarted(true)}>
            בואו נתחיל! 🎯
          </button>
        </div>
      ) : !showResult ? (
        <div className="card">
          <div className="progress">
            שאלה {currentQuestion + 1} מתוך {questions.length}
          </div>
          <div className="score">ניקוד: {score}</div>
          
          <h2 className="question">{questions[currentQuestion].question}</h2>
          
          <div className="answers">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-btn ${
                  selectedAnswer === index 
                    ? (index === questions[currentQuestion].correct ? 'correct' : 'wrong')
                    : ''
                } ${selectedAnswer !== null && index === questions[currentQuestion].correct ? 'correct' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {answer}
              </button>
            ))}
          </div>
          
          {isCorrect !== null && (
            <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
              {isCorrect ? '✓ נכון!' : '✗ לא נכון...'}
            </div>
          )}
        </div>
      ) : (
        <div className="card result">
          <h2 className="result-title">
            {passedGame ? '🎉 כל הכבוד!' : '😅 אופס...'}
          </h2>
          <p className="result-score">
            ענית נכון על {score} מתוך {questions.length} שאלות
          </p>
          
          {passedGame ? (
            <div className="location-reveal">
              <p className="reveal-text">עידן גרה ב:</p>
              <div className="location">{location}</div>
            </div>
          ) : (
            <div className="fail-message">
              <p>נראה שאת/ה לא מכיר/ה את עידן מספיק טוב... 🤔</p>
              <p>נסה שוב!</p>
            </div>
          )}
          
          <button className="restart-btn" onClick={restartGame}>
            {passedGame ? 'שחק שוב' : 'נסה שוב'}
          </button>
        </div>
      )}

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
          padding: 40px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          max-width: 500px;
          width: 100%;
        }
        
        .title {
          font-size: 2.5rem;
          color: #e2e8f0;
          margin-bottom: 20px;
          font-weight: 600;
        }
        
        .subtitle {
          color: #94a3b8;
          font-size: 1.1rem;
          margin-bottom: 15px;
          line-height: 1.6;
        }
        
        .rules {
          color: #00d9ff;
          font-size: 1rem;
          margin-bottom: 30px;
        }
        
        .start-btn {
          padding: 15px 40px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          color: #1a1a2e;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .start-btn:hover {
          transform: scale(1.05);
        }
        
        .progress {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }
        
        .score {
          color: #00d9ff;
          font-size: 1rem;
          margin-bottom: 25px;
        }
        
        .question {
          font-size: 1.5rem;
          color: #e2e8f0;
          margin-bottom: 30px;
          font-weight: 400;
          line-height: 1.4;
        }
        
        .answers {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .answer-btn {
          padding: 15px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          text-align: right;
        }
        
        .answer-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          border-color: #00d9ff;
        }
        
        .answer-btn:disabled {
          cursor: default;
        }
        
        .answer-btn.correct {
          background: rgba(0, 255, 136, 0.2);
          border-color: #00ff88;
          color: #00ff88;
        }
        
        .answer-btn.wrong {
          background: rgba(255, 100, 100, 0.2);
          border-color: #ff6464;
          color: #ff6464;
        }
        
        .feedback {
          margin-top: 20px;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .feedback.correct {
          color: #00ff88;
        }
        
        .feedback.wrong {
          color: #ff6464;
        }
        
        .result-title {
          font-size: 2rem;
          color: #e2e8f0;
          margin-bottom: 15px;
        }
        
        .result-score {
          color: #94a3b8;
          font-size: 1.1rem;
          margin-bottom: 30px;
        }
        
        .location-reveal {
          margin-bottom: 30px;
        }
        
        .reveal-text {
          color: #94a3b8;
          font-size: 1rem;
          margin-bottom: 10px;
        }
        
        .location {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .fail-message {
          color: #94a3b8;
          margin-bottom: 30px;
          line-height: 1.8;
        }
        
        .restart-btn {
          padding: 12px 30px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: transparent;
          color: #e2e8f0;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .restart-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 500px) {
          .card {
            padding: 25px;
          }
          .title {
            font-size: 1.8rem;
          }
          .question {
            font-size: 1.2rem;
          }
          .location {
            font-size: 2rem;
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
