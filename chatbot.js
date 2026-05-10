document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject CSS link
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "chatbot.css?v=" + new Date().getTime(); // Cache busting
    document.head.appendChild(cssLink);

    // 2. Inject HTML structure
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <i class="fa-solid fa-robot"></i>
                        <div>
                            <h3>Nemo</h3>
                            <p>Online</p>
                        </div>
                    </div>
                    <button class="chatbot-close" id="chatbotClose"><i class="fa-solid fa-times"></i></button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="chat-bubble chat-bot">Halo! Saya Nemo, asisten virtual OSIS SMAK IPTO. Ada yang bisa saya bantu?</div>
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

    // OpenAI Configuration
    // Key ini dimasukkan untuk pengetesan lokal.
    const OPENAI_API_KEY = "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";

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
        if (OPENAI_API_KEY === "REPLACE_WITH_OPENAI_API_KEY") {
            return "Maaf, API Key belum dikonfigurasi. Silakan hubungi admin.";
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Nama kamu adalah Nemo, asisten virtual untuk OSIS SMAK IPTO. Kamu ramah, membantu, dan tahu banyak tentang kegiatan OSIS, komunitas sekolah (seperti PMR, Dance, Music, Tech, dll), dan acara sekolah (seperti JAWA's Social Quest). Gunakan bahasa Indonesia yang sopan dan santai." },
                        { role: "user", content: question }
                    ],
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("OpenAI Error:", errorData);
                return "Maaf, terjadi masalah saat menghubungi Nemo. Silakan coba lagi nanti.";
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Chatbot API Error:", error);
            return "Maaf, terjadi kesalahan koneksi. Pastikan internet Anda aktif.";
        }
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
