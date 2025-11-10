const Scheme = require('../models/Scheme');

exports.list = async (req, res) => {
  try {
    const schemes = await Scheme.find({}).sort({ name: 1 });
    res.json({ data: schemes });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const scheme = await Scheme.findOne({ code: req.params.code });
    if (!scheme) return res.status(404).json({ message: 'Not found' });
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
