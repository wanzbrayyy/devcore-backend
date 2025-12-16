const mongoose = require('mongoose');
const quoteSchema = mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, default: 'Unknown' }
});
module.exports = mongoose.model('Quote', quoteSchema);
