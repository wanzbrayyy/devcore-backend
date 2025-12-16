const User = require('../models/user');
const GlobalConfig = require('../models/globalConfig');
const Quote = require('../models/quote');

// USER MANAGEMENT
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ username: { $ne: 'dap' } }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.toggleApproval = async (req, res) => {
  const { userId, approve } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isApproved = approve;
    await user.save();
    res.json({ success: true, message: `User updated` });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

// FITUR BARU: UPDATE USER ROLE (Admin Only)
exports.updateUserRole = async (req, res) => {
    const { userId, newRole } = req.body;
    try {
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });
        
        user.role = newRole; // admin, demon, premium, user
        await user.save();
        res.json({ success: true, message: `Role changed to ${newRole}` });
    } catch(e) { res.status(500).json({ error: e.message }); }
};

// SYSTEM CONFIG
exports.getConfig = async (req, res) => {
  let config = await GlobalConfig.findOne();
  if(!config) config = await GlobalConfig.create({ apiKeys: [], maintenanceMode: false });
  res.json(config);
};

exports.updateMaintenance = async (req, res) => {
    const { enabled } = req.body;
    let config = await GlobalConfig.findOne();
    if(!config) config = await GlobalConfig.create({});
    config.maintenanceMode = enabled;
    await config.save();
    res.json({ success: true, maintenanceMode: config.maintenanceMode });
};

// API KEYS
exports.addApiKey = async (req, res) => {
  const { key } = req.body;
  let config = await GlobalConfig.findOne();
  if(!config) config = await GlobalConfig.create({});
  const exists = config.apiKeys.find(k => k.key === key);
  if(!exists) {
      config.apiKeys.push({ key, provider: 'openrouter', isActive: true });
      await config.save();
  }
  res.json(config.apiKeys);
};

exports.deleteApiKey = async (req, res) => {
    let config = await GlobalConfig.findOne();
    if(config) {
        config.apiKeys = config.apiKeys.filter(k => k._id.toString() !== req.params.id);
        await config.save();
    }
    res.json(config.apiKeys);
};

// QUOTES
exports.addQuote = async (req, res) => { await Quote.create(req.body); res.json({success:true}); };
exports.getQuotes = async (req, res) => { res.json(await Quote.find()); };
exports.deleteQuote = async (req, res) => { await Quote.findByIdAndDelete(req.params.id); res.json({success:true}); };
