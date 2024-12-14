import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../api/chatService';
import './WoopChat.css';

const WoopChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="woop-chat-container levitate">
      <div className="woop-chat-header">
        <div className="woop-avatar"></div>
        <h1>Wisp Oracle🔮</h1>
      </div>
      
      <div className="woop-chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.role === 'assistant' && <div className="woop-bubble"></div>}
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="woop-bubble"></div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="woop-chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="hello wisp..."
        />
        <button type="submit">
          <span className="send-icon">➜</span>
        </button>
      </form>
    </div>
  );
};

export default WoopChat; 