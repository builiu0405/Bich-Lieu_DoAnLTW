// D:\Projects\ChatbotWidget\src\ChatbotApp.js (hoặc App.js)

import React from 'react';
import Chatbot from './components/Chatbot/Chatbot'; // Sửa đường dẫn import
// Import CSS của chatbot cũng cần được điều chỉnh nếu nó nằm cùng thư mục với Chatbot.jsx
import './components/Chatbot/Chatbot.css'; 

function ChatbotApp() {
    return (
        <React.StrictMode>
            <Chatbot />
        </React.StrictMode>
    );
}

export default ChatbotApp;