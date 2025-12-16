const GlobalConfig = require('../models/globalConfig');

const checkMaintenance = async (req, res, next) => {
  try {
    const config = await GlobalConfig.findOne();
    
    // Jika Maintenance Aktif
    if (config && config.maintenanceMode) {
        // Cek apakah user adalah Admin (req.user diset dari authMiddleware sebelumnya)
        // Jika belum login (req.user undefined) atau bukan admin, tolak akses
        if (!req.user || req.user.role !== 'admin') {
            return res.status(503).json({ 
                message: 'MAINTENANCE_MODE', 
                info: 'System is undergoing upgrades. Access restricted to DevCORE Admins.' 
            });
        }
    }
    next();
  } catch (error) {
    console.error("Maintenance Check Error:", error);
    next(); // Lanjut aja kalau error db, biar ga mati total
  }
};

module.exports = { checkMaintenance };
