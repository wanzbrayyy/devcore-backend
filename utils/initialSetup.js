const User = require('../models/user');
const GlobalConfig = require('../models/globalConfig');
const bcrypt = require('bcryptjs');

const runSetup = async () => {
  try {
    // 1. Create Default Admin
    const adminExists = await User.findOne({ username: 'dap' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('123', salt);
      await User.create({
        username: 'dap', password: hashedPassword, role: 'admin', reqAiName: 'DevCORE', reqDevName: 'XdpzQ', isApproved: true
      });
      console.log('Admin Account (dap) Created.');
    }

    // 2. Create Global Config & Seed API Key provided by user
    const configExists = await GlobalConfig.findOne();
    const userApiKey = "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";
    
    if (!configExists) {
      await GlobalConfig.create({
        maintenanceMode: false,
        featureImageGen: true,
        apiKeys: [{ key: userApiKey, provider: 'openrouter', isActive: true }],
        globalPersona: "You are a helpful assistant."
      });
      console.log('Global Config & API Key Initialized.');
    } else {
        // Jika config sudah ada, pastikan key user masuk (untuk fix problem user)
        const hasKey = configExists.apiKeys.some(k => k.key === userApiKey);
        if(!hasKey) {
            configExists.apiKeys.push({ key: userApiKey, provider: 'openrouter', isActive: true });
            await configExists.save();
            console.log('API Key injected into existing config.');
        }
    }
  } catch (err) { console.error("Setup Error:", err); }
};
module.exports = runSetup;
