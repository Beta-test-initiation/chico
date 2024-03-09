import React, { useEffect } from 'react';
import Cohere from '@cohere/sdk';

const Chat = () => {
    useEffect(() => {
        Cohere.init('d4ZBLFKfYyQTDY5tRBdL15lWs9tfLHL8onOMKFx6');
    }, []);

    const openChat = () => {
        Cohere.openChat();
    };

    return (
        <div>
            <h1>Welcome to Our Website!</h1>
            <button onClick={openChat}>Open Chat</button>
        </div>
    );
};

export default Chat;