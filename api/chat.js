// api/chat.js
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { question } = req.body;
    const apiKey = process.env.OPENAI_API_KEY; // Securely stored on Vercel's servers

    if (!apiKey) {
        return res.status(500).json({ reply: "Maaf, chatbot belum dikonfigurasi di server." });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Upgraded from 3.5: it's faster, smarter, and way cheaper!
                messages: [
                    { role: "system", content: "Nama kamu adalah Nemo, asisten virtual untuk OSIS SMAK IPTO. Kamu ramah, membantu, dan tahu banyak tentang kegiatan OSIS, komunitas sekolah (seperti PMR, Dance, Music, Tech, dll), dan acara sekolah (seperti JAWA's Social Quest). Gunakan bahasa Indonesia yang sopan dan santai." },
                    { role: "user", content: question }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error("OpenAI Error:", data);
            return res.status(500).json({ reply: "Maaf, terjadi kendala saat menghubungi Nemo." });
        }

        return res.status(200).json({ reply: data.choices[0].message.content });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ reply: "Maaf, terjadi kesalahan koneksi server." });
    }
}