const GlobalConfig = require('../models/globalConfig');

exports.getPublicConfig = async (req, res) => {
  try {
    const config = await GlobalConfig.findOne();
    res.json({
      maintenance: config ? config.maintenanceMode : false
    });
  } catch (error) {
    res.status(500).json({ maintenance: false });
  }
};
