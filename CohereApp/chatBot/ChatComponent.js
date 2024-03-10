import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = async () => {
        const engineeredInput = `Answer this user input in less than 5 sentences:\n${inputValue}`;

        // Send HTTP POST request to Cohere's chatbot API
        try {
            const response = await axios.post(
                'https://api.cohere.ai/v1/chat',
                { message: engineeredInput }
            );

            // Update the chat messages with the user input and the response from Cohere
            setMessages([
                ...messages,
                { role: 'User', content: inputValue },
                { role: 'Cohere', content: response.data.prediction }
            ]);

            // Clear the input field after sending the message
            setInputValue('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ padding: '5px' }}>
                        <strong>{message.role}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatComponent;