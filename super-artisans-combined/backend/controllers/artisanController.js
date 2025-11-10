const Artisan = require('../models/Artisan');
const { uploadFile } = require('../utils/cloudinaryUpload');
const path = require('path');
const fs = require('fs');

exports.list = async (req, res) => {
  try {
    const { state, craft, availability, search, limit = 20, page = 1, scheme } = req.query;
    const filter = {};
    if (state) filter.state = new RegExp('^' + state + '$', 'i');
    if (craft) filter.craft = new RegExp(craft, 'i');
    if (availability) filter.availability = availability;
    if (scheme) filter.schemes = scheme;
    if (search) filter.$or = [
      { name: new RegExp(search, 'i') },
      { city: new RegExp(search, 'i') },
      { craft: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];
    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const data = await Artisan.find(filter).sort({ rating: -1, numReviews: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Artisan.countDocuments(filter);
    res.json({ data, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);
    if (!artisan) return res.status(404).json({ message: 'Not found' });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, state, district, city, craft, description, availability, videoUrl, social, certifications, address, location, schemes, verified } = req.body;
    let images = [];
    if (req.files && req.files.length) {
      images = req.files.map(f => '/uploads/' + path.basename(f.path));
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const uploaded = [];
        for (const f of req.files) {
          const url = await uploadFile(f.path, 'artisans');
          uploaded.push(url);
          try { fs.unlinkSync(f.path); } catch(e){}
        }
        images = uploaded;
      }
    }
    const artisan = new Artisan({
      name, state, district, city, craft, description,
      availability, images, videoUrl: videoUrl || null,
      social: social ? JSON.parse(social) : undefined,
      certifications: certifications ? JSON.parse(certifications) : undefined,
      address: address ? JSON.parse(address) : undefined,
      location: location ? JSON.parse(location) : undefined,
      schemes: schemes ? JSON.parse(schemes) : undefined,
      verified: verified === 'true' || verified === true
    });
    await artisan.save();
    res.status(201).json(artisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const a = await Artisan.findById(req.params.id);
    if (!a) return res.status(404).json({ message: 'Not found' });
    const { name, state, district, city, craft, description, availability, videoUrl, social, certifications, address, location, schemes, verified } = req.body;
    if (name) a.name = name;
    if (state) a.state = state;
    if (district) a.district = district;
    if (city) a.city = city;
    if (craft) a.craft = craft;
    if (description) a.description = description;
    if (availability) a.availability = availability;
    if (typeof verified !== 'undefined') a.verified = verified === 'true' || verified === true;
    if (videoUrl) a.videoUrl = videoUrl;
    if (social) a.social = JSON.parse(social);
    if (certifications) a.certifications = JSON.parse(certifications);
    if (address) a.address = JSON.parse(address);
    if (location) a.location = JSON.parse(location);
    if (schemes) a.schemes = JSON.parse(schemes);

    if (req.files && req.files.length) {
      let newImgs = req.files.map(f => '/uploads/' + path.basename(f.path));
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const uploaded = [];
        for (const f of req.files) {
          const url = await uploadFile(f.path, 'artisans');
          uploaded.push(url);
          try { fs.unlinkSync(f.path); } catch(e){}
        }
        newImgs = uploaded;
      }
      a.images = a.images.concat(newImgs);
    }
    await a.save();
    res.json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    await Artisan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
