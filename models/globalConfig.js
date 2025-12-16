const mongoose = require('mongoose');
const globalConfigSchema = mongoose.Schema({
  maintenanceMode: { type: Boolean, default: false },
  featureImageGen: { type: Boolean, default: true },
  apiKeys: [{ 
    key: String, 
    provider: { type: String, default: 'openrouter' }, 
    isActive: { type: Boolean, default: true }
  }],
  globalPersona: { type: String, default: '' },
});
module.exports = mongoose.model('GlobalConfig', globalConfigSchema);
