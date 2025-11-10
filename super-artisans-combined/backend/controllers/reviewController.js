const Artisan = require('../models/Artisan');
const calcAverage = require('../utils/calcAverageRating');
const User = require('../models/User');

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const artisan = await Artisan.findById(req.params.id);
    if (!artisan) return res.status(404).json({ message: 'Not found' });
    const existing = artisan.reviews.find(r => r.user && String(r.user) === String(req.user.id));
    if (existing) return res.status(400).json({ message: 'Already reviewed' });
    const user = await User.findById(req.user.id);
    const review = { user: user._id, name: user.name, rating: Number(rating), comment };
    artisan.reviews.push(review);
    artisan.numReviews = artisan.reviews.length;
    artisan.rating = calcAverage(artisan.reviews);
    await artisan.save();
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
