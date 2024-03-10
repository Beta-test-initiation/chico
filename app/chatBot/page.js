"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Chats() {
    const [userInput, setUserInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const fetchResponse = async () => {
        try {
            const response = await axios.post('http://localhost:3003/chat', {
                message: userInput // Pass user input to the server
            });

            console.log('Response from Cohere API:', response.data);
            // Set the chat response received from the server
            setChatResponse(response.data.join('\n'));

        } catch (error) {
            console.error('Error displaying chats:', error);
        }
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.textContent); // Update user input state as the user types
    };

    useEffect(() => {
        fetchResponse(); // Fetch chat response when component mounts
    }, []);

    return (
        <div>
            <h1>Chat Response</h1>
            <div
                id="userInputDiv"
                contentEditable={true} // Set contentEditable based on state
                onBlur={handleInputChange} // Use onBlur event instead of onInput
                suppressContentEditableWarning={true} // Suppress contentEditable warning
            >
                {userInput}
            </div>
            <button onClick={fetchResponse}>Send</button>
            <div id="chatResponseDiv">
                {chatResponse}
            </div>
        </div>
    );
}
