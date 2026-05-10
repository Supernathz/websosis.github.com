document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject CSS link
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "chatbot.css";
    document.head.appendChild(cssLink);

    // 2. Inject HTML structure
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <i class="fa-solid fa-robot"></i>
                        <div>
                            <h3>OSIS Assistant</h3>
                            <p>Online</p>
                        </div>
                    </div>
                    <button class="chatbot-close" id="chatbotClose"><i class="fa-solid fa-times"></i></button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="chat-bubble chat-bot">Halo! Ada yang bisa saya bantu tentang OSIS SMAK IPTO?</div>
                    <div class="typing-indicator" id="typingIndicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chatbotInput" placeholder="Ketik pesan disini..." autocomplete="off">
                    <button id="chatbotSend"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
            <button class="chatbot-toggle" id="chatbotToggle">
                <i class="fa-solid fa-message"></i>
            </button>
        </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = chatbotHTML;
    document.body.appendChild(wrapper.firstElementChild);

    // 3. Logic
    const toggleBtn = document.getElementById("chatbotToggle");
    const closeBtn = document.getElementById("chatbotClose");
    const windowEl = document.getElementById("chatbotWindow");
    const messagesEl = document.getElementById("chatbotMessages");
    const inputEl = document.getElementById("chatbotInput");
    const sendBtn = document.getElementById("chatbotSend");
    const typingIndicator = document.getElementById("typingIndicator");

    function toggleChat() {
        windowEl.classList.toggle("active");
        if (windowEl.classList.contains("active")) {
            inputEl.focus();
        }
    }

    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);

    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-bubble chat-${sender}`;
        msgDiv.textContent = text;
        messagesEl.insertBefore(msgDiv, typingIndicator);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
        typingIndicator.style.display = "flex";
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
        typingIndicator.style.display = "none";
    }

    // API Wrapper Function
    async function askChatbotAPI(question) {
        // REPLACE THIS WITH ACTUAL API CALL LATER
        /* 
        try {
            const response = await fetch('YOUR_API_ENDPOINT_HERE', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question })
            });
            const data = await response.json();
            return data.reply;
        } catch (error) {
            console.error("Chatbot API Error:", error);
            return "Maaf, terjadi kesalahan saat menghubungi server.";
        }
        */

        // Mock API logic for now
        return new Promise((resolve) => {
            setTimeout(() => {
                const lowerQ = question.toLowerCase();
                let reply = "Maaf, saya belum mengerti. Silakan hubungi kontak kami untuk informasi lebih lanjut.";
                
                if (lowerQ.includes("halo") || lowerQ.includes("hai")) {
                    reply = "Halo! Ada yang ingin ditanyakan?";
                } else if (lowerQ.includes("osis")) {
                    reply = "OSIS SMAK IPTO adalah organisasi siswa intra sekolah yang berdedikasi untuk melayani seluruh siswa.";
                } else if (lowerQ.includes("komunitas")) {
                    reply = "Kami memiliki berbagai komunitas seperti PMR, Dance, Music, Tech, dan banyak lagi! Cek menu Komunitas untuk detailnya.";
                } else if (lowerQ.includes("acara")) {
                    reply = "Acara terdekat kami adalah JAWA's Social Quest. Kunjungi menu Acara untuk info lebih lanjut!";
                }

                resolve(reply);
            }, 1000 + Math.random() * 1000); // simulate network delay
        });
    }

    async function handleSend() {
        const text = inputEl.value.trim();
        if (!text) return;

        // User message
        addMessage(text, "user");
        inputEl.value = "";

        // Show typing
        showTyping();

        // Call API
        const reply = await askChatbotAPI(text);

        // Bot reply
        hideTyping();
        addMessage(reply, "bot");
    }

    sendBtn.addEventListener("click", handleSend);
    inputEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
    });
});
