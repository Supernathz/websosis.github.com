// API Wrapper Function — Now pointing safely to our serverless route
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
            return data.reply;
            
        } catch (error) {
            console.error("Chatbot API Error:", error);
            return "Maaf, terjadi kesalahan koneksi. Pastikan internet Anda aktif.";
        }
    }