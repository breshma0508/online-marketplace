const Artisan = require('../models/Artisan');

exports.stats = async (req, res) => {
  try {
    const totalArtisans = await Artisan.countDocuments();
    const byState = await Artisan.aggregate([
      { $group: { _id: '$state', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ totalArtisans, byState });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
