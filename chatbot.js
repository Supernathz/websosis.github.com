// ==========================================
// 1. CHATBOT UI INJECTION
// Automatically adds the chat HTML to every page
// ==========================================
const chatbotHTML = `
    <div class="chatbot-container">
        
        <button id="chatbot-toggle" class="chatbot-toggle">
            <i class="fa-solid fa-message"></i>
        </button>

        <div id="chatbot-window" class="chatbot-window">
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <i class="fa-solid fa-robot"></i>
                    <div>
                        <h3>Nemo Bot</h3>
                        <p>Online</p>
                    </div>
                </div>
                <button id="chatbot-close" class="chatbot-close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            
            <div id="chatbot-messages" class="chatbot-messages">
                <div class="chat-bubble chat-bot">
                    Halo! Nama saya Nemo. Ada yang bisa saya bantu seputar OSIS SMAK IPTO?
                </div>
                
                <div id="typing-indicator" class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
            
            <div class="chatbot-input">
                <input type="text" id="chat-input" placeholder="Tanya Nemo di sini..." autocomplete="off">
                <button id="send-btn"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
        
    </div> `;

// Insert the HTML at the end of the body
document.body.insertAdjacentHTML('beforeend', chatbotHTML);


// ==========================================
// 2. DOM ELEMENTS & EVENT LISTENERS
// ==========================================
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chatbot-messages');
const typingIndicator = document.getElementById('typing-indicator');

// Toggle Chat Window
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
    chatbotToggle.style.transform = "scale(0)"; // Hide button smoothly
    setTimeout(() => chatInput.focus(), 300);
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotToggle.style.transform = "scale(1)"; // Bring button back
});

// Send Message on Enter Key or Button Click
sendBtn.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});


// ==========================================
// 3. CORE LOGIC (Handling Messages)
// ==========================================
async function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // 1. Append User Message
    appendMessage('user', text);
    chatInput.value = '';

    // 2. Show Typing Indicator by moving it to the bottom and displaying it
    chatMessages.appendChild(typingIndicator); 
    typingIndicator.style.display = 'block';
    scrollToBottom();

    // 3. Call your secure API
    const reply = await askChatbotAPI(text);

    // 4. Hide Typing Indicator and show real response
    typingIndicator.style.display = 'none';
    appendMessage('bot', reply);
}

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    // Use your specific CSS classes: chat-user or chat-bot
    msgDiv.className = `chat-bubble ${sender === 'user' ? 'chat-user' : 'chat-bot'}`;
    
    // Securely inject text content
    msgDiv.textContent = text; 
    
    // Insert message right before the typing indicator
    chatMessages.insertBefore(msgDiv, typingIndicator);
    scrollToBottom();
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ==========================================
// 4. SECURE API WRAPPER
// ==========================================
async function askChatbotAPI(question) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();
        return data.reply || "Maaf, Nemo tidak mengerti itu.";
        
    } catch (error) {
        console.error("Chatbot API Error:", error);
        return "Maaf, terjadi kesalahan koneksi server. Coba hubungi Admin!";
    }
}