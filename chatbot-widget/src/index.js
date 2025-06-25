// D:\Projects\ChatbotWidget\src\index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Sử dụng createRoot cho React 18+
import './components/Chatbot/Chatbot.css'; // <<-- Dòng này được thêm vào/sửa

// Thay thế 'App' bằng 'ChatbotApp' nếu bạn đã đổi tên App.js thành ChatbotApp.js
// Hoặc giữ nguyên './App' nếu bạn vẫn giữ tên App.js
import ChatbotApp from './ChatbotApp';
// Lấy phần tử gốc mà React sẽ render vào
const rootElement = document.getElementById('chatbot-root');

if (rootElement) {
    // Tạo một React root và render component ChatbotApp vào đó
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ChatbotApp />
        </React.StrictMode>
    );
} else {
    console.error("Phần tử với ID 'chatbot-root' không được tìm thấy trong DOM.");
}