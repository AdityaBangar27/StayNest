import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am the StayNest assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Assuming a backend route is available at /api/chatbot
      // For demonstration, simulating a response
      setTimeout(() => {
         setMessages(prev => [...prev, { sender: 'bot', text: 'I am a simulated chatbot response. To connect to real ChatGPT API, update backend route.' }]);
         setLoading(false);
      }, 1000);
      /*
      const res = await axios.post('http://localhost:5000/api/chatbot', { message: input });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
      setLoading(false);
      */
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I encountered an error.' }]);
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="glass-panel" style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '350px',
          height: '450px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          background: 'white',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ background: 'var(--primary-color)', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>StayNest Assistant</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? 'var(--primary-color)' : '#f1f5f9',
                color: msg.sender === 'user' ? 'white' : 'var(--text-dark)',
                padding: '0.75rem 1rem',
                borderRadius: '16px',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                maxWidth: '80%'
              }}>
                {msg.text}
              </div>
            ))}
            {loading && <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '16px', borderBottomLeftRadius: '4px' }}>...</div>}
          </div>

          <form onSubmit={sendMessage} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid #e2e8f0', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
            <button type="submit" style={{ background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
