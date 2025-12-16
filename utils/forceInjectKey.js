const mongoose = require('mongoose');
const GlobalConfig = require('../models/globalConfig');

// KONEKSI DB MAVERICK KAMU
mongoose.connect('mongodb+srv://maverickuniverse405:1m8MIgmKfK2QwBNe@cluster0.il8d4jx.mongodb.net/Rd?appName=Cluster0')
  .then(async () => {
    console.log("Connected to DB for Injection...");
    
    // Key dari kamu
    const myKey = "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";
    
    let config = await GlobalConfig.findOne();
    if (!config) {
      console.log("Creating new config...");
      await GlobalConfig.create({
        maintenanceMode: false,
        apiKeys: [{ key: myKey, provider: 'openrouter', isActive: true }]
      });
    } else {
      console.log("Updating existing config...");
      // Hapus key lama biar bersih, masukkan yang baru
      config.apiKeys = [{ key: myKey, provider: 'openrouter', isActive: true }];
      await config.save();
    }
    
    console.log(">>> SUCCESS! API KEY SUDAH DIMASUKKAN KE DATABASE <<<");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
