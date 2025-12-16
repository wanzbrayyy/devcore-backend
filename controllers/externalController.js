const User = require('../models/user');
const GlobalConfig = require('../models/globalConfig');
const axios = require('axios');

exports.handleExternalChat = async (req, res) => {
    const userApiKey = req.headers['x-api-key'];
    const { messages, model } = req.body;

    if (!userApiKey) return res.status(401).json({ error: "Missing x-api-key header" });

    // 1. Validasi User Key
    const user = await User.findOne({ personalApiKey: userApiKey });
    if (!user) return res.status(401).json({ error: "Invalid API Key" });
    if (!user.isApproved) return res.status(403).json({ error: "Account not approved by Admin" });

    // 2. Ambil System Key (OpenRouter)
    const config = await GlobalConfig.findOne();
    const activeKeys = config?.apiKeys.filter(k => k.isActive) || [];
    if (activeKeys.length === 0) return res.status(503).json({ error: "System Busy (No Upstream Key)" });
    const randomKey = activeKeys[Math.floor(Math.random() * activeKeys.length)];

    // 3. Proxy Request ke OpenRouter
    try {
        const payload = {
            model: "nex-agi/deepseek-v3.1-nex-n1:free", // Default model
            messages: messages || [{ role: "user", content: "Hello" }],
            stream: false // cURL biasanya lebih enak non-stream buat pemula
        };

        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', payload, {
            headers: {
                'Authorization': `Bearer ${randomKey.key}`,
                'HTTP-Referer': 'https://devcore.ai',
                'X-Title': 'DevCORE External API'
            }
        });

        res.json(response.data);

    } catch (err) {
        res.status(500).json({ error: "Upstream Error", details: err.message });
    }
};
