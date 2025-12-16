const mongoose = require('mongoose');

const chatHistorySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'New Session' }, // Nama Sesi (misal: Coding, Pentest)
  messages: [{
    role: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
