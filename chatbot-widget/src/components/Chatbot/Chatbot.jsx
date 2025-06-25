// src/components/Chatbot/Chatbot.jsx

import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // File CSS cho chatbot

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false); // State để quản lý ẩn/hiện chatbot
    const [hasGreeted, setHasGreeted] = useState(false); // <-- THÊM STATE NÀY để kiểm tra đã chào hay chưa

    // Cuộn xuống tin nhắn mới nhất
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // <-- THÊM useEffect NÀY để hiển thị lời chào khi chatbot mở lần đầu
    useEffect(() => {
        if (isOpen && !hasGreeted) {
            const initialBotMessage = {
                sender: 'bot',
                text: `Xin chào! Chào mừng đến với phần hỗ trợ của chúng tôi. Bạn có thể chat trực tiếp với người bán qua trang <a href='http://localhost:5074/Chat/UserChat'>Hỗ trợ</a> hoặc trò chuyện với tôi.`
            };
            setMessages(prevMessages => [...prevMessages, initialBotMessage]);
            setHasGreeted(true); // Đánh dấu là đã chào
        }
    }, [isOpen, hasGreeted]); // Chạy khi isOpen hoặc hasGreeted thay đổi


    // Hàm xử lý khi người dùng gửi tin nhắn
    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const newUserMessage = { sender: 'user', text: input.trim() };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        setInput('');

        let botResponseText = "Xin lỗi, tôi không hiểu yêu cầu của bạn. Bạn có thể thử hỏi về 'menu', 'đặt hàng', 'giao hàng', 'thanh toán', 'khuyến mãi' hoặc 'địa chỉ' nhé!";

        const lowerCaseInput = input.toLowerCase(); // Chuyển đổi một lần để dùng nhiều lần

        // 1. Chào hỏi
        if (lowerCaseInput.includes("chào") || lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi") || lowerCaseInput.includes("alo")) {
            botResponseText = "Chào bạn! Tôi là chatbot hỗ trợ của cửa hàng chúng tôi. Tôi có thể giúp gì cho bạn hôm nay?";
        }
        // 2. Tạm biệt / Cảm ơn
        else if (lowerCaseInput.includes("cảm ơn") || lowerCaseInput.includes("bye") || lowerCaseInput.includes("cảm ơn") || lowerCaseInput.includes("thank you")) {
            botResponseText = "Rất vui được hỗ trợ bạn! Hẹn gặp lại bạn lần sau nhé.";
        }
        // 3. Menu / Thực đơn / Món ăn / Đồ uống
        else if (lowerCaseInput.includes("menu") || lowerCaseInput.includes("thực đơn") || lowerCaseInput.includes("món ăn") || lowerCaseInput.includes("đồ ăn") || lowerCaseInput.includes("đồ uống")) {
            botResponseText = "Bạn có thể xem toàn bộ thực đơn và các món ăn/đồ uống của chúng tôi tại trang <a href='/Product/Index'>Sản phẩm</a>. Hoặc bạn muốn tìm món gì cụ thể?";
        }
        // 4. Đặt hàng / Cách đặt hàng
        else if (lowerCaseInput.includes("đặt hàng") || lowerCaseInput.includes("cách đặt") || lowerCaseInput.includes("mua hàng")) {
            // Đã đổi liên kết theo yêu cầu trước đó
            botResponseText = "Để đặt hàng, bạn vui lòng chọn món trên trang <a href='http://localhost:5074/'>Sản phẩm</a>, thêm vào giỏ hàng và tiến hành thanh toán. Nếu có vấn đề, bạn có thể gọi hotline: 0123.456.789.";
        }
        // 5. Trạng thái đơn hàng
        else if (lowerCaseInput.includes("trạng thái đơn hàng") || lowerCaseInput.includes("đơn hàng của tôi") || lowerCaseInput.includes("kiểm tra đơn")) {
            botResponseText = "Để kiểm tra trạng thái đơn hàng, vui lòng truy cập trang <a href='/Order/Index'>Quản lý đơn hàng</a> và nhập mã đơn hàng của bạn. Nếu bạn đã đăng nhập, đơn hàng sẽ tự động hiển thị.";
        }
        // 6. Giao hàng / Phí ship / Thời gian giao
        else if (lowerCaseInput.includes("giao hàng") || lowerCaseInput.includes("phí ship") || lowerCaseInput.includes("phí vận chuyển") || lowerCaseInput.includes("bao lâu nhận được")) {
            botResponseText = "Phí giao hàng sẽ được tính dựa trên địa chỉ của bạn khi thanh toán. Thời gian giao hàng dự kiến từ 30-60 phút tùy khu vực.";
        }
        // 7. Phương thức thanh toán
        else if (lowerCaseInput.includes("thanh toán") || lowerCaseInput.includes("cách thanh toán") || lowerCaseInput.includes("phương thức thanh toán")) {
            botResponseText = "Chúng tôi chấp nhận thanh toán qua tiền mặt khi nhận hàng, chuyển khoản ngân hàng, và các ví điện tử như MoMo, ZaloPay.";
        }
        // 8. Khuyến mãi / Ưu đãi / Voucher
        else if (lowerCaseInput.includes("khuyến mãi") || lowerCaseInput.includes("ưu đãi") || lowerCaseInput.includes("voucher") || lowerCaseInput.includes("mã giảm giá")) {
            botResponseText = "Chúng tôi có nhiều chương trình khuyến mãi hấp dẫn. Vui lòng kiểm tra mục 'Khuyến mãi' trên trang chủ hoặc theo dõi Fanpage của chúng tôi để cập nhật nhé!";
        }
        // 9. Liên hệ / Hỗ trợ
        else if (lowerCaseInput.includes("liên hệ") || lowerCaseInput.includes("hỗ trợ") || lowerCaseInput.includes("tư vấn")) {
            // Thay đổi link trang liên hệ nếu có
            botResponseText = "Bạn có thể liên hệ chúng tôi qua hotline: 0123.456.789 hoặc gửi email về support@yourfoodwebsite.com. Hoặc chat trực tiếp với người bán qua trang <a href='http://localhost:5074/Chat/UserChat'>Hỗ trợ</a>. Chúng tôi sẵn sàng hỗ trợ bạn!";
        }
        // 10. Giờ mở cửa
        else if (lowerCaseInput.includes("giờ mở cửa") || lowerCaseInput.includes("mấy giờ mở cửa") || lowerCaseInput.includes("khi nào mở")) {
            botResponseText = "Chúng tôi mở cửa từ 9h sáng đến 10h tối hàng ngày.";
        }
        // 11. Địa chỉ quán
        else if (lowerCaseInput.includes("địa chỉ") || lowerCaseInput.includes("quán ở đâu") || lowerCaseInput.includes("cửa hàng ở đâu")) {
            botResponseText = "Địa chỉ quán chúng tôi ở: 31B, Đường 904, Phường Hiệp Phú, Thành phố Thủ Đức.";
        }
        // 12. Feedback / Đánh giá
        else if (lowerCaseInput.includes("đánh giá") || lowerCaseInput.includes("feedback") || lowerCaseInput.includes("phản hồi")) {
            botResponseText = "Cảm ơn bạn đã quan tâm! Bạn có thể gửi đánh giá cho chúng tôi qua form liên hệ hoặc trên các ứng dụng đánh giá.";
        }
        // 13. Hỏi về các món cụ thể
        else if (lowerCaseInput.includes("gà rán") || lowerCaseInput.includes("combo gà")) {
            botResponseText = "Gà rán là một trong những món best-seller của chúng tôi! Bạn muốn đặt combo gà hay phần riêng lẻ?";
        }
        else if (lowerCaseInput.includes("pizza") || lowerCaseInput.includes("bánh pizza")) {
            botResponseText = "Chúng tôi có Pizza hải sản, Pizza bò phô mai, Pizza thập cẩm. Bạn muốn thử loại nào?";
        }
        else if (lowerCaseInput.includes("phở") || lowerCaseInput.includes("bún")) {
            botResponseText = "Hiện tại chúng tôi chuyên về các món fast-food và đồ uống. Rất tiếc là chưa có phở hay bún ạ.";
        }
        else if (lowerCaseInput.includes("hóa đơn") || lowerCaseInput.includes("xuất hóa đơn")) {
            botResponseText = "Bạn có thể yêu cầu xuất hóa đơn trong quá trình thanh toán. Nếu cần hỗ trợ thêm, hãy liên hệ hotline.";
        }
        else if (lowerCaseInput.includes("đổi món") || lowerCaseInput.includes("trả hàng") || lowerCaseInput.includes("hoàn tiền")) {
            botResponseText = "Chúng tôi hỗ trợ đổi món hoặc hoàn tiền nếu món ăn có lỗi. Vui lòng liên hệ trong vòng 2 giờ sau khi nhận hàng.";
        }
        else if (lowerCaseInput.includes("vệ sinh") || lowerCaseInput.includes("an toàn thực phẩm")) {
            botResponseText = "Chúng tôi tuân thủ nghiêm ngặt quy trình vệ sinh an toàn thực phẩm để đảm bảo sức khỏe cho khách hàng.";
        }
        else if (lowerCaseInput.includes("chính sách") || lowerCaseInput.includes("bảo mật") || lowerCaseInput.includes("điều khoản")) {
            botResponseText = "Bạn có thể xem chính sách bảo mật và điều khoản sử dụng tại phần chân trang website.";
        }
        else if (lowerCaseInput.includes("giỏ hàng") || lowerCaseInput.includes("món tôi đã chọn")) {
            botResponseText = "Bạn có thể kiểm tra và chỉnh sửa giỏ hàng bằng cách nhấn vào biểu tượng giỏ hàng ở góc phải trang.";
        }
        else if (lowerCaseInput.includes("có món") && lowerCaseInput.includes("không")) {
            botResponseText = "Bạn đang tìm món nào cụ thể? Hãy gõ tên món để tôi kiểm tra giúp bạn nhé!";
        }
        else if (lowerCaseInput.includes("món ngon") || lowerCaseInput.includes("gợi ý") || lowerCaseInput.includes("nên ăn gì")) {
            botResponseText = "Gợi ý hôm nay: Combo Gà Rán + Pepsi, Pizza Hải Sản, và Trà Đào Đặc Biệt. Bạn muốn thử món nào?";
        }
        else if (lowerCaseInput.includes("sinh nhật") || lowerCaseInput.includes("đặt tiệc")) {
            botResponseText = "Chúng tôi có dịch vụ hỗ trợ đặt tiệc sinh nhật và combo nhóm. Liên hệ để được tư vấn chi tiết nhé!";
        }
        else if (lowerCaseInput.includes("lỗi web") || lowerCaseInput.includes("không hiển thị") || lowerCaseInput.includes("không vào được")) {
            botResponseText = "Bạn hãy thử tải lại trang hoặc dùng trình duyệt khác. Nếu vẫn lỗi, hãy liên hệ kỹ thuật qua hotline.";
        }
        else if (lowerCaseInput.includes("nước uống gì ngon") || lowerCaseInput.includes("gợi ý nước uống")) {
            botResponseText = "Các loại nước uống được yêu thích: Trà đào, Soda chanh, Pepsi lạnh. Bạn muốn thử loại nào?";
        }
        else if (lowerCaseInput.includes("món nào bán chạy") || lowerCaseInput.includes("món được yêu thích")) {
            botResponseText = "Gà rán, Pizza bò phô mai và Trà sữa truyền thống là những món bán chạy nhất của chúng tôi!";
        }
        else if (lowerCaseInput.includes("ăn chay") || lowerCaseInput.includes("có đồ chay không")) {
            botResponseText = "Hiện chúng tôi có món Pizza chay và salad rau củ dành cho khách ăn chay.";
        }
        else if (lowerCaseInput.includes("đồ cay") || lowerCaseInput.includes("có món cay không")) {
            botResponseText = "Bạn có thể thử Gà sốt cay hoặc Mì cay hải sản, rất được ưa chuộng!";
        }
        else if (lowerCaseInput.includes("sao chưa giao hàng") || lowerCaseInput.includes("chậm giao hàng")) {
            botResponseText = "Xin lỗi về sự bất tiện! Bạn vui lòng kiểm tra trạng thái đơn tại trang đơn hàng hoặc liên hệ hotline 0123.456.789.";
        }
        else if (lowerCaseInput.includes("huỷ đơn") || lowerCaseInput.includes("hủy đơn")) {
            botResponseText = "Bạn có thể huỷ đơn trước khi được xác nhận qua điện thoại. Nếu cần trợ giúp, gọi ngay hotline.";
        }
        else if (lowerCaseInput.includes("sai món") || lowerCaseInput.includes("giao nhầm món")) {
            botResponseText = "Chúng tôi xin lỗi! Vui lòng chụp ảnh món nhận được và gửi về fanpage hoặc email support để được xử lý ngay.";
        }
        else if (lowerCaseInput.includes("đăng nhập không được") || lowerCaseInput.includes("quên mật khẩu")) {
            botResponseText = "Bạn vui lòng dùng chức năng 'Quên mật khẩu' tại trang đăng nhập. Nếu không được, hãy liên hệ CSKH.";
        }
        else if (lowerCaseInput.includes("đăng ký tài khoản") || lowerCaseInput.includes("làm sao tạo tài khoản")) {
            botResponseText = "Bạn có thể đăng ký tài khoản bằng cách nhấn vào nút 'Đăng ký' ở góc phải trên cùng của trang.";
        }
        else if (lowerCaseInput.includes("có COD không") || lowerCaseInput.includes("trả tiền mặt")) {
            botResponseText = "Chúng tôi có hỗ trợ thanh toán khi nhận hàng (COD). Bạn chọn hình thức này khi thanh toán nhé!";
        }
        else if (lowerCaseInput.includes("trả trước") || lowerCaseInput.includes("có bắt buộc trả trước")) {
            botResponseText = "Bạn không cần trả trước. Có thể chọn thanh toán khi nhận hàng hoặc trả online đều được.";
        }
        else if (lowerCaseInput.includes("lưu thông tin") || lowerCaseInput.includes("bảo mật")) {
            botResponseText = "Chúng tôi cam kết không chia sẻ thông tin cá nhân của bạn. Mọi dữ liệu đều được bảo vệ an toàn.";
        }
        else if (lowerCaseInput.includes("có app không") || lowerCaseInput.includes("ứng dụng trên điện thoại")) {
            botResponseText = "Hiện tại chúng tôi đang phát triển ứng dụng di động. Bạn có thể đặt hàng qua website trên điện thoại nhé!";
        }
        else if (lowerCaseInput.includes("tết") || lowerCaseInput.includes("nghỉ lễ")) {
            botResponseText = "Vào các dịp lễ/tết, chúng tôi vẫn mở cửa phục vụ từ 9h đến 22h. Có thể thay đổi theo từng ngày, bạn nên theo dõi fanpage.";
        }
        else if (lowerCaseInput.includes("giảm giá sinh nhật") || lowerCaseInput.includes("ưu đãi sinh nhật")) {
            botResponseText = "Khách hàng đăng ký tài khoản sẽ nhận ưu đãi 10% vào tháng sinh nhật. Nhớ nhập đúng ngày khi tạo tài khoản nhé!";
        }
        else if (lowerCaseInput.includes("fanpage") || lowerCaseInput.includes("facebook của quán")) {
            botResponseText = "Bạn có thể theo dõi fanpage của chúng tôi tại: <a href='https://facebook.com/yourstore' target='_blank'>facebook.com/yourstore</a> để cập nhật khuyến mãi mới nhất.";
        }
        else if (lowerCaseInput.includes("hôm nay có món gì") || lowerCaseInput.includes("hôm nay ăn gì") || lowerCaseInput.includes("hôm nay có gì ngon")) {
            botResponseText = "Hôm nay quán có Combo Gà rán + Pepsi giảm 10%, và Pizza bò phô mai đang được nhiều khách chọn nhất. Bạn muốn thử không?";
        }
        const newBotMessageFrontend = { sender: 'bot', text: botResponseText };
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, newBotMessageFrontend]);
        }, 500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Hàm để đóng/mở chatbot
    const toggleChatbot = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
        // Khi đóng chatbot, reset lại trạng thái đã chào để lần sau mở lại sẽ chào lại
        if (isOpen) {
            setHasGreeted(false);
            setMessages([]); // Xóa tin nhắn cũ khi đóng
        }
    };

    return (
        <div className="chatbot-widget">
            {/* Nút để mở chatbot - hiện icon và chữ "Hỗ trợ" */}
            {!isOpen && (
                <button className="chatbot-toggle-button" onClick={toggleChatbot}>
                    <i className="fas fa-headset chatbot-icon"></i> {/* Icon hỗ trợ */}
                    <span className="chatbot-label">Hỗ trợ</span> {/* Chữ "Hỗ trợ" */}
                </button>
            )}

            {/* Chatbot container - chỉ hiển thị khi isOpen là true */}
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        Chatbot hỗ trợ
                        <button className="chatbot-close-button" onClick={toggleChatbot}>X</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.text }}>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chatbot-input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Gõ tin nhắn của bạn..."
                        />
                        <button onClick={handleSendMessage}>Gửi</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;